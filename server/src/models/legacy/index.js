const mongoose = require('mongoose');

// Legacy MySQL tables migrated as-is. Fields are left flexible (strict: false)
// since several source tables (order_det/order_done) are wide, sparsely-used
// affidavit forms with 150+ optional columns - modeling every field up front
// isn't worth it for a one-time historical import.
function legacyModel(name, collection) {
  const schema = new mongoose.Schema(
    { legacyId: { type: Number, index: true, unique: true } },
    { strict: false, collection, timestamps: false }
  );
  return mongoose.model(name, schema);
}

module.exports = {
  LegacyUser: legacyModel('LegacyUser', 'legacy_users'),
  LegacyAdminUser: legacyModel('LegacyAdminUser', 'legacy_admin_users'),
  LegacyContactUs: legacyModel('LegacyContactUs', 'legacy_contact_us'),
  LegacyOrder: legacyModel('LegacyOrder', 'legacy_orders'),
  LegacyOrderDetail: legacyModel('LegacyOrderDetail', 'legacy_order_details'),
  LegacyOrderDone: legacyModel('LegacyOrderDone', 'legacy_order_done'),
  LegacyOrderStatus: legacyModel('LegacyOrderStatus', 'legacy_order_status'),
  LegacyProduct: legacyModel('LegacyProduct', 'legacy_products'),
  LegacyCategory: legacyModel('LegacyCategory', 'legacy_categories'),
  LegacySubCategory: legacyModel('LegacySubCategory', 'legacy_sub_categories'),
};
