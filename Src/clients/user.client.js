const axios = require('axios');

exports.validateUser = async (userId, token) => {
  await axios.get(
    `${process.env.USER_SERVICE_URL}/api/users/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
