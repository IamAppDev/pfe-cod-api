const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { getToken, verifyToken } = require('../utils/bcrypt');
const { user, role } = require('../models/index');

router.post('/', async (req, res, next) => {
	const { refreshToken } = req.body;
	try {
		const { email } = verifyToken(refreshToken, 'jwtRefreshPrivateKey');
		const result = await user.findOne({
			raw: true,
			where: { email, refreshToken, active: true, confirmed: true },
			include: { model: role }
		});
		if (!result) {
			return res.sendStatus(400);
		} else {
			const newToken = getToken({ userId: result.id, email, role: result['role.libelle'] });
			return res.header('x-auth-token', newToken).sendStatus(200);
		}
	} catch (err) {
		return res.sendStatus(400);
	}
});

module.exports = router;
