const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const register = require('../routers/register');
const login = require('../routers/login');
const confirmation = require('../routers/confirmation');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const authOperator = require('../middleware/authOperator');
const admin = require('../routers/admin');
const operator = require('../routers/operator');
const error = require('../middleware/error');
const cors = require('../middleware/cors');
const getNewToken = require('../routers/getNewToken');

module.exports = (app, logger) => {
	app.use(express.json());
	app.use(helmet());
	app.use(morgan('dev')); // http loging used in dev env
	app.use(cors);
	app.use('/register', register);
	app.use('/login', login);
	app.use('/confirmation', confirmation);
	app.use('/refresh/token', getNewToken);
	app.use(auth); // before going down user need to auth
	// app.use('/sadmin');
	app.use('/admin', authAdmin, admin);
	app.use('/operator', authOperator, operator);
	// app.use('/delivryman');
	app.use(error(logger));
};
