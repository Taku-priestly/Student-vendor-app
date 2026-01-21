const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return next(new AppError('Unauthorized', 401));
  try {
    req.user = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET);
    next();
  } catch {
    next(new AppError('Invalid token', 401));
  }
};
