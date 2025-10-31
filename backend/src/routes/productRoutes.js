// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// مشاهده محصولات
router.get('/', getAllProducts);

// اضافه کردن محصول جدید
router.post('/', addProduct);

// ویرایش محصول
router.put('/:id', updateProduct);

// حذف محصول
router.delete('/:id', deleteProduct);

module.exports = router;
