
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// ────────────────────────────────────────────────
// Load environment variables FIRST — before anything else
require('dotenv').config();

// Now safe to use process.env
const { connectDB } = require('./src/config/db');

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// your middlewares, routes, etc...


// Middlewares
app.use(cors()); // Permet les requêtes cross-origin (React frontend)
app.use(express.json()); // Parse le corps des requêtes en JSON
app.use(express.urlencoded({ extended: true }));

// Middleware de logging simple
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes API
app.use('/api/auth', authRoutes);

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Serveur d\'authentification opérationnel',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route non trouvée' 
  });
});

// Middleware de gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error('Erreur serveur:', err.stack);
  res.status(500).json({ 
    error: 'Erreur interne du serveur' 
  });
});

async function startServer() {
  try {
    await connectDB();
    // remove: await db.initializeDatabase();  ← no longer needed

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`MongoDB should be connected now`);
    });
  } catch (err) {
    console.error('Startup failed:', err);
    process.exit(1);
  }
}

startServer();