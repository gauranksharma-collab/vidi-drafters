const mongoose = require('mongoose');

// One doc per (mobile, purpose): sendOtp overwrites any prior pending OTP
// for that mobile. TTL-indexed on createdAt so pending/verified docs are
// dropped automatically well after either window (5 min OTP validity, 15
// min post-verify window) has passed - no separate cleanup job needed.
const otpVerificationSchema = new mongoose.Schema({
  mobile: { type: String, required: true, trim: true },
  purpose: { type: String, required: true, default: 'register' },
  otpHash: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, default: 0 },
  verifiedAt: { type: Date, default: null },
  verifiedExpiresAt: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now, expires: 30 * 60 },
});

otpVerificationSchema.index({ mobile: 1, purpose: 1 }, { unique: true });

module.exports = mongoose.model('OtpVerification', otpVerificationSchema);
