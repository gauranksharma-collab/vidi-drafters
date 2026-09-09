// Creates the initial superadmin account, and brings over the legacy
// admin_users (already migrated read-only into legacy_admin_users) as real
// login-capable Admin accounts - each with a fresh random temp password
// (never their old plaintext one) and mustResetPassword: true.
require('dotenv').config();
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Admin = require('../src/models/Admin');
const { LegacyAdminUser } = require('../src/models/legacy');

async function upsertAdmin({ username, email, mobile, role }) {
  const existing = await Admin.findOne({ username });
  if (existing) {
    console.log(`  skip (already exists): ${username}`);
    return;
  }
  const tempPassword = crypto.randomBytes(9).toString('base64url');
  const passwordHash = await bcrypt.hash(tempPassword, 10);
  await Admin.create({ username, email, mobile, role, passwordHash, mustResetPassword: true });
  console.log(`  created: ${username} (role: ${role})  temp password: ${tempPassword}`);
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);

  console.log('\nSeeding primary superadmin...');
  await upsertAdmin({
    username: 'superadmin',
    email: 'vidhikdrafters@gmail.com',
    mobile: '',
    role: 'superadmin',
  });

  console.log('\nMigrating legacy admin_users as admin-role accounts...');
  const legacyAdmins = await LegacyAdminUser.find();
  for (const legacy of legacyAdmins) {
    await upsertAdmin({
      username: legacy.username,
      email: legacy.email || `${legacy.username}@vidhikdrafters.local`,
      mobile: legacy.mobile,
      role: 'admin',
    });
  }

  console.log('\nDone. Temp passwords are shown once above - save them now.');
  console.log('Each account must change its password on first login (mustResetPassword).');
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
