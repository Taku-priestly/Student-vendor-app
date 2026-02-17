const Chat = require('../models/chat.js');
const Message = require('../models/message.js');

class ChatController {
    // Get or create chat between users
    async getOrCreateChat(req, res, next) {
        try {
            const { userId: currentUserId, userType: currentUserType, userName: currentUserName } = req.user;
            const { receiverId, receiverType, receiverName } = req.body;

            // Check if chat already exists
            let chat = await Chat.findOne({
                participants: {
                    $all: [
                        { userId: currentUserId, userType: currentUserType },
                        { userId: receiverId, userType: receiverType }
                    ]
                }
            });

            // If chat doesn't exist, create new one
            if (!chat) {
                chat = new Chat({
                    participants: [
                        { userId: currentUserId, userType: currentUserType, userName: currentUserName },
                        { userId: receiverId, userType: receiverType, userName: receiverName }
                    ]
                });
                await chat.save();
            }

            res.json({
                success: true,
                data: chat,
                message: chat.isNew ? 'Chat created successfully' : 'Chat retrieved successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    // Get user's chats
    async getUserChats(req, res, next) {
        try {
            const { userId, userType } = req.user;

            const chats = await Chat.find({
                'participants.userId': userId,
                'participants.userType': userType,
                isActive: true
            })
            .populate('lastMessage')
            .sort({ updatedAt: -1 });

            res.json({
                success: true,
                data: chats,
                count: chats.length
            });
        } catch (error) {
            next(error);
        }
    }

    // Get chat messages
    async getChatMessages(req, res, next) {
        try {
            const { chatId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 50;
            const skip = (page - 1) * limit;

            // Verify user has access to this chat
            const chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' });
            }

            const isParticipant = chat.participants.some(
                p => p.userId === req.user.userId && p.userType === req.user.userType
            );

            if (!isParticipant) {
                return res.status(403).json({ error: 'Access denied to this chat' });
            }

            const messages = await Message.find({ chatId })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            // Mark messages as read
            await Message.updateMany(
                {
                    chatId,
                    'readBy.userId': { $ne: req.user.userId },
                    senderId: { $ne: req.user.userId }
                },
                {
                    $push: {
                        readBy: {
                            userId: req.user.userId,
                            readAt: new Date()
                        }
                    }
                }
            );

            const totalMessages = await Message.countDocuments({ chatId });

            res.json({
                success: true,
                data: messages.reverse(), // Return in chronological order
                pagination: {
                    page,
                    limit,
                    totalPages: Math.ceil(totalMessages / limit),
                    totalMessages
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Send message
    async sendMessage(req, res, next) {
        try {
            const { chatId } = req.params;
            const { content, messageType = 'text' } = req.body;
            const { userId, userType } = req.user;

            // Verify chat exists and user is participant
            const chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' });
            }

            const isParticipant = chat.participants.some(
                p => p.userId === userId && p.userType === userType
            );

            if (!isParticipant) {
                return res.status(403).json({ error: 'Not a participant in this chat' });
            }

            // Create message
            const message = new Message({
                chatId,
                senderId: userId,
                senderType: userType,
                content,
                messageType
            });

            await message.save();

            // Update chat's last message
            chat.lastMessage = message._id;
            chat.lastMessageAt = new Date();
            await chat.save();

            // Find receiver
            const receiver = chat.participants.find(
                p => !(p.userId === userId && p.userType === userType)
            );

            // Send notification
            await NotificationService.sendMessageNotification({
                receiverId: receiver.userId,
                receiverType: receiver.userType,
                senderName: req.user.userName,
                message: content,
                chatId,
                messageId: message._id
            });

            // Emit socket event
            req.io.to(chatId).emit('newMessage', {
                chatId,
                message,
                sender: { userId, userType }
            });

            res.status(201).json({
                success: true,
                data: message,
                message: 'Message sent successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete chat
    async deleteChat(req, res, next) {
        try {
            const { chatId } = req.params;
            const { userId, userType } = req.user;

            const chat = await Chat.findById(chatId);
            if (!chat) {
                return res.status(404).json({ error: 'Chat not found' });
            }

            const isParticipant = chat.participants.some(
                p => p.userId === userId && p.userType === userType
            );

            if (!isParticipant) {
                return res.status(403).json({ error: 'Not authorized to delete this chat' });
            }

            // Soft delete: mark as inactive
            chat.isActive = false;
            await chat.save();

            res.json({
                success: true,
                message: 'Chat deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ChatController();