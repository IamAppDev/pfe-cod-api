const express = require('express');
const router = express.Router();
const { verifyToken } = require('../utils/bcrypt');
const { user } = require('../models/index');

router.post('/', async (req, res, next) => {
	const token = req.body.token;
    let result = null;
    try {
        const { email } = verifyToken(token, 'jwtEmailPrivateKey');
		result = await user.update({ confirme: true, active: true }, { where: { email } });
    } catch (ex) {
		return res.sendStatus(404);
	}
	return result[0] ? res.sendStatus(200) : res.sendStatus(404);
});

module.exports = router;
