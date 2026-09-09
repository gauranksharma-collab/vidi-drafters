const CartItem = require('../models/CartItem');
const { computeItemPrice } = require('../utils/pricing');

async function addToCart(req, res) {
  const { documentTypeSlug, formData, stampState, stampAmount, addOns, otherInfo } = req.body;

  if (!documentTypeSlug || !formData || !stampState || !stampAmount) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  let docType, chosenAddOns, totalPrice;
  try {
    ({ docType, chosenAddOns, totalPrice } = computeItemPrice({
      documentTypeSlug,
      stampAmount,
      addOnKeys: addOns || [],
    }));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }

  const item = await CartItem.create({
    user: req.userId,
    documentTypeSlug,
    documentName: docType.name,
    formData,
    stampState,
    stampAmount: Number(stampAmount),
    addOns: chosenAddOns,
    otherInfo: otherInfo || '',
    basePrice: docType.basePrice,
    totalPrice,
  });

  res.status(201).json({ item });
}

async function listCart(req, res) {
  const items = await CartItem.find({ user: req.userId }).sort({ createdAt: -1 });
  const total = items.reduce((sum, i) => sum + i.totalPrice, 0);
  res.json({ items, total });
}

async function removeFromCart(req, res) {
  const item = await CartItem.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!item) return res.status(404).json({ error: 'Item not found.' });
  res.json({ message: 'Removed.' });
}

module.exports = { addToCart, listCart, removeFromCart };
