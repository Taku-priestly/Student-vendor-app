const CallLog = require('../models/CallLog');
const twilio = require('twilio');

class CallController {
    // Initiate a call
    async initiateCall(req, res, next) {
        try {
            const { userId: callerId, userType: callerType, userName: callerName } = req.user;
            const { receiverId, receiverType, receiverName, callType = 'audio' } = req.body;

            // Create call log
            const callLog = new CallLog({
                callerId,
                callerType,
                receiverId,
                receiverType,
                callType,
                status: 'initiated'
            });

            await callLog.save();

            // If using Twilio, generate token (you'll need to implement this based on your Twilio setup)
            let twilioToken = null;
            if (process.env.TWILIO_ACCOUNT_SID) {
                const client = twilio(
                    process.env.TWILIO_ACCOUNT_SID,
                    process.env.TWILIO_AUTH_TOKEN
                );
                
                // Generate capability token for Twilio Client
                // This is a simplified example - adjust based on your needs
                const capability = new twilio.jwt.ClientCapability({
                    accountSid: process.env.TWILIO_ACCOUNT_SID,
                    authToken: process.env.TWILIO_AUTH_TOKEN,
                });
                
                capability.addScope(
                    new twilio.jwt.ClientCapability.OutgoingClientScope({
                        applicationSid: 'your_twilio_app_sid'
                    })
                );
                
                twilioToken = capability.toJwt();
            }

            // Emit socket event to receiver
            req.io.to(receiverId).emit('incomingCall', {
                callId: callLog._id,
                callerId,
                callerName,
                callerType,
                callType,
                timestamp: new Date()
            });

            res.json({
                success: true,
                data: {
                    callLog,
                    twilioToken,
                    message: 'Call initiated successfully'
                }
            });
        } catch (error) {
            next(error);
        }
    }

    // Update call status
    async updateCallStatus(req, res, next) {
        try {
            const { callId } = req.params;
            const { status, duration } = req.body;

            const callLog = await CallLog.findById(callId);
            if (!callLog) {
                return res.status(404).json({ error: 'Call log not found' });
            }

            // Check if user is part of this call
            const { userId, userType } = req.user;
            const isParticipant = 
                (callLog.callerId === userId && callLog.callerType === userType) ||
                (callLog.receiverId === userId && callLog.receiverType === userType);

            if (!isParticipant) {
                return res.status(403).json({ error: 'Not authorized to update this call' });
            }

            // Update call status
            callLog.status = status;
            
            if (status === 'completed' || status === 'missed' || status === 'rejected') {
                callLog.endTime = new Date();
                if (duration) {
                    callLog.duration = duration;
                }
            }

            await callLog.save();

            // Emit socket event
            req.io.to(callLog.callerId).to(callLog.receiverId).emit('callStatusUpdate', {
                callId,
                status,
                duration: callLog.duration,
                endTime: callLog.endTime
            });

            res.json({
                success: true,
                data: callLog,
                message: 'Call status updated successfully'
            });
        } catch (error) {
            next(error);
        }
    }

    // Get call history
    async getCallHistory(req, res, next) {
        try {
            const { userId, userType } = req.user;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const skip = (page - 1) * limit;

            const calls = await CallLog.find({
                $or: [
                    { callerId: userId, callerType: userType },
                    { receiverId: userId, receiverType: userType }
                ]
            })
            .sort({ startTime: -1 })
            .skip(skip)
            .limit(limit);

            const totalCalls = await CallLog.countDocuments({
                $or: [
                    { callerId: userId, callerType: userType },
                    { receiverId: userId, receiverType: userType }
                ]
            });

            res.json({
                success: true,
                data: calls,
                pagination: {
                    page,
                    limit,
                    totalPages: Math.ceil(totalCalls / limit),
                    totalCalls
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CallController();