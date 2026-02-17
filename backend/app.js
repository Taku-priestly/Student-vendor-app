const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
const connectDB = require("./src/config/database");
connectDB();

// ⭐ ADD THIS ROUTE ⭐
app.get("/api/test", (req, res) => {
  res.json({ 
    message: "Backend connected successfully!",
    timestamp: new Date().toISOString(),
    status: "OK"
  });
});

// Start server (make sure this is at the bottom)
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
  console.log(`✅ Test endpoint: http://localhost:${PORT}/api/test`);
});