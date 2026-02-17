const express = require('express');
const router = express.Router();
const chatRoutes = require('./chatroutes');
const callRoutes = require('./callroutes.js');

// API documentation route
router.get('/', (req, res) => {
    res.json({
        service: 'Communication Microservice',
        version: '1.0.0',
        endpoints: {
            chats: '/api/chats',
            calls: '/api/calls'
        }
    });
});

// Mount route modules
router.use('/chats', chatRoutes);
router.use('/calls', callRoutes);

module.exports = router;