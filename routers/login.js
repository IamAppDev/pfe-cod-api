const express = require('express');
const router = express.Router();
const login = require('../services/login');
const {getToken} = require('../utils/bcrypt');


router.post('/', async (req, res) => {

    const {email, motdepasse} = req.body;
    if( !email || !motdepasse || email === "" || motdepasse === "" ){
        return res.status(400).send('Email/Password required !');
    }

    const result = await login(req.body);
    if( result ) {
        return res.header('x-auth-token', getToken({email: email})).sendStatus(200);
    } else {
        return res.status(400).send('Email/Password incorrect(s) !');
    }

});

module.exports = router;