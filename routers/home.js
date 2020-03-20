const express = require('express');
const router = express.Router();
const {getToken} = require('../utils/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/', (req, res) => {

    const token = getToken({});

    res.send(token);

});

router.post('/v', (req, res) => {

    const token = req.body.token;
    const result = jwt.verify(token, config.get('jwtPrivateKey'));
    //return jwt.verify(token, config.get('jwtPrivateKey')) ? res.send('valid') : res.send('not valid');
    res.send(result);

});


module.exports = router;