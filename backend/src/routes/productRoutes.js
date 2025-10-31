// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/products/productController');

const authenticateToken = require('../middleware/authMiddleware');

// مشاهده همه محصولات (عمومی)
router.get('/', getAllProducts);

// اضافه کردن محصول جدید (فقط کاربران لاگین‌شده)
router.post('/', authenticateToken, addProduct);

// ویرایش محصول (فقط کاربران لاگین‌شده)
router.put('/:id', authenticateToken, updateProduct);

// حذف محصول (فقط کاربران لاگین‌شده)
router.delete('/:id', authenticateToken, deleteProduct);


module.exports = router;
