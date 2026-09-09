const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const registrationRoutes = require('./routes/registration');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const draftRoutes = require('./routes/draft');

const app = express();

app.use(cors());
app.use(express.json());

const formLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30 });

app.get('/', (req, res) => res.json({ ok: true, service: 'vidhik-drafters-api' }));
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/registration', formLimiter, registrationRoutes);
app.use('/api/contact', formLimiter, contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/draft', draftRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

module.exports = app;
