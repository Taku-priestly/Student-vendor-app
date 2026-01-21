const db = require('../Config/db.js');

const OrderItem = {
  create: async (orderId, menuId, quantity, price) => {
    await db.query(
      `INSERT INTO order_items (order_id, menu_id, quantity, price)
       VALUES (?, ?, ?, ?)`,
      [orderId, menuId, quantity, price]
    );
  },

  findByOrderId: async (orderId) => {
    const [rows] = await db.query(
      `SELECT * FROM order_items WHERE order_id = ?`,
      [orderId]
    );
    return rows;
  }
};

module.exports = OrderItem;
