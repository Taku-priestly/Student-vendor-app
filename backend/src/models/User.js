const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,           // you can enforce more rules
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'vendor', /* ... */],
    required: true,
    default: 'student',
  },
}, {
  timestamps: true,   // automatically adds createdAt + updatedAt
});


userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  try {
    this.password = await bcrypt.hash(this.password, 10);
    // no next() needed
  } catch (err) {
    console.error('Hash error:', err);
    throw err;           // ← this stops the save
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Hide password in JSON responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);