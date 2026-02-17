const { body, validationResult } = require('express-validator');

const validateMessage = [
    body('content')
        .trim()
        .notEmpty()
        .withMessage('Message content is required')
        .isLength({ max: 1000 })
        .withMessage('Message cannot exceed 1000 characters'),
    body('receiverId')
        .notEmpty()
        .withMessage('Receiver ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateCallRequest = [
    body('receiverId')
        .notEmpty()
        .withMessage('Receiver ID is required'),
    body('callType')
        .optional()
        .isIn(['audio', 'video'])
        .withMessage('Call type must be audio or video'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateMessage, validateCallRequest };