const mongoose = require('mongoose');

const callLogSchema = new mongoose.Schema({
  callerId: {
    type: String,
    required: true
  },
  callerType: {
    type: String,
    required: true,
    enum: ['student', 'tutor', 'admin']
  },
  receiverId: {
    type: String,
    required: true
  },
  receiverType: {
    type: String,
    required: true,
    enum: ['student', 'tutor', 'admin']
  },
  callType: {
    type: String,
    enum: ['audio', 'video'],
    default: 'audio'
  },
  status: {
    type: String,
    enum: ['initiated', 'accepted', 'ongoing', 'completed', 'missed', 'rejected'],
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
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const CallLog = mongoose.model('CallLog', callLogSchema);

module.exports = CallLog;