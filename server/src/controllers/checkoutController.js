const crypto = require('crypto');
const CartItem = require('../models/CartItem');
const Order = require('../models/Order');
const { isRazorpayConfigured, getRazorpayInstance } = require('../utils/razorpay');

const SHIPPING_FEE = 40;

function generateOrderNumber() {
  const rand = Math.floor(100000 + Math.random() * 900000);
  const date = new Date();
  const stamp = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getFullYear()).slice(-2)}`;
  return `VD-${rand}-${stamp}`;
}

async function createOrder(req, res) {
  const { billingAddress } = req.body;
  const required = ['firstName', 'address', 'city', 'state', 'pincode', 'email', 'mobile'];
  for (const field of required) {
    if (!billingAddress?.[field]) {
      return res.status(400).json({ error: `Billing field "${field}" is required.` });
    }
  }

  const cartItems = await CartItem.find({ user: req.userId });
  if (cartItems.length === 0) {
    return res.status(400).json({ error: 'Your cart is empty.' });
  }

  const itemsTotal = cartItems.reduce((sum, i) => sum + i.totalPrice, 0);
  const amount = itemsTotal + SHIPPING_FEE;

  const order = await Order.create({
    orderNumber: generateOrderNumber(),
    user: req.userId,
    items: cartItems.map((i) => ({
      documentTypeSlug: i.documentTypeSlug,
      documentName: i.documentName,
      formData: i.formData,
      stampState: i.stampState,
      stampAmount: i.stampAmount,
      addOns: i.addOns,
      otherInfo: i.otherInfo,
      basePrice: i.basePrice,
      totalPrice: i.totalPrice,
    })),
    billingAddress,
    itemsTotal,
    shippingFee: SHIPPING_FEE,
    tax: 0,
    amount,
    paymentProvider: isRazorpayConfigured() ? 'razorpay' : 'manual',
  });

  if (isRazorpayConfigured()) {
    const razorpay = getRazorpayInstance();
    const rzpOrder = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: 'INR',
      receipt: order.orderNumber,
    });
    order.razorpayOrderId = rzpOrder.id;
    await order.save();
  }

  await CartItem.deleteMany({ user: req.userId });

  res.status(201).json({
    order,
    razorpay: isRazorpayConfigured()
      ? { keyId: process.env.RAZORPAY_KEY_ID, orderId: order.razorpayOrderId, amount: amount * 100 }
      : null,
  });
}

async function verifyPayment(req, res) {
  const { orderNumber, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const order = await Order.findOne({ orderNumber, user: req.userId });
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expectedSignature !== razorpay_signature) {
    order.paymentStatus = 'failed';
    await order.save();
    return res.status(400).json({ error: 'Payment verification failed.' });
  }

  order.paymentStatus = 'paid';
  order.razorpayPaymentId = razorpay_payment_id;
  order.orderStatus = 'processing';
  await order.save();

  res.json({ order });
}

module.exports = { createOrder, verifyPayment };
