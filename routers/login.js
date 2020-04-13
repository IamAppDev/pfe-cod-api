const express = require('express');
const router = express.Router();
const login = require('../services/login');
const Joi = require('Joi');

router.post('/', async (req, res) => {
	const obj = { ...req.body };

	if (!Joi.validate(obj, schema).error) {
		const result = await login(obj);
		if (isNaN(result)) {
			return res
				.header({
					'x-auth-token': result.accessToken,
					'x-refresh-token': result.refreshToken
				})
				.sendStatus(200);
		} else {
			switch (result) {
				case 1:
				case 4:
					res.statusMessage = 'Incorrect';
					return res.sendStatus(400);
				case 2:
					res.statusMessage = 'NeedConfirmation';
					return res.sendStatus(400);
				case 3:
					return res.status(400).send('AccountDisabled');
			}
		}
	} else {
		res.statusMessage = 'DataRequired';
		return res.sendStatus(400);
	}
});

const schema = Joi.object().keys({
	email: Joi.string().email().required(),
	password: Joi.string()
		// .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
		.required()
});

module.exports = router;
