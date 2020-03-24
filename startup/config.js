const config = require('config');

module.exports = () => {
    if( !config.get('jwtPrivateKey')  || !config.get('jwtEmailPrivateKey') ){
        throw new Error('FATAL ERROR : jwtPrivateKey/jwtEmailPrivateKey is not defined !');
    }
};