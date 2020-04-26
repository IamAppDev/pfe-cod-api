const express = require('express');
const router = express.Router();
const { getAll, add, update, getUser } = require('../../services/admin/users');
const Joi = require('joi');
const { cities } = require('../../models/enums/cities');
const { getHashPassword } = require('../../utils/bcrypt');
const { sendInvitation, sendPasswordReset } = require('../../utils/sendEmail');
const RandExp = require('randexp');
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8}$/;

router.get('/getAll/:offset?/:limit?', async (req, res, next) => {
	const bossId = res.locals.userId;
	let { offset, limit } = req.params;
	if (offset && limit) {
		try {
			offset = parseInt(offset);
			limit = parseInt(limit);
		} catch (err) {
			offset = 0;
			limit = 0;
		}
	} else {
		offset = 0;
		limit = 0;
	}
	if (bossId) {
		const usersList = await getAll(bossId, offset, limit);
		res.status(200).send(usersList);
	} else {
		res.sendStatus(404);
	}
});

router.post('/add', async (req, res, next) => {
	const user = req.body;
	if (!Joi.validate(user, schemaAdd).error) {
		const bossId = res.locals.userId;
		const passwordNotHashed = new RandExp(passwordRegex).gen();
		delete user.id;
		user.confirmed = true;
		user.bossId = bossId;
		user.password = await getHashPassword(passwordNotHashed);
		const boss = await getUser(bossId);
		if (boss) {
			const result = await add(user);
			sendInvitation(user.firstName, user.email, passwordNotHashed, boss.firstName, boss.lastName);
			if (result === 1) {
				res.sendStatus(200);
			} else {
				res.statusMessage = 'NotAdded1';
				res.sendStatus(400);
			}
		} else {
			res.statusMessage = 'NotAdded2';
			res.sendStatus(400);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

router.post('/update', async (req, res, next) => {
	const user = req.body;
	delete user.createdAt;
	delete user.updatedAt;
	delete user.roleLibelle;
	if (!Joi.validate(user, schemaUpdate).error) {
		user.bossId = res.locals.userId;
		user.password = await getHashPassword(new RandExp(passwordRegex).gen());
		const result = await update(user);
		if (result === 1) {
			res.sendStatus(200);
		} else {
			res.statusMessage = 'NotUpdated';
			res.sendStatus(400);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

router.post('/resetPassword', async (req, res, next) => {
	const bossId = res.locals.userId;
	const user = req.body;
	if (!Joi.validate(user, schemaReset).error) {
		const passwordNotHashed = new RandExp(passwordRegex).gen();
		user.password = await getHashPassword(passwordNotHashed);
		user.bossId = bossId;
		const result = await update(user);
		if (result === 1) {
			sendPasswordReset(user.firstName, user.email, passwordNotHashed);
			res.sendStatus(200);
		} else {
			res.statusMessage = 'NotAdded';
			res.sendStatus(400);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

const schemaAdd = Joi.object().keys({
	firstName: Joi.string().min(3).max(20).required(),
	lastName: Joi.string().min(3).max(20).required(),
	email: Joi.string().email().required(),
	active: Joi.boolean().required(),
	city: Joi.string().valid(cities).allow(null),
	phone: Joi.string().allow(null),
	idCard: Joi.string().allow(null),
	price: Joi.number().allow(null),
	roleLibelle: Joi.string().valid('ROLE_OPERATOR', 'ROLE_DELIVERYMAN').required()
});

const schemaUpdate = Joi.object().keys({
	id: Joi.number().required(),
	firstName: Joi.string().min(3).max(20).required(),
	lastName: Joi.string().min(3).max(20).required(),
	email: Joi.string().email(),
	active: Joi.boolean().required(),
	city: Joi.string().valid(cities).allow(null),
	phone: Joi.string().allow(null),
	idCard: Joi.string().allow(null),
	price: Joi.number().allow(null)
});

const schemaReset = Joi.object().keys({
	id: Joi.number().required(),
	firstName: Joi.string().required(),
	email: Joi.string().email().required()
});

module.exports = router;
