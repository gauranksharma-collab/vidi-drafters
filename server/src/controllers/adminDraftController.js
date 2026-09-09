const Order = require('../models/Order');

function paginationParams(req) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

async function listOrders(req, res) {
  const { page, limit, skip } = paginationParams(req);
  const filter = {};
  if (req.query.orderStatus) filter.orderStatus = req.query.orderStatus;
  if (req.query.paymentStatus) filter.paymentStatus = req.query.paymentStatus;
  if (req.query.q) {
    filter.$or = [
      { orderNumber: { $regex: req.query.q, $options: 'i' } },
      { 'billingAddress.email': { $regex: req.query.q, $options: 'i' } },
      { 'billingAddress.mobile': { $regex: req.query.q, $options: 'i' } },
    ];
  }

  const [items, total] = await Promise.all([
    Order.find(filter).populate('user', 'name email').sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments(filter),
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
}

async function getOrder(req, res) {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber }).populate('user', 'name email mobile');
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  res.json({ order });
}

async function updateOrder(req, res) {
  const { orderStatus, paymentStatus, trackingCourier, trackingNumber } = req.body;
  const update = {};
  if (orderStatus) update.orderStatus = orderStatus;
  if (paymentStatus) update.paymentStatus = paymentStatus;
  if (trackingCourier !== undefined) update.trackingCourier = trackingCourier;
  if (trackingNumber !== undefined) update.trackingNumber = trackingNumber;

  const order = await Order.findOneAndUpdate({ orderNumber: req.params.orderNumber }, { $set: update }, { new: true });
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  res.json({ order });
}

async function summary(req, res) {
  const [placed, processing, dispatched, paidPending] = await Promise.all([
    Order.countDocuments({ orderStatus: 'placed' }),
    Order.countDocuments({ orderStatus: 'processing' }),
    Order.countDocuments({ orderStatus: 'dispatched' }),
    Order.countDocuments({ paymentStatus: 'pending' }),
  ]);
  res.json({ placed, processing, dispatched, paidPending });
}

module.exports = { listOrders, getOrder, updateOrder, summary };
