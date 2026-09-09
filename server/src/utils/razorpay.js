const Razorpay = require('razorpay');

// Real payment credentials are optional. The legacy system's payment
// integration was never actually functional in production (wired to a
// payment-gateway sandbox with hardcoded test keys, and its success/failure
// callbacks pointed at a stale database - see project notes). Rather than
// repeat that, this app runs in a clearly-labeled "manual" payment mode
// until real RAZORPAY_KEY_ID/RAZORPAY_KEY_SECRET are supplied in .env.
function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

function getRazorpayInstance() {
  if (!isRazorpayConfigured()) return null;
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

module.exports = { isRazorpayConfigured, getRazorpayInstance };
