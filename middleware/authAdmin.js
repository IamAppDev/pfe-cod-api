const authAdmin = (req, res, next) => {
	if (res.locals.role === 'ROLE_ADMIN') {
		next();
	} else {
		console.log('HEEEEEEEEEEEEEEEEE');
		res.sendStatus(401);
	}
};

module.exports = authAdmin;
