const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const register = require('../routers/register');
const login = require('../routers/login');
const confirmation = require('../routers/confirmation');
const auth = require('../middleware/auth');
const admin = require('../routers/admin');
const error = require('../middleware/error');

module.exports = (app, logger) => {
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('tiny')); // http loging used in dev env
    app.use('/register', register);
    app.use('/login', login);
    app.use('/confirmation', confirmation);
    app.use(auth); // before going down user need to auth
    // app.use('/sadmin');
    app.use('/admin', admin);
    // app.use('/operator');
    // app.use('/delivryman');
    app.use(error(logger));
};