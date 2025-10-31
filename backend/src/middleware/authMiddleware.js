// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'توکن ارسال نشده است' });
  }

  const token = authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // اطلاعات کاربر در req.user ذخیره می‌شود
    next();
  } catch (err) {
    return res.status(401).json({ message: 'توکن نامعتبر است یا منقضی شده' });
  }
};

module.exports = authMiddleware;
