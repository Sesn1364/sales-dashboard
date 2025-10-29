// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// می‌گیم که برنامه بتونه اطلاعات JSON رو بخونه
app.use(express.json());

// اجازه دسترسی از همه دامنه‌ها (فعلاً برای تست)
app.use(cors());

// مسیر تست
app.get('/', (req, res) => {
  res.send('Backend is running ✅');
});

module.exports = app;
