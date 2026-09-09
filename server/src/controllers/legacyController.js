const {
  LegacyUser,
  LegacyOrder,
  LegacyOrderDone,
  LegacyContactUs,
} = require('../models/legacy');

function paginationParams(req) {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  return { page, limit, skip: (page - 1) * limit };
}

function makeListHandler(Model) {
  return async function list(req, res) {
    const { page, limit, skip } = paginationParams(req);
    const search = (req.query.q || '').trim();
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { user: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      Model.find(filter).sort({ legacyId: -1 }).skip(skip).limit(limit),
      Model.countDocuments(filter),
    ]);
    res.json({ items, total, page, pages: Math.ceil(total / limit) });
  };
}

module.exports = {
  listLegacyUsers: makeListHandler(LegacyUser),
  listLegacyOrders: makeListHandler(LegacyOrder),
  listLegacyOrderDone: makeListHandler(LegacyOrderDone),
  listLegacyContactUs: makeListHandler(LegacyContactUs),
};
