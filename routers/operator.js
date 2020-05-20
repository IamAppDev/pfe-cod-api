const express = require('express');
const router = express.Router();
const cpsRouter = require('./operator/orders');
const customers = require('./operator/customers');

router.use('/orders', cpsRouter);
router.use('/customers', customers);

module.exports = router;
