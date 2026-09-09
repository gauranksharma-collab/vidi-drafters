const express = require('express');
const { requireUser } = require('../middleware/auth');
const { register, login, me, updateMe, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', requireUser, me);
router.patch('/me', requireUser, updateMe);

module.exports = router;
