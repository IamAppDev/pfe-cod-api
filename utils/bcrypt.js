const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const getHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

// access token
const getToken = (obj) => {
    return jwt.sign(obj, config.get('jwtPrivateKey'), { expiresIn: '1h' });
};

// confirme registration token
const getEmailToken = (obj) => {
    return jwt.sign(obj, config.get('jwtEmailPrivateKey'), { expiresIn: '1day' });
};

// refresh token
const getRefreshToken = (obj) => {
    return jwt.sign(obj, config.get('jwtRefreshPrivateKey'), { expiresIn: '60days' });
};

module.exports.getHashPassword = getHashPassword;
module.exports.getToken = getToken;
module.exports.getEmailToken = getEmailToken;
module.exports.getRefreshToken = getRefreshToken;