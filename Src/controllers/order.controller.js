const OrderService = require('../services/order.service');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = catchAsync(async (req, res) => {
  const studentId = req.body.student_id;
  const orderItems = req.body.order_items;

  const orderId = await OrderService.createOrder(
    studentId,
    req.body.vendor_id,
    orderItems,            // ✅ FIXED
    req.body.total_amount
  );

  res.status(201).json({ order_id: orderId });
});


exports.getOrderById = catchAsync(async (req, res) => {
  const order = await OrderService.getOrderDetails(req.params.id);
  res.json(order);
});

exports.getUserOrders = catchAsync(async (req, res) => {
  const orders = await OrderService.getUserOrders(
    req.params.id,
    'student'
  );
  res.json(orders);
});


exports.updateOrderStatus = catchAsync(async (req, res) => {
  await OrderService.updateOrderStatus(req.params.id, req.body.status);
  res.json({ message: 'Order status updated' });
});

exports.cancelOrder = catchAsync(async (req, res) => {
  await OrderService.cancelOrder(req.params.id);
  res.json({ message: 'Order cancelled' });
});
