const crypto = require('crypto');
const User = require('../models/User');
const OtpVerification = require('../models/OtpVerification');
const { sendSms } = require('../utils/sms');

const MOBILE_REGEX = /^[6-9]\d{9}$/;
const OTP_VALIDITY_MS = 5 * 60 * 1000;
const VERIFIED_VALIDITY_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp).digest('hex');
}

async function sendOtp(req, res) {
  const { mobile, purpose = 'register' } = req.body;
  if (!mobile || !MOBILE_REGEX.test(mobile)) {
    return res.status(400).json({ error: 'Enter a valid 10-digit mobile number.' });
  }

  if (purpose === 'register') {
    const existing = await User.findOne({ mobile });
    if (existing) {
      return res.status(409).json({ error: 'An account with this mobile number already exists.' });
    }
  }

  const otp = String(crypto.randomInt(1000, 10000));

  try {
    await sendSms(mobile, `${otp} is your VIDHIK DRAFTER OTP. Valid for 5 minutes.`);
  } catch (err) {
    console.error('SMS send failed:', err.message);
    return res.status(502).json({ error: 'Could not send OTP right now. Please try again shortly.' });
  }

  await OtpVerification.findOneAndUpdate(
    { mobile, purpose },
    {
      mobile,
      purpose,
      otpHash: hashOtp(otp),
      expiresAt: new Date(Date.now() + OTP_VALIDITY_MS),
      attempts: 0,
      verifiedAt: null,
      verifiedExpiresAt: null,
      createdAt: new Date(),
    },
    { upsert: true }
  );

  res.json({ message: 'OTP sent.' });
}

async function verifyOtp(req, res) {
  const { mobile, otp, purpose = 'register' } = req.body;
  if (!mobile || !otp) {
    return res.status(400).json({ error: 'Mobile and OTP are required.' });
  }

  const record = await OtpVerification.findOne({ mobile, purpose });
  if (!record || record.expiresAt < new Date()) {
    return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    return res.status(429).json({ error: 'Too many incorrect attempts. Please request a new OTP.' });
  }

  if (hashOtp(otp) !== record.otpHash) {
    record.attempts += 1;
    await record.save();
    return res.status(400).json({ error: 'Incorrect OTP.' });
  }

  record.verifiedAt = new Date();
  record.verifiedExpiresAt = new Date(Date.now() + VERIFIED_VALIDITY_MS);
  await record.save();

  res.json({ message: 'Mobile number verified.' });
}

// Used by authController.register to confirm the mobile was actually
// OTP-verified before creating the account - the legacy register_submit.php
// never checked this at all, so OTP verification there was a client-side
// gate only, not enforced server-side.
async function isMobileVerified(mobile, purpose = 'register') {
  const record = await OtpVerification.findOne({ mobile, purpose });
  return Boolean(record?.verifiedExpiresAt && record.verifiedExpiresAt > new Date());
}

async function consumeVerification(mobile, purpose = 'register') {
  await OtpVerification.deleteOne({ mobile, purpose });
}

module.exports = { sendOtp, verifyOtp, isMobileVerified, consumeVerification };
