const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { signToken } = require('../utils/jwt');

const PUBLIC_FIELDS = 'username email mobile role status mustResetPassword createdAt';

async function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const admin = await Admin.findOne({ username });
  if (!admin || !admin.status) return res.status(401).json({ error: 'Invalid credentials.' });

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials.' });

  const token = signToken({ sub: admin._id, type: 'admin', role: admin.role }, '12h');
  res.json({
    token,
    admin: {
      username: admin.username,
      email: admin.email,
      role: admin.role,
      mustResetPassword: admin.mustResetPassword,
    },
  });
}

async function me(req, res) {
  const admin = await Admin.findById(req.adminId).select(PUBLIC_FIELDS);
  if (!admin) return res.status(404).json({ error: 'Admin not found.' });
  res.json({ admin });
}

async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Current and new password are required.' });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ error: 'New password must be at least 8 characters.' });
  }

  const admin = await Admin.findById(req.adminId);
  const valid = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!valid) return res.status(401).json({ error: 'Current password is incorrect.' });

  admin.passwordHash = await bcrypt.hash(newPassword, 10);
  admin.mustResetPassword = false;
  await admin.save();

  res.json({ message: 'Password updated.' });
}

module.exports = { login, me, changePassword };
