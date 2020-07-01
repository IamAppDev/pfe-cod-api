const express = require('express');
const router = express.Router();
const usersRouter = require('./admin/users');
const customersRouter = require('./admin/customers');
const productsRouter = require('./admin/products');
const sourcesRouter = require('./admin/sources');
const ordersRouter = require('./admin/orders');
const dashboardRouter = require('./admin/dashboard');

router.use('/users', usersRouter);
router.use('/customers', customersRouter);
router.use('/products', productsRouter);
router.use('/sources', sourcesRouter);
router.use('/orders', ordersRouter);
router.use('/dashboard', dashboardRouter);

module.exports = router;
