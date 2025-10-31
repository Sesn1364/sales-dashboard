const connection = require('../../config/db');

module.exports = (req, res) => {
  const { name, description, price, status } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  const productDescription = description || null;
  const productStatus = status || 'active';

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
