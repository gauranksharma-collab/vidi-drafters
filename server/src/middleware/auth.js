const { verifyToken } = require('../utils/jwt');

function requireUser(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Not authenticated.' });
  try {
    const payload = verifyToken(token);
    if (payload.type !== 'user') throw new Error('wrong token type');
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session.' });
  }
}

function requireAdmin(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ error: 'Not authenticated.' });
  try {
    const payload = verifyToken(token);
    if (payload.type !== 'admin') throw new Error('wrong token type');
    req.adminId = payload.sub;
    req.adminRole = payload.role;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session.' });
  }
}

function requireSuperAdmin(req, res, next) {
  if (req.adminRole !== 'superadmin') {
    return res.status(403).json({ error: 'Superadmin access required.' });
  }
  next();
}

module.exports = { requireUser, requireAdmin, requireSuperAdmin };
