// One-time migration: copies the legacy cPanel MySQL database (vidhik_vd, the
// /draft sub-app's DB) into the new MongoDB database, into `legacy_*`
// collections, unmodified aside from renaming the MySQL `id` to `legacyId`.
// Safe to re-run: each table is cleared and re-inserted (upsert-by-legacyId).
require('dotenv').config();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const {
  LegacyUser,
  LegacyAdminUser,
  LegacyContactUs,
  LegacyOrder,
  LegacyOrderDetail,
  LegacyOrderDone,
  LegacyOrderStatus,
  LegacyProduct,
  LegacyCategory,
  LegacySubCategory,
} = require('../src/models/legacy');

const TABLE_MAP = [
  { table: 'users', Model: LegacyUser },
  { table: 'admin_users', Model: LegacyAdminUser },
  { table: 'contact_us', Model: LegacyContactUs },
  { table: 'order1', Model: LegacyOrder },
  { table: 'order_det', Model: LegacyOrderDetail },
  { table: 'order_done', Model: LegacyOrderDone },
  { table: 'order_status', Model: LegacyOrderStatus },
  { table: 'product', Model: LegacyProduct },
  { table: 'categories', Model: LegacyCategory },
  { table: 'sub_categories', Model: LegacySubCategory },
];

async function migrateTable(conn, table, Model) {
  const [rows] = await conn.query(`SELECT * FROM \`${table}\``);
  if (rows.length === 0) {
    console.log(`  ${table}: 0 rows, skipping`);
    return;
  }

  const ops = rows.map((row) => {
    const { id, ...rest } = row;
    return {
      updateOne: {
        filter: { legacyId: id },
        update: { $set: { legacyId: id, ...rest } },
        upsert: true,
      },
    };
  });

  const result = await Model.bulkWrite(ops);
  console.log(
    `  ${table}: ${rows.length} rows -> upserted ${result.upsertedCount}, modified ${result.modifiedCount}`
  );
}

async function main() {
  console.log('Connecting to legacy MySQL...');
  const conn = await mysql.createConnection({
    host: process.env.LEGACY_MYSQL_HOST,
    user: process.env.LEGACY_MYSQL_USER,
    password: process.env.LEGACY_MYSQL_PASSWORD,
    database: process.env.LEGACY_MYSQL_DATABASE,
  });

  console.log('Connecting to MongoDB...');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`  target database: ${mongoose.connection.name}`);

  console.log('Migrating tables...');
  for (const { table, Model } of TABLE_MAP) {
    await migrateTable(conn, table, Model);
  }

  await conn.end();
  await mongoose.disconnect();
  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
