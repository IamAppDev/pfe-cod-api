const { verifyToken } = require('../utils/bcrypt');

const auth = (req, res, next) => {
	const token = req.header('x-auth-token');

	try {
		const { role } = verifyToken(token, 'jwtPrivateKey');
		res.locals.role = role;
		next();
	} catch (err) {
		res.sendStatus(401);
	}
};

module.exports = auth;
