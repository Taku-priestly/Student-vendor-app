const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3003;

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   DATABASE CONNECTION
========================= */
const connectDB = require("./src/config/database");
connectDB();

/* =========================
   SWAGGER SETUP
========================= */
const { setupSwagger } = require("./src/config/swagger");
setupSwagger(app);

/* =========================
   ROUTES
========================= */
const callRoutes = require("./src/routes/callroutes");

// Mount routes
app.use("/api/call", callRoutes);


/* =========================
   BASE ROUTE
========================= */
app.get("/", (req, res) => {
  res.json({
    message: "Communication Service API",
    endpoints: {
      calls: "/api/call",
      chats: "/api/chat",
      messages: "/api/chat/:chatId/messages",
      swagger: "/api-docs",
      health: "/health",
    },
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   HEALTH CHECK
========================= */
app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    service: "communication-service",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

/* =========================
   ERROR HANDLING
========================= */
const errorHandler = require("./src/middleware/errorhandler");
app.use(errorHandler);

/* =========================
   404 HANDLER
========================= */
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    method: req.method,
    path: req.originalUrl,
  });
});

/* =========================
   START SERVER
========================= */
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log("\n🚀 Server started successfully!");
  console.log(`📍 Port: ${PORT}`);
  console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
  console.log(`🏠 Home: http://localhost:${PORT}`);
  console.log(`🩺 Health: http://localhost:${PORT}/health`);
  console.log(`📞 Calls API: http://localhost:${PORT}/api/call`);
  console.log(`💬 Chats API: http://localhost:${PORT}/api/chat`);
  console.log(`✉️ Messages API: http://localhost:${PORT}/api/chat/:chatId/messages`);
  console.log("\n⚡ Ready to accept requests...\n");
});

/* =========================
   GRACEFUL SHUTDOWN
========================= */
process.on("SIGTERM", () => {
  console.log("\n🛑 SIGTERM received. Shutting down...");
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log("✅ MongoDB disconnected");
      process.exit(0);
    });
  });
});

module.exports = server;
