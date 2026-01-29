const express = require("express");
const router = express.Router();
const db = require("../config/db"); 

// 1. VIEW: Get all menu items
// URL: GET http://localhost:3002/api/menus
router.get("/", (req, res) => {
    const sql = "SELECT * FROM menus";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 2. ADD: Create a new food item
// URL: POST http://localhost:3002/api/menus
router.post("/", (req, res) => {
    const { name, price, category } = req.body;
    const sql = "INSERT INTO menus (name, price) VALUES (?, ?)";
    
    db.query(sql, [name, price, category], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Item added!", id: result.insertId });
    });
});

// 3. EDIT: Update an item
// URL: PUT http://localhost:3002/api/menus/:id
router.put("/:id", (req, res) => {
    const { name, price, category, is_available } = req.body;
    const sql = "UPDATE menus SET name=?, price=? WHERE id=?";
    
    db.query(sql, [name, price, category, is_available, req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item updated successfully" });
    });
});

// 4. DELETE: Remove an item
// URL: DELETE http://localhost:3002/api/menus/:id
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM menus WHERE id = ?";
    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Item deleted" });
    });
});

module.exports = router;