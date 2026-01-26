const { connectDB } = require('../config/db');
const User = require('../models/User');

(async () => {
  await connectDB();

  const users = [
    { email: 'admin@system.com', password: 'admin123', role: 'admin' },
    { email: 'test@test.com',   password: 'Test123!', role: 'student' },
  ];

  for (const data of users) {
    const exists = await User.findOne({ email: data.email });
    if (!exists) {
      await User.create(data);
      console.log(`Created: ${data.email}`);
    } else {
      console.log(`Already exists: ${data.email}`);
    }
  }

  process.exit(0);
})();