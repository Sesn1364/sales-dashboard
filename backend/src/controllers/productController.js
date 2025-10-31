// src/controllers/productController.js
const connection = require('../config/db');

// کنترلر برای گرفتن لیست محصولات
const getAllProducts = (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err);
      res.status(500).json({ message: 'Database error' });
      return;
    }
    res.json(results);
  });
};

// اضافه کردن محصول جدید
const addProduct = (req, res) => {
  const { name, description, price, status } = req.body;

  // بررسی ورودی‌ها
  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  // مقدار پیش‌فرض برای فیلدهایی که ممکنه خالی باشن
  const productDescription = description || null;
  const productStatus = status || 'active';

  // درج در دیتابیس
  connection.query(
    'INSERT INTO products (name, description, price, status) VALUES (?, ?, ?, ?)',
    [name, productDescription, price, productStatus],
    (err, result) => {
      if (err) {
        console.error('❌ Error inserting product:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      res.status(201).json({
        id: result.insertId,
        name,
        description: productDescription,
        price,
        status: productStatus,
        message: '✅ Product added successfully'
      });
    }
  );
};

// ویرایش محصول
const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, status } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  const productDescription = description || null;
  const productStatus = status || 'active';

  connection.query(
    'UPDATE products SET name = ?, description = ?, price = ?, status = ? WHERE id = ?',
    [name, productDescription, price, productStatus, id],
    (err, result) => {
      if (err) {
        console.error('❌ Error updating product:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: '✅ Product updated successfully' });
    }
  );
};

// حذف یک محصول
const deleteProduct = (req, res) => {
  const { id } = req.params;

  connection.query(
    'DELETE FROM products WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error('❌ Error deleting product:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: '✅ Product deleted successfully' });
    }
  );
};

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };
