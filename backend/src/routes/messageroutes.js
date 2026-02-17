const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const { validateMessage } = require('../middleware/validation');
const chatController = require('../controllers/chatController'); // Already exports instance

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management
 */

/**
 * @swagger
 * /api/message/{chatId}:
 *   get:
 *     summary: Get messages for a specific chat
 *     tags: [Messages]
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
router.get('/:chatId', authenticateToken, chatController.getChatMessages);

/**
 * @swagger
 * /api/message/{chatId}:
 *   post:
 *     summary: Send a message in a chat
 *     tags: [Messages]
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
router.post('/:chatId', authenticateToken, validateMessage, chatController.sendMessage);

module.exports = router;
