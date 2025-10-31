const connection = require('../../config/db');

module.exports = (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error deleting product:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: '✅ Product deleted successfully' });
  });
};
