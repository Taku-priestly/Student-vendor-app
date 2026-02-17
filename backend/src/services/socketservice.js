const socketIO = require('socket.io');

let io;

const initializeSocket = (server) => {
    io = socketIO(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Join user's room
        socket.on('joinUserRoom', ({ userId, userType }) => {
            const roomId = `${userType}_${userId}`;
            socket.join(roomId);
            console.log(`User ${roomId} joined room`);
        });

        // Join chat room
        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`Socket ${socket.id} joined chat: ${chatId}`);
        });

        // Handle typing indicator
        socket.on('typing', ({ chatId, userId, isTyping }) => {
            socket.to(chatId).emit('userTyping', { userId, isTyping });
        });

        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
};

module.exports = { initializeSocket, getIO };