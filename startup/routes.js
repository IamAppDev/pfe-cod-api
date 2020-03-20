const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const register = require('../routers/register');
const login = require('../routers/login');
const home = require('../routers/home');
const error = require('../middleware/error');

module.exports = (app, logger) => {
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('tiny')); // http loging used in dev env
    app.use('/register', register);
    app.use('/login', login);
    app.use('/home', home);
    app.use(error(logger));
};