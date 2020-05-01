const express = require('express');
const router = express.Router();
const { add, addBulk, update, affect, getAll, del } = require('../../services/admin/products');
const Joi = require('Joi');

router.post('/add', async (req, res, next) => {
	const product = req.body;
	const userId = res.locals.userId;
	if (!Joi.validate(product, schema).error) {
		const result = await add(product, userId);
		switch (result) {
			case 1:
				return res.sendStatus(200);
			case 2:
				res.statusMessage = 'Exist';
				return res.sendStatus(400);
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
		switch (result) {
			case 1:
				return res.sendStatus(200);
			case 2:
				res.statusMessage = 'Exist';
				return res.sendStatus(400);
			case 3:
				res.statusMessage = 'NotUpdated';
				return res.sendStatus(400);
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
	const result = await getAll(bossId, offset, limit);
	if (!result) {
		res.statusMessage = 'InternalError';
		res.sendStatus(500);
	} else {
		res.status(200).send(result);
	}
});

router.delete('/delete/:id', async (req, res, next) => {
	const productId = req.params.id;
	if (!productId) {
		res.statusMessage = 'NoIdProvided';
		return res.sendStatus(400);
	}
	const result = await del(productId);
	switch (result) {
		case 1:
			return res.sendStatus(200);
		case 2:
			res.statusMessage = 'Exist';
			return res.sendStatus(400);
			case 3:
				res.statusMessage = 'NotDeleted';
				return res.sendStatus(400);
			
	}
});

const schema = Joi.object().keys({
	name: Joi.string().required(),
	price: Joi.number().required(),
	quantity: Joi.number().required(),
	size: Joi.string().allow(null),
	weight: Joi.number().allow(null),
	color: Joi.string().allow(null),
	category: Joi.string().allow(null)
});

const schemaUpdate = Joi.object().keys({
	id: Joi.number().required(),
	name: Joi.string().required(),
	price: Joi.number().required(),
	quantity: Joi.number().required(),
	size: Joi.string().allow(null),
	weight: Joi.number().allow(null),
	color: Joi.string().allow(null),
	category: Joi.string().allow(null)
});

const schemaAffect = Joi.object().keys({
	affectedId: Joi.number().required(),
	productId: Joi.number().required(),
	quantity: Joi.number().required()
});

module.exports = router;
