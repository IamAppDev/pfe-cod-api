const express = require('express');
const router = express.Router();
const cpsRouter = require('./operator/orders');
const customers = require('./operator/customers');
const dashboard = require('./operator/dashboard');

router.use('/orders', cpsRouter);
router.use('/customers', customers);
router.use('/dashboard', dashboard);

module.exports = router;
