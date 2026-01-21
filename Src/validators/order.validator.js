const { body, param } = require('express-validator');

exports.createOrderValidator = [
  body('vendor_id').isInt(),
  body('order_items').isArray({ min: 1 }),          // <-- changed
  body('order_items.*.menu_id').isInt(),           // <-- changed
  body('order_items.*.quantity').isInt({ min: 1 }),// <-- changed
  body('order_items.*.price').isNumeric(),         // <-- changed
  body('total_amount').isNumeric()
];

exports.updateStatusValidator = [
  param('id').isInt(),
  body('status').isIn(['pending','accepted','preparing','completed','cancelled'])
];

