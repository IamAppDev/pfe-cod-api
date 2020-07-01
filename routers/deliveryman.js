const express = require('express');
const router = express.Router();
const profil = require('./deliveryman/profil');
const orders = require('./deliveryman/orders');
const stock = require('./deliveryman/stock');

router.use('/profil', profil);
router.use('/orders', orders);
router.use('/stock', stock);

module.exports = router;
