const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const getHashPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	const hashed = await bcrypt.hash(password, salt);
	return hashed;
};

const getToken = (obj) => {
	return jwt.sign(obj, config.get('jwtPrivateKey'), { expiresIn: '2000ms' }); // 15 min
};

const getEmailToken = (obj) => {
	return jwt.sign(obj, config.get('jwtEmailPrivateKey'), { expiresIn: '1day' });
};

const getRefreshToken = (obj) => {
	return jwt.sign(obj, config.get('jwtRefreshPrivateKey'), { expiresIn: '60days' });
};

const verifyToken = (token, privateKey) => {
	return jwt.verify(token, config.get(privateKey));
};

module.exports.getHashPassword = getHashPassword;
module.exports.getToken = getToken;
module.exports.getEmailToken = getEmailToken;
module.exports.getRefreshToken = getRefreshToken;
module.exports.verifyToken = verifyToken;
