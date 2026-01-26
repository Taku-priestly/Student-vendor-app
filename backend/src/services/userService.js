const User = require('../models/User');

class UserService {
  async checkEmailExists(email) {
    try {
      const user = await User.findOne({ email }).lean();
      return !!user;
    } catch (err) {
      console.error('checkEmailExists error:', err);
      throw new Error('Database error');
    }
  }

  async createUser({ email, password, role }) {
    try {
      const user = new User({ email, password, role });
      await user.save();
      return user.toJSON(); // password already removed
    } catch (err) {
      if (err.code === 11000) { // duplicate key
        throw new Error('This email is already taken');
      }
      console.error('createUser error:', err);
      throw new Error('Impossible to create user');
    }
  }

  async authenticateUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Email or password incorrect');
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Email or password incorrect');
      }

      return user.toJSON(); // password removed
    } catch (err) {
      console.error('authenticateUser error:', err);
      throw err;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await User.findOne({ email }).lean();
      if (!user) return null;
      // lean() already gives plain object → password is still there → remove it
      const { password, ...safeUser } = user;
      return safeUser;
    } catch (err) {
      console.error('getUserByEmail error:', err);
      throw new Error('Impossible to get User');
    }
  }
}

module.exports = new UserService();