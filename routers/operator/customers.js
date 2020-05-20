const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { getAll, add, addBulk, update, del } = require('../../services/operator/customers');
const { cities } = require('../../models/enums/cities');

router.get('/getAll/:offset?/:limit?', async (req, res, next) => {
	const userId = res.locals.userId;
	let { offset, limit } = req.params;
	const { orderBy, orderDirection, filters } = req.query;
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

	if (userId) {
		const customerList = await getAll(userId, offset, limit, orderBy, orderDirection, filters);
		res.status(200).send(customerList);
	} else {
		res.sendStatus(404);
	}
});

router.post('/add', async (req, res, next) => {
	const customer = req.body;
	const bossId = res.locals.userId;
	if (!Joi.validate(customer, schema).error) {
		customer.userId = res.locals.userId;
		const result = await add(customer, bossId);
		switch (result) {
			case 1:
				return res.sendStatus(200);
			case 2:
				res.statusMessage = 'Exist';
				return res.sendStatus(400);
			case 3:
				res.statusMessage = 'NotAdded';
				return res.sendStatus(400);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

router.post('/addBulk', async (req, res, next) => {
	let listOfCustomers = req.body;
	if (!Joi.validate(listOfCustomers, Joi.array().items(schema)).error) {
		listOfCustomers = listOfCustomers.map((customer) => {
			delete customer.id;
			return {
				...customer,
				userId: res.locals.userId
			};
		});
		const result = await addBulk(listOfCustomers);
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

router.post('/update', async (req, res, next) => {
	const customer = req.body;
	const bossId = res.locals.userId;
	if (!Joi.validate(customer, schemaUpdate).error) {
		customer.userId = res.locals.userId;
		const result = await update(customer, bossId);
		switch (result) {
			case 1:
				return res.sendStatus(200);
			case 2:
				res.statusMessage = 'NotUpdated';
				return res.sendStatus(400);
			case 3:
				res.statusMessage = 'Exist';
				return res.sendStatus(400);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

router.delete('/delete/:id', async (req, res, next) => {
	const customerId = req.params.id;
	if (!req.params.id) {
		res.statusMessage = 'NoIdProvided';
		return res.sendStatus(400);
	}
	const result = await del(customerId);
	switch (result) {
		case 1:
			return res.sendStatus(200);
		case 2:
			res.statusMessage = 'OrderExist';
			return res.sendStatus(400);
		case 3:
			res.statusMessage = 'NotDeleted';
			return res.sendStatus(400);
	}
});

const schema = Joi.object().keys({
	firstName: Joi.string().min(3).required(),
	lastName: Joi.string(),
	phone: Joi.string().required(),
	city: Joi.string().required(),
	address: Joi.string().required()
});

const schemaUpdate = Joi.object().keys({
	id: Joi.number().required(),
	firstName: Joi.string().min(3).required(),
	lastName: Joi.string().allow(null),
	phone: Joi.string(),
	city: Joi.string().required(),
	address: Joi.string().required()
});

module.exports = router;
