const express = require('express');
const router = express.Router();
const usersRouter = require('./admin/users');
const customersRouter = require('./admin/customers');
const productsRouter = require('./admin/products');
const sourcesRouter = require('./admin/sources');

router.use('/users', usersRouter);
router.use('/customers', customersRouter);
router.use('/products', productsRouter);
router.use('/sources', sourcesRouter);

module.exports = router;
