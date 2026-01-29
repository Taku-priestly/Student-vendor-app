const db = require("../config/db");

exports.addMenu = (req, res) => {
  console.log("HEADERS:", req.headers);
  console.log("BODY:", req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Request body is missing",
    });
  }

  const { vendor_id, name, description, price } = req.body;

  const sql =
    "INSERT INTO menus (vendor_id, name, description, price) VALUES (?, ?, ?, ?)";

  db.query(sql, [vendor_id, name, description, price], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Menu item added successfully" });
  });
};
