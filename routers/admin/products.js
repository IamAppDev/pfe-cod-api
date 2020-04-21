const express = require('express');
const router = express.Router();
const { add, addBulk, update, affect, getAll } = require('../../services/admin/products');
const Joi = require('Joi');

router.post('/add', async (req, res, next) => {
	const product = req.body;
	const userId = res.locals.userId;
	if (!Joi.validate(product, schema).error) {
		const result = await add(product, userId);
		if (result === 1) {
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

router.post('/addBluk', async (req, res, next) => {
	const listOfProducts = req.body;
	if (!Joi.validate(listOfProducts, Joi.array().items(schema)).error) {
		listOfProducts = listOfProducts.map((product) => {
			delete product.id;
			return {
				...product,
				userId: res.locals.userId
			};
		});
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

router.post('/update', async (req, res, next) => {
	const product = req.body;
	const userId = res.locals.userId;
	if (!Joi.validate(product, schemaUpdate).error) {
		const result = await update(product, userId);
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

router.post('/affect', async (req, res, next) => {
	const infoAffect = req.body;
	if (!Joi.validate(infoAffect, schemaAffect).error) {
		const bossId = res.locals.userId;
		const result = await affect(bossId, infoAffect);
		if (result === 1) {
			res.sendStatus(200);
		} else {
			res.statusMessage = 'NotAffected';
			res.sendStatus(400);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

router.post('/getAll', async (req, res, next) => {
	const bossId = res.locals.userId;
	const result = await getAll(bossId);
	if (!result) {
		res.statusMessage = 'InternalError';
		res.sendStatus(500);
	} else {
		res.status(200).send(result);
	}
});

const schema = Joi.object().keys({
	name: Joi.string().required(),
	price: Joi.number().required(),
	weight: Joi.number(),
	size: Joi.number(),
	color: Joi.string(),
	category: Joi.string().required(),
	quantity: Joi.number()
});

const schemaUpdate = Joi.object().keys({
	id: Joi.number().required(),
	name: Joi.string(),
	price: Joi.number(),
	weight: Joi.number(),
	size: Joi.number(),
	color: Joi.string(),
	category: Joi.string(),
	quantity: Joi.number()
});

const schemaAffect = Joi.object().keys({
	affectedId: Joi.number().required(),
	productId: Joi.number().required(),
	quantity: Joi.number().required()
});

module.exports = router;
