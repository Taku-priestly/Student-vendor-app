// message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
  senderId: String,
  senderType: String,
  content: String,
  messageType: { type: String, default: 'text' },
  readBy: [
    {
      userId: String,
      readAt: Date
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
