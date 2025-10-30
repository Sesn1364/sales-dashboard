// src/controllers/productController.js
const connection = require('../config/db');

// کنترلر برای گرفتن لیست محصولات
const getAllProducts = (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }
    res.json(results);
  });
};

module.exports = { getAllProducts };
