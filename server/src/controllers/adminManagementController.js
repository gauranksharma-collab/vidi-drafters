const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Admin = require('../models/Admin');

const PUBLIC_FIELDS = 'username email mobile role status mustResetPassword createdAt';

async function list(req, res) {
  const admins = await Admin.find().select(PUBLIC_FIELDS).sort({ createdAt: -1 });
  res.json({ admins });
}

// Creates the admin with a random temporary password (returned once in the
// response) rather than accepting a password from the request body, and
// forces a reset on first login.
async function create(req, res) {
  const { username, email, mobile, role } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required.' });
  }

  const existing = await Admin.findOne({ username });
  if (existing) return res.status(409).json({ error: 'Username already exists.' });

  const tempPassword = crypto.randomBytes(9).toString('base64url');
  const passwordHash = await bcrypt.hash(tempPassword, 10);

  const admin = await Admin.create({
    username,
    email,
    mobile,
    role: role === 'superadmin' ? 'superadmin' : 'admin',
    passwordHash,
    mustResetPassword: true,
  });

  res.status(201).json({
    admin: { username: admin.username, email: admin.email, role: admin.role },
    tempPassword,
  });
}

async function setStatus(req, res) {
  const { status } = req.body;
  const admin = await Admin.findByIdAndUpdate(req.params.id, { $set: { status: !!status } }, { new: true }).select(
    PUBLIC_FIELDS
  );
  if (!admin) return res.status(404).json({ error: 'Admin not found.' });
  res.json({ admin });
}

module.exports = { list, create, setStatus };
