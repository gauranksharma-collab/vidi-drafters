require('dotenv').config();
const app = require('../src/app');
const connectDB = require('../src/config/db');

// Vercel's Node runtime invokes this exported handler per request instead
// of calling app.listen() (there's no long-running process to bind a port
// to). connectDB() is cheap to call every time - it reuses the cached
// connection once one exists (see src/config/db.js).
module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    res.status(500).json({ error: 'Database connection failed.' });
    return;
  }
  return app(req, res);
};
