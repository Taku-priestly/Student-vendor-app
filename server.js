const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes'); // Ensure this folder/file exists

const app = express();
const PORT = 3002;

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes - This creates the /api/menus prefix
app.use("/api/menus", menuRoutes); 

// Fallback for wrong URLs
app.use((req, res) => {
    res.status(404).send("Route not found. Try http://localhost:3002/api/menus");
});

app.listen(PORT, () => {
    console.log(`Menu Service is live on port ${PORT}`);
});