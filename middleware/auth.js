const config = require('config');


const auth = (req, res, next) => {

    const token = req.header('x-auth-token');
    if( !token ) return res.send(401).send('Access denied. No token provided.');

    try {
        jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    } catch(err) {
        res.status(401).send('Invalid token.');
    }

};


module.exports = auth;