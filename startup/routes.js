const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const register = require('../routers/register');
const login = require('../routers/login');
const confirmation = require('../routers/confirmation');
const auth = require('../middleware/auth');
const admin = require('../routers/admin');
const error = require('../middleware/error');
const cors = require('../middleware/cors');
const getNewAccesToken = require('../routers/getNewAccesToken');

module.exports = (app, logger) => {
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev')); // http loging used in dev env
    app.use(cors);
    app.use('/register', register);
    app.use('/login', login);
    app.use('/confirmation' ,confirmation);
    app.use('/refresh/token', getNewAccesToken);
    app.use(auth); // before going down user need to auth
    // app.use('/sadmin');
    app.use('/admin', admin);
    // app.use('/operator');
    // app.use('/delivryman');
    app.use(error(logger));
};