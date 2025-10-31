// src/controllers/users/loginUser.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../../config/db');

const loginUser = (req, res) => {
  const { username, password } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

  if (!username || !password) {
    return res.status(400).json({ message: 'نام کاربری و رمز عبور الزامی است' });
  }

  connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(404).json({ message: 'کاربر یافت نشد' });

    const user = results[0];

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'حساب کاربری غیرفعال است' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'رمز عبور اشتباه است' });
    }

    // تولید JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({
      message: '✅ ورود موفقیت‌آمیز بود',
      token
    });
  });
};

module.exports = loginUser;
