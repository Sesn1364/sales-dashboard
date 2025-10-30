// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');

// مسیر اصلی برای محصولات
router.get('/', getAllProducts);

module.exports = router;
