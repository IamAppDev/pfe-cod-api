const express = require('express');
const router = express.Router();
const usersRouter = require('./admin/users');
const customersRouter = require('./admin/customers');
const productsRouter = require('./admin/products');

router.use('/users', usersRouter);
router.use('/customers', customersRouter);
router.use('/products', productsRouter);

module.exports = router;
