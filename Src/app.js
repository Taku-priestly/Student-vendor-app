const express = require('express');
const cors = require('cors');
const orderRoutes = require('./routes/order.routes');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', orderRoutes);
app.use(errorHandler);

module.exports = app;
