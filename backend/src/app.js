// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// 👈 اضافه: اتصال به دیتابیس
const connection = require('./config/db');

const app = express();

// می‌گیم که برنامه بتونه اطلاعات JSON رو بخونه
app.use(express.json());

// اجازه دسترسی از همه دامنه‌ها (فعلاً برای تست)
app.use(cors());

// تست اضافه کردن یک محصول
connection.query(
  "INSERT INTO products (name, price) VALUES (?, ?)",
  ['مودم LTE', 250000],
  (err, result) => {
    if (err) {
      console.error('❌ Error inserting product:', err);
      return;
    }
    console.log('✅ Product inserted, ID:', result.insertId);
  }
);

// تست گرفتن محصولات
connection.query("SELECT * FROM products", (err, results) => {
  if (err) {
    console.error('❌ Error fetching products:', err);
    return;
  }
  console.log('📦 Products:', results);
});

// مسیر تست
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

module.exports = app;
