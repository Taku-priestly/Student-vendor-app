const axios = require('axios');

exports.validateMenuItems = async (items) => {
  const res = await axios.post(
    `${process.env.MENU_SERVICE_URL}/api/menus/validate`,
    { items }
  );
  return res.data; // { valid: true|false }
};
