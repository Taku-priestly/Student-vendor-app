
const express = require('express');
const userService = require('../src/services/userService');

const router = express.Router();

// ────────────────────────────────────────────────
// Validation middlewares (simplified + stricter roles)
const validateRegistration = (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Basic password strength (expand later if needed)
  if (password.length < 8) {
    return res.status(400).json({
      error: 'Too short password (minimum 10 caracters)'
    });
  }

  if (role === 'admin') {
    return res.status(403).json({
      error: 'Admin role cannot be created via register'
    });
  }

  const allowedRoles = ['student', 'vendor']; // ← choose ONE convention
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      error: `Non valid role. Allowed roles: ${allowedRoles.join(', ')}`
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
};

// ────────────────────────────────────────────────
// Routes

router.post('/register', validateRegistration, async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Minimal logging – NO password
    console.log(`[REGISTER] trial for ${email} (${role})`);

    if (await userService.checkEmailExists(email)) {
      return res.status(409).json({ error: 'This email is already taken' });
    }

    const newUser = await userService.createUser({ email, password, role });

    const { password: _, ...safeUser } = newUser;

    res.status(201).json({
      message: 'User created successfully',
      user: safeUser
    });
  } catch (error) {
    console.error('[REGISTER ERROR]', error.message);
    res.status(500).json({ error: 'Error during register' });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(`[LOGIN] Trial for ${email}`);

    const user = await userService.authenticateUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Incorrect Email or password' });
    }

    const { password: _, ...safeUser } = user;

    res.json({
      message: 'Connexion successful',
      user: safeUser
      // ← Add { token: jwt.sign(...) } later
    });
  } catch (error) {
    console.error('[LOGIN ERROR]', error.message);
    res.status(401).json({ error: 'Email or password incorrect' });
  }
});

router.get('/profile/:email', async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { password: _, ...safeUser } = user;
    res.json(safeUser);
  } catch (error) {
    console.error('[PROFILE ERROR]', error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;