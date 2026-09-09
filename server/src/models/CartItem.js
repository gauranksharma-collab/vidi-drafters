const mongoose = require('mongoose');

// Unlike the legacy system (a single wide MySQL table with a superset of
// every affidavit's columns, one row = one insert = "add to cart"), each
// item's form answers are stored as a flexible object here since the
// field shape is fully defined by its DocumentType config, not the schema.
const cartItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    documentTypeSlug: { type: String, required: true },
    documentName: { type: String, required: true },
    formData: { type: mongoose.Schema.Types.Mixed, required: true },
    stampState: { type: String, required: true },
    stampAmount: { type: Number, required: true },
    addOns: [{ key: String, label: String, price: Number }],
    otherInfo: { type: String, default: '' },
    basePrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CartItem', cartItemSchema);
