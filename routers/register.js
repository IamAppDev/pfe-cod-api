const express = require('express');
const router = express.Router();
const register = require('../services/register');
const Joi = require('joi');

router.post('/',  async (req, res) => {
    
    let dataValidity = false;
    const obj = {...req.body};

    if( !(Joi.validate(obj, schema)).error ) {

        dataValidity = true;
        const result = await register(obj);
        if( result instanceof Error ) {
            switch( result.message ){
                case '400':
                    return res.status(400).send('Unique Violation !');
                default: // 500 or else
                    return res.status(500).send('Internal Error !');
            }
        } else {
            return res.header('x-auth-token', result).sendStatus(200);
        }

    }

    if( !dataValidity ) return res.status(400).send('Wrong Data Types !');
});

const schema = Joi.object().keys({
    nom: Joi.string().min(3).max(20).required(),
    prenom: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    motdepasse: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/)
});

module.exports = router;