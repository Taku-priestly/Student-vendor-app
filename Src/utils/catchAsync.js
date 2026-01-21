module.exports = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(err => {
    console.error('FULL ERROR OBJECT ↓↓↓');
    console.error(err);              // 👈 VERY IMPORTANT
    console.error(err.stack);        // 👈 VERY IMPORTANT

    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  });
