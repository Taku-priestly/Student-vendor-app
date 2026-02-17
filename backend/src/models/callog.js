const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
    callerId: {
        type: String,
        required: true
    },
    callerType: {
        type: String,
        enum: ['student', 'vendor'],
        required: true
    },
    receiverId: {
        type: String,
        required: true
    },
    receiverType: {
        type: String,
        enum: ['student', 'vendor'],
        required: true
    },
    callType: {
        type: String,
        enum: ['audio', 'video'],
        default: 'audio'
    },
    status: {
        type: String,
        enum: ['initiated', 'ringing', 'answered', 'completed', 'missed', 'rejected'],
        default: 'initiated'
    },
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number, // in seconds
        default: 0
    },
    twilioSid: {
        type: String // For Twilio call tracking
    }
});

module.exports = mongoose.model('CallLog', callLogSchema);