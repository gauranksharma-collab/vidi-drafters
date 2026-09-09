const express = require('express');
const { requireAdmin, requireSuperAdmin } = require('../middleware/auth');
const adminAuth = require('../controllers/adminAuthController');
const adminManagement = require('../controllers/adminManagementController');
const leads = require('../controllers/leadsController');
const legacy = require('../controllers/legacyController');
const draftOrders = require('../controllers/adminDraftController');

const router = express.Router();

// Auth
router.post('/login', adminAuth.login);
router.get('/me', requireAdmin, adminAuth.me);
router.post('/change-password', requireAdmin, adminAuth.changePassword);

// Admin user management (superadmin only)
router.get('/admins', requireAdmin, requireSuperAdmin, adminManagement.list);
router.post('/admins', requireAdmin, requireSuperAdmin, adminManagement.create);
router.patch('/admins/:id/status', requireAdmin, requireSuperAdmin, adminManagement.setStatus);

// Leads
router.get('/summary', requireAdmin, leads.summary);
router.get('/registrations', requireAdmin, leads.listRegistrations);
router.patch('/registrations/:id/status', requireAdmin, leads.updateRegistrationStatus);
router.get('/contact-messages', requireAdmin, leads.listContactMessages);
router.patch('/contact-messages/:id/status', requireAdmin, leads.updateContactMessageStatus);

// Draft app orders
router.get('/draft/summary', requireAdmin, draftOrders.summary);
router.get('/draft/orders', requireAdmin, draftOrders.listOrders);
router.get('/draft/orders/:orderNumber', requireAdmin, draftOrders.getOrder);
router.patch('/draft/orders/:orderNumber', requireAdmin, draftOrders.updateOrder);

// Legacy (read-only)
router.get('/legacy/users', requireAdmin, legacy.listLegacyUsers);
router.get('/legacy/orders', requireAdmin, legacy.listLegacyOrders);
router.get('/legacy/orders-done', requireAdmin, legacy.listLegacyOrderDone);
router.get('/legacy/contact-us', requireAdmin, legacy.listLegacyContactUs);

module.exports = router;
