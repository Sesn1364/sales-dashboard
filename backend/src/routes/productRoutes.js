// src/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/products/productController');
const { registerUser, loginUser } = require('../controllers/users/userController');

// مشاهده محصولات
router.get('/', getAllProducts);

// اضافه کردن محصول جدید
router.post('/', addProduct);

// ویرایش محصول
router.put('/:id', updateProduct);

// حذف محصول
router.delete('/:id', deleteProduct);



// ثبت نام کاربران
router.post('/register', registerUser);

// ورود کاربران
router.post('/login', loginUser);

module.exports = router;
