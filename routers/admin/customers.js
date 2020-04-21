const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { add, addBulk, update } = require('../../services/admin/customers');
const { cities } = require('../../models/enums/cities');

router.post('/add', async (req, res, next) => {
	const customer = req.body;
	if (!Joi.validate(customer, schema).error) {
		customer.userId = res.locals.userId;
		delete customer.id;
		const result = await add(customer);
		if (result === 1) {
			res.sendStatus(200);
		} else {
			res.statusMessage = 'NotAdded';
			res.sendStatus(400);
		}
	} else {
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
		res.sendStatus(400);
	}
});

router.post('/update', async (req, res, next) => {
	const customer = req.body;
	if (!Joi.validate(customer, schemaUpdate).error) {
		customer.userId = res.locals.userId;
		const result = await update(customer);
		if (result === 1) {
			res.sendStatus(200);
		} else {
			res.statusMessage = 'NotUpdated';
			res.sendStatus(400);
		}
	} else {
		res.sendStatus(400);
	}
});

const schema = Joi.object().keys({
	firstName: Joi.string().min(3).required(),
	lastName: Joi.string(),
	phone: Joi.string().required(),
	city: Joi.string().valid(cities).required(),
	address: Joi.string().required()
});

const schemaUpdate = Joi.object().keys({
	id: Joi.number().required(),
	firstName: Joi.string().min(3).required(),
	lastName: Joi.string(),
	phone: Joi.string().required(),
	city: Joi.string().valid(cities).required(),
	address: Joi.string().required()
});

module.exports = router;
