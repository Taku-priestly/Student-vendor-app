// config/db.js
const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    console.log('MONGODB_URI value:', uri);                   
    
    if (!uri) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      // modern options (most are default in 2025+)
      serverSelectionTimeoutMS: 5000,
    });
    await seedDefaultUsers();
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};


async function seedDefaultUsers() {
  const defaults = [
    {
      email: 'admin@system.com',
      password: 'admin@123',
      role: 'admin'
    },
    {
      email: 'test@test.com',
      password: 'Test@123!',
      role: 'student' // or 'vendor' — choose your convention
    }
  ];

  for (const data of defaults) {
    try {
      const exists = await User.findOne({ email: data.email });
      if (!exists) {
        await User.create(data); // ← password will be hashed by pre-save hook
        console.log(`Created default user: ${data.email}`);
      }
      // else silently skip
    } catch (err) {
      console.error(`Seed failed for ${data.email}:`, err.message);
    }
  }
}


// Optional: graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB disconnected');
  process.exit(0);
});

module.exports = { connectDB, mongoose };