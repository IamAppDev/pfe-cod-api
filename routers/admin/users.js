const express = require('express');
const router = express.Router();
const { getAll, add, update, getUser } = require('../../services/admin/users');
const Joi = require('joi');
const { cities } = require('../../models/enums/cities');
const { getHashPassword } = require('../../utils/bcrypt');
const { sendInvitation, sendPasswordReset } = require('../../utils/sendEmail');

router.post('/getAll', async (req, res, next) => {
	const bossId = res.locals.userId;
	if (bossId) {
		const usersList = await getAll(bossId);
		res.status(200).send(usersList);
	} else {
		res.sendStatus(404);
	}
});

router.post('/add', async (req, res, next) => {
	const user = req.body;
	if (!Joi.validate(user, schema).error) {
		const bossId = res.locals.userId;
		const passwordNotHashed = user.password;
		user.confirmed = true;
		user.active = false;
		user.bossId = bossId;
		user.password = await getHashPassword(user.password);
		const boss = await getUser(bossId);
		if (boss) {
			const result = await add(user);
			sendInvitation(user.firstName, user.email, passwordNotHashed, boss.firstName, boss.lastName);
			result === 1 ? res.sendStatus(400) : res.sendStatus(200);
		} else {
			res.sendStatus(400);
		}
	} else {
		res.sendStatus(400);
	}
});

router.post('/update', async (req, res, next) => {
	const user = req.body;
	if (!Joi.validate(user, schema).error) {
		user.bossId = res.locals.userId;
		user.password = await getHashPassword(user.password);
		const result = await update(user);
		result === 1 ? res.sendStatus(200) : res.sendStatus(500);
	} else {
		res.sendStatus(400);
	}
});

router.post('/resetPassword', async (req, res, next) => {
	const bossId = res.locals.userId;
	const user = req.body;
	if (!Joi.validate(user, schemaReset).error) {
		const passwordNotHashed = user.password;
		user.password = await getHashPassword(user.password);
		user.bossId = bossId;
		const result = await update(user);
		if (result === 1) {
			sendPasswordReset(user.firstName, user.email, passwordNotHashed);
			res.sendStatus(200);
		} else {
			res.sendStatus(500);
		}
	} else {
		res.sendStatus(400);
	}
});

const schema = Joi.object().keys({
	id: Joi.number(),
	firstName: Joi.string().min(3).max(20).required(),
	lastName: Joi.string().min(3).max(20).required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
		.required(),
	city: Joi.string().valid(cities),
	phone: Joi.string(),
	idCard: Joi.string(),
	price: Joi.number(),
	roleLibelle: Joi.string().valid('ROLE_OPERATOR', 'ROLE_DELIVERYMAN')
});

const schemaReset = Joi.object().keys({
	id: Joi.number().required(),
	firstName: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string()
		.required()
		.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
		.required()
});

module.exports = router;
