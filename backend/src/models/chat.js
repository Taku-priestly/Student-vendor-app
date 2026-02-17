// chat.js
const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  userId: String,
  userType: String,
  userName: String
});

const chatSchema = new mongoose.Schema({
  participants: [participantSchema],
  lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  lastMessageAt: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
