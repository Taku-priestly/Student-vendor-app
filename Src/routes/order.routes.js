const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/order.controller');
const auth = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const v = require('../validators/order.validator');

router.post('/orders',  v.createOrderValidator, validate, ctrl.createOrder);
router.get('/orders/:id',  ctrl.getOrderById);
router.get('/orders/user/:id',  ctrl.getUserOrders);
router.put('/orders/:id/status',  v.updateStatusValidator, validate, ctrl.updateOrderStatus);
router.delete('/orders/:id',  ctrl.cancelOrder);

module.exports = router;
