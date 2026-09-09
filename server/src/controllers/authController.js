const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { LegacyUser } = require('../models/legacy');
const { signToken } = require('../utils/jwt');
const { sendMail } = require('../utils/mailer');

const PUBLIC_FIELDS = 'name email mobile createdAt';

async function register(req, res) {
  const { name, email, mobile, password } = req.body;
  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ error: 'Name, email, mobile and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, mobile, passwordHash });

  const token = signToken({ sub: user._id, type: 'user' });
  res.status(201).json({ token, user: { name: user.name, email: user.email, mobile: user.mobile } });
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid email or password.' });

  const token = signToken({ sub: user._id, type: 'user' });
  res.json({ token, user: { name: user.name, email: user.email, mobile: user.mobile } });
}

async function me(req, res) {
  const user = await User.findById(req.userId).select(PUBLIC_FIELDS);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ user });
}

async function updateMe(req, res) {
  const { name, mobile } = req.body;
  const user = await User.findByIdAndUpdate(
    req.userId,
    { $set: { ...(name && { name }), ...(mobile && { mobile }) } },
    { new: true }
  ).select(PUBLIC_FIELDS);
  res.json({ user });
}

// Forgot password: if no active User account exists yet but a matching
// legacy customer record does (from the old MySQL DB), lazily create the
// User account here so they can claim it via the reset link. Legacy
// passwords were stored in plaintext, so they are never reused directly.
async function forgotPassword(req, res) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email is required.' });

  let user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    const legacy = await LegacyUser.findOne({ email: email.toLowerCase() });
    if (legacy) {
      const placeholderHash = await bcrypt.hash(crypto.randomBytes(32).toString('hex'), 10);
      user = await User.create({
        name: legacy.name,
        email: legacy.email,
        mobile: legacy.mobile,
        passwordHash: placeholderHash,
        migratedFromLegacy: true,
      });
    }
  }

  // Always respond the same way whether or not an account was found, so we
  // don't leak which emails are registered.
  if (!user) {
    return res.json({ message: 'If that email is registered, a reset link has been sent.' });
  }

  const rawToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordTokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
  user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}&email=${encodeURIComponent(user.email)}`;
  try {
    await sendMail({
      to: user.email,
      subject: 'Reset your VIDHIK DRAFTER password',
      html: `<p>Hello ${user.name},</p><p>Click below to reset your password. This link expires in 1 hour.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>If you did not request this, you can ignore this email.</p>`,
    });
  } catch (err) {
    console.error('Password reset email failed:', err.message);
  }

  res.json({ message: 'If that email is registered, a reset link has been sent.' });
}

async function resetPassword(req, res) {
  const { email, token, password } = req.body;
  if (!email || !token || !password) {
    return res.status(400).json({ error: 'Email, token and new password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
    email: email.toLowerCase(),
    resetPasswordTokenHash: tokenHash,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) return res.status(400).json({ error: 'Reset link is invalid or has expired.' });

  user.passwordHash = await bcrypt.hash(password, 10);
  user.resetPasswordTokenHash = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.json({ message: 'Password has been reset. You can now log in.' });
}

module.exports = { register, login, me, updateMe, forgotPassword, resetPassword };
