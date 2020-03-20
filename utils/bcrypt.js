const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const getHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

const getToken = (obj) => {
    return jwt.sign(obj, config.get('jwtPrivateKey'), { expiresIn: '1day'});
};

module.exports.getHashPassword = getHashPassword;
module.exports.getToken = getToken;