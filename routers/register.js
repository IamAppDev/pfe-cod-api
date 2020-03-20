const express = require('express');
const router = express.Router();
const register = require('../services/register');

router.post('/',  async (req, res) => {
    
    const result = await register(req.body);

    if( result instanceof Error ) {
       switch( result.message ){
            case '400':
                return res.status(400).send('Unique Violation !');
            case '500':
                return res.status(500).send('Server problem !');
            default:
                return res.send();
       }
    } else {
        return res.header('x-auth-token', result).sendStatus(200);
    }

});

module.exports = router;