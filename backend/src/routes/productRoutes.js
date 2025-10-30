// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct } = require('../controllers/productController');

// مسیر اصلی برای محصولات
router.get('/', getAllProducts);

// اضافه کردن محصول جدید
router.post('/', addProduct);

module.exports = router;
