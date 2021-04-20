const express = require('express');
const authRoutes = require('./auth.route');
const customerRoutes = require('./customer.route');
const router = express.Router();
/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/customer', customerRoutes);

module.exports = router;
