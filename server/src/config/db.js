const mongoose = require('mongoose');

// Serverless functions can be invoked many times per second, each a fresh
// execution context - without caching, every invocation would open a new
// MongoDB connection and quickly exhaust the connection pool. Caching the
// connection promise on the module (which Node/Vercel keeps warm between
// invocations of the same function instance) makes connectDB() safe to
// call on every request.
let connectionPromise = null;

async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(process.env.MONGODB_URI).catch((err) => {
      connectionPromise = null;
      throw err;
    });
  }

  await connectionPromise;
  return mongoose.connection;
}

module.exports = connectDB;
