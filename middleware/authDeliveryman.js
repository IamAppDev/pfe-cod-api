const authDeliveryman = (req, res, next) => {
	if (res.locals.role === 'ROLE_DELIVERYMAN') {
		console.log('HEEEEEEEEEEEEEEEEE', res.locals.role, res.locals.userId);
		next();
	} else {
		console.log('HEEEEEEEEEEEEEEEEE', res.locals.role, res.locals.userId);
		res.sendStatus(401);
	}
};

module.exports = authDeliveryman;
