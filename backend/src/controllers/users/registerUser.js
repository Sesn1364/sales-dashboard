// src/controllers/users/registerUser.js
const bcrypt = require('bcryptjs');
const connection = require('../../config/db');

const registerUser = (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: 'تمام فیلدها الزامی هستند' });
  }

  // هش کردن رمز عبور
  const hashedPassword = bcrypt.hashSync(password, 10);

  // بررسی تکراری نبودن نام کاربری
  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(400).json({ message: 'نام کاربری تکراری است' });

    // درج در دیتابیس
    connection.query(
      'INSERT INTO users (username, password, role, status, created_at) VALUES (?, ?, ?, ?, NOW())',
      [username, hashedPassword, role, 'active'],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        res.status(201).json({
          id: result.insertId,
          username,
          role,
          message: '✅ کاربر با موفقیت ثبت شد'
        });
      }
    );
  });
};

module.exports = registerUser;
