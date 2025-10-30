// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// اتصال به دیتابیس (فقط برای اطمینان از اتصال)
const connection = require('./config/db');

// ایمپورت مسیر محصولات
const productRoutes = require('./routes/productRoutes');

const app = express();

// تنظیمات پایه
app.use(express.json());
app.use(cors());

// مسیر تست ساده
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

// مسیر اصلی برای API محصولات
app.use('/api/products', productRoutes);

module.exports = app;
