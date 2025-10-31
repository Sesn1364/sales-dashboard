const connection = require('../../config/db');

module.exports = (req, res) => {
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
