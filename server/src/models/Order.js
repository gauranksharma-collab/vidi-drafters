const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    documentTypeSlug: String,
    documentName: String,
    formData: mongoose.Schema.Types.Mixed,
    stampState: String,
    stampAmount: Number,
    addOns: [{ key: String, label: String, price: Number }],
    otherInfo: String,
    basePrice: Number,
    totalPrice: Number,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: { type: [orderItemSchema], required: true },

    billingAddress: {
      firstName: String,
      lastName: String,
      address: String,
      suite: String,
      city: String,
      state: String,
      pincode: String,
      email: String,
      mobile: String,
    },

    itemsTotal: { type: Number, required: true },
    shippingFee: { type: Number, required: true, default: 40 },
    tax: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true },

    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    paymentProvider: { type: String, enum: ['razorpay', 'manual'], default: 'manual' },
    razorpayOrderId: { type: String, default: null },
    razorpayPaymentId: { type: String, default: null },

    orderStatus: {
      type: String,
      enum: ['placed', 'processing', 'ready', 'dispatched', 'completed', 'cancelled'],
      default: 'placed',
    },
    trackingCourier: { type: String, default: '' },
    trackingNumber: { type: String, default: '' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
