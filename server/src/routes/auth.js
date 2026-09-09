const express = require('express');
const rateLimit = require('express-rate-limit');
const { requireUser } = require('../middleware/auth');
const { register, login, me, updateMe, forgotPassword, resetPassword } = require('../controllers/authController');
const { sendOtp, verifyOtp } = require('../controllers/otpController');

const router = express.Router();

// SMS costs money per send, so cap it harder than the general form limiter.
const otpSendLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 3 });
const otpVerifyLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 15 });

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/send-otp', otpSendLimiter, sendOtp);
router.post('/verify-otp', otpVerifyLimiter, verifyOtp);
router.get('/me', requireUser, me);
router.patch('/me', requireUser, updateMe);

module.exports = router;
