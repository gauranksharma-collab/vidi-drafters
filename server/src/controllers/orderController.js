const Order = require('../models/Order');

async function listMyOrders(req, res) {
  const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json({ orders });
}

async function getMyOrder(req, res) {
  const order = await Order.findOne({ orderNumber: req.params.orderNumber, user: req.userId });
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  res.json({ order });
}

module.exports = { listMyOrders, getMyOrder };
