const db = require('../Config/db.js');

const Order = {
  create: async (studentId, vendorId, totalAmount) => {
    const [res] = await db.query(
      `INSERT INTO orders (student_id, vendor_id, total_amount, status)
       VALUES (?, ?, ?, 'pending')`,
      [studentId, vendorId, totalAmount]
    );
    return res.insertId;
  },

  findById: async (orderId) => {
    const [rows] = await db.query(
      `SELECT * FROM orders WHERE order_id = ?`,
      [orderId]
    );
    return rows[0];
  },

  findByStudent: async (studentId) => {
    const [rows] = await db.query(
      `SELECT * FROM orders WHERE student_id = ? ORDER BY created_at DESC`,
      [studentId]
    );
    return rows;
  },

  findByVendor: async (vendorId) => {
    const [rows] = await db.query(
      `SELECT * FROM orders WHERE vendor_id = ? ORDER BY created_at DESC`,
      [vendorId]
    );
    return rows;
  },

  updateStatus: async (orderId, status) => {
    await db.query(
      `UPDATE orders SET status = ?, updated_at = NOW() WHERE order_id = ?`,
      [status, orderId]
    );
  },

  cancel: async (orderId) => {
    await db.query(
      `UPDATE orders
       SET status = 'cancelled', updated_at = NOW()
       WHERE order_id = ? AND status IN ('pending','accepted')`,
      [orderId]
    );
  }
};

module.exports = Order;
