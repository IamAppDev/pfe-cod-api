const authOperator = (req, res, next) => {
	if (res.locals.role === 'ROLE_OPERATOR') {
		console.log('HEEEEEEEEEEEEEEEEE', res.locals.role, res.locals.userId);
		next();
	} else {
		console.log('HEEEEEEEEEEEEEEEEE', res.locals.role, res.locals.userId);
		res.sendStatus(401);
	}
};

module.exports = authOperator;
