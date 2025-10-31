// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// اتصال به دیتابیس (فقط برای اطمینان از اتصال)
const connection = require('./config/db');

// ایمپورت مسیرها
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes'); // 👈 مسیر کاربران

const app = express();

// تنظیمات پایه
app.use(express.json());
app.use(cors());

// مسیر تست ساده
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// مسیرهای اصلی API
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // 👈 اضافه شد

module.exports = app;
