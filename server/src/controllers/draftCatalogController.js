const documentTypes = require('../data/documentTypes');

function listDocumentTypes(req, res) {
  const { category } = req.query;
  const all = Object.values(documentTypes);
  const filtered = category ? all.filter((d) => d.category === category) : all;
  res.json({
    items: filtered.map(({ slug, name, category, basePrice, description }) => ({ slug, name, category, basePrice, description })),
  });
}

function getDocumentType(req, res) {
  const doc = documentTypes[req.params.slug];
  if (!doc) return res.status(404).json({ error: 'Document type not found.' });
  res.json({ documentType: doc });
}

module.exports = { listDocumentTypes, getDocumentType };
