const express = require('express');
const router = express.Router();
const callController = require('../controllers/callcontroller'); // Already an instance
const { authenticateToken } = require('../middleware/auth'); // JWT middleware

/**
 * @swagger
 * /calls/initiate:
 *   post:
 *     summary: Initiate a new call
 *     tags: [Calls]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CallRequest'
 *     responses:
 *       200:
 *         description: Call initiated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                 message:
 *                   type: string
 */
router.post('/initiate', authenticateToken, callController.initiateCall);

/**
 * @swagger
 * /calls/{callId}/status:
 *   patch:
 *     summary: Update call status
 *     tags: [Calls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: callId
 *         required: true
 *         schema:
 *           type: string
 *         description: Call ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accepted, ongoing, completed, missed, rejected]
 *               duration:
 *                 type: integer
 *                 description: Duration in seconds
 *     responses:
 *       200:
 *         description: Call status updated
 */
router.patch('/:callId/status', authenticateToken, callController.updateCallStatus);

/**
 * @swagger
 * /calls/history:
 *   get:
 *     summary: Get user's call history
 *     tags: [Calls]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: Call history retrieved
 */
router.get('/history', authenticateToken, callController.getCallHistory);

module.exports = router;
