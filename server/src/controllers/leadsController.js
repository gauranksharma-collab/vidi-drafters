const Registration = require('../models/Registration');
const ContactMessage = require('../models/ContactMessage');

function paginationParams(req) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

async function listRegistrations(req, res) {
  const { page, limit, skip } = paginationParams(req);
  const filter = req.query.status ? { status: req.query.status } : {};
  const [items, total] = await Promise.all([
    Registration.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Registration.countDocuments(filter),
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
}

async function updateRegistrationStatus(req, res) {
  const { status } = req.body;
  const item = await Registration.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found.' });
  res.json({ item });
}

async function listContactMessages(req, res) {
  const { page, limit, skip } = paginationParams(req);
  const filter = req.query.status ? { status: req.query.status } : {};
  const [items, total] = await Promise.all([
    ContactMessage.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ContactMessage.countDocuments(filter),
  ]);
  res.json({ items, total, page, pages: Math.ceil(total / limit) });
}

async function updateContactMessageStatus(req, res) {
  const { status } = req.body;
  const item = await ContactMessage.findByIdAndUpdate(req.params.id, { $set: { status } }, { new: true });
  if (!item) return res.status(404).json({ error: 'Not found.' });
  res.json({ item });
}

async function summary(req, res) {
  const [newRegistrations, newContacts, totalRegistrations, totalContacts] = await Promise.all([
    Registration.countDocuments({ status: 'new' }),
    ContactMessage.countDocuments({ status: 'new' }),
    Registration.countDocuments(),
    ContactMessage.countDocuments(),
  ]);
  res.json({ newRegistrations, newContacts, totalRegistrations, totalContacts });
}

module.exports = {
  listRegistrations,
  updateRegistrationStatus,
  listContactMessages,
  updateContactMessageStatus,
  summary,
};
