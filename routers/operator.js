const express = require('express');
const router = express.Router();
const cpsRouter = require('./operator/orders');

router.use('/orders', cpsRouter);

module.exports = router;
