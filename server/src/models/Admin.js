const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, trim: true, lowercase: true, default: '' },
    mobile: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['superadmin', 'admin'], default: 'admin' },
    status: { type: Boolean, default: true },
    mustResetPassword: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', adminSchema);
