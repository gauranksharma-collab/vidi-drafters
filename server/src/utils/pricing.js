const documentTypes = require('../data/documentTypes');

const STAMP_AMOUNTS = [10, 50, 101];

// Legacy bug being fixed here: the old PHP forms sent `price`/`total` as
// plain POST fields and trusted them verbatim - trivial to tamper with.
// Price is now always recomputed server-side from the DocumentType config,
// the chosen stamp value, and the chosen add-ons.
function computeItemPrice({ documentTypeSlug, stampAmount, addOnKeys = [] }) {
  const docType = documentTypes[documentTypeSlug];
  if (!docType) throw new Error('Unknown document type.');

  if (!STAMP_AMOUNTS.includes(Number(stampAmount))) {
    throw new Error('Invalid stamp amount.');
  }

  const availableAddOns = docType.addOns || [];
  const chosenAddOns = availableAddOns.filter((a) => addOnKeys.includes(a.key));
  const addOnsTotal = chosenAddOns.reduce((sum, a) => sum + a.price, 0);

  const totalPrice = docType.basePrice + Number(stampAmount) + addOnsTotal;

  return { docType, chosenAddOns, totalPrice };
}

module.exports = { computeItemPrice, STAMP_AMOUNTS };
