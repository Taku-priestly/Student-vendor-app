const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { authenticateToken } = require('../middleware/auth');
const { validateMessage } = require('../middleware/validation');

// All routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * tags:
 *   name: Chats
 *   description: Chat management and messaging
 */

/* =========================
   Chat Management
========================= */

/**
 * @swagger
 * /api/chat:
 *   get:
 *     summary: Get all chats for the current user
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of chats
 */
router.get('/', chatController.getUserChats);

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Get or create a chat between users
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiverId
 *               - receiverType
 *             properties:
 *               receiverId:
 *                 type: string
 *               receiverType:
 *                 type: string
 *               receiverName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Chat created or retrieved
 */
router.post('/', chatController.getOrCreateChat);

/**
 * @swagger
 * /api/chat/{chatId}:
 *   delete:
 *     summary: Delete a chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     responses:
 *       200:
 *         description: Chat deleted successfully
 */
router.delete('/:chatId', chatController.deleteChat);

/* =========================
   Messages (nested under chat)
========================= */

/**
 * @swagger
 * /api/chat/{chatId}/messages:
 *   get:
 *     summary: Get messages in a chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 */
router.get('/:chatId/messages', chatController.getChatMessages);

/**
 * @swagger
 * /api/chat/{chatId}/messages:
 *   post:
 *     summary: Send a message in a chat
 *     tags: [Chats]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *         description: Chat ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *               messageType:
 *                 type: string
 *                 enum: [text, image, file]
 *     responses:
 *       201:
 *         description: Message sent successfully
 */
router.post('/:chatId/messages', validateMessage, chatController.sendMessage);

module.exports = router;
