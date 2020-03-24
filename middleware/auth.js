const config = require('config');
const jwt = require('jsonwebtoken');


const auth = (req, res, next) => {

    const token = req.header('x-auth-token');
    if( !token ) return res.sendStatus(401);

    try {
        jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    } catch(err) {
        res.status(401).send('Invalid token.');
    }

};


module.exports = auth;