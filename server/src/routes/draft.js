const express = require('express');
const { requireUser } = require('../middleware/auth');
const catalog = require('../controllers/draftCatalogController');
const cart = require('../controllers/cartController');
const checkout = require('../controllers/checkoutController');
const orders = require('../controllers/orderController');

const router = express.Router();

router.get('/document-types', catalog.listDocumentTypes);
router.get('/document-types/:slug', catalog.getDocumentType);

router.get('/cart', requireUser, cart.listCart);
router.post('/cart', requireUser, cart.addToCart);
router.delete('/cart/:id', requireUser, cart.removeFromCart);

router.post('/checkout', requireUser, checkout.createOrder);
router.post('/checkout/verify-payment', requireUser, checkout.verifyPayment);

router.get('/orders', requireUser, orders.listMyOrders);
router.get('/orders/:orderNumber', requireUser, orders.getMyOrder);

module.exports = router;
