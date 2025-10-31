const connection = require('../../config/db');

module.exports = (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('❌ Error fetching products:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
};
