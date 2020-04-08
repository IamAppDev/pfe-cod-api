const express = require('express');
const router = express.Router();
const register = require('../services/register');
const Joi = require('joi');

router.post('/', async (req, res) => {
	console.log(req.body);
	const obj = { ...req.body };

	if (!Joi.validate(obj, schema).error) {
		const result = await register(obj);
		if (result instanceof Error) {
			switch (result.message) {
				case '400':
					res.statusMessage = 'UniqueViolation';
					return res.sendStatus(400);
				default:
					// 500 or else => Server Internal Error
					return res.sendStatus(500);
			}
		} else {
			return res.sendStatus(200);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		return res.sendStatus(400);
	}
});

const schema = Joi.object().keys({
	firstName: Joi.string().min(3).max(20).required(),
	lastName: Joi.string().min(3).max(20).required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
		.required()
});

module.exports = router;
