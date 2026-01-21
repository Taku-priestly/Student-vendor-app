const db = require('../Config/db');
const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');
const userClient = require('../clients/user.client');
const menuClient = require('../clients/menu.client');
const AppError = require('../utils/AppError');

const OrderService = {
  createOrder: async (studentId, vendorId, items, totalAmount, token) => {
    // await userClient.validateUser(studentId, token)
    //   .catch(() => { throw new AppError('Invalid user', 401); });

    // const menuCheck = await menuClient.validateMenuItems(items);
    // if (!menuCheck.valid) throw new AppError('Invalid menu items', 400);

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      const orderId = await Order.create(studentId, vendorId, totalAmount);

      for (const item of items) {
        await OrderItem.create(orderId, item.menu_id, item.quantity, item.price);
      }

      await conn.commit();
      return orderId;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  },

  getOrderDetails: async (orderId) => {
    const order = await Order.findById(orderId);
    if (!order) throw new AppError('Order not found', 404);
    const items = await OrderItem.findByOrderId(orderId);
    return { ...order, items };
  },

  getUserOrders: async (userId, role) =>
    role === 'vendor'
      ? Order.findByVendor(userId)
      : Order.findByStudent(userId),

  updateOrderStatus: async (orderId, status) =>
    Order.updateStatus(orderId, status),

  cancelOrder: async (orderId) =>
    Order.cancel(orderId)
};

module.exports = OrderService;
