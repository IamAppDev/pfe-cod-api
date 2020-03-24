const express = require('express');
const router = express.Router();
const login = require('../services/login');
const Joi = require('Joi');


router.post('/', async (req, res) => {

    const obj = {...req.body};

    if( (Joi.validate(obj, schema)).error ){
        
        const result = await login(obj);
        if( isNaN(result) ) {
            return res.header('x-auth-token', result).sendStatus(200);
        } else {
            switch(result) {
                case 1, 4:
                    return res.status(400).send('Email/Password incorrect(s) !');
                case 2:
                    return res.status(400).send('Please confirm email !');
                case 3:
                    return res.status(400).send('Your account is disabled !');
            }
        }

    } else {
        return res.status(400).send('Email/Password required !');
    }

});

const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    motdepasse: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/)
});

module.exports = router;