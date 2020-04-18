const { verifyToken } = require('../utils/bcrypt');

const auth = (req, res, next) => {
	const token = req.header('x-auth-token');

	try {
		const { userId, role } = verifyToken(token, 'jwtPrivateKey');
		res.locals.role = role;
		res.locals.userId = userId;
		next();
	} catch (err) {
		res.sendStatus(401);
	}
};

module.exports = auth;
