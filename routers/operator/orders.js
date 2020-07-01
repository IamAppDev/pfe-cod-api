const express = require('express');
const router = express.Router();
const {
	add,
	addWithCustomer,
	update,
	getAll,
	getCPS,
	getDm,
	archive,
	updateTracking,
	trackOrder
} = require('../../services/operator/orders');
const Joi = require('joi');

router.get('/track', async (req, res, next) => {
	const tracking = req.body;
	const result = await trackOrder(tracking);
	res.send(result);
});

router.post('/add', async (req, res, next) => {
	const userId = res.locals.userId;
	const order = req.body;
	if (!Joi.validate(order, schemaAdd).error) {
		const result = await add(order, userId);
		if (result === 1) {
			return res.sendStatus(200);
		} else {
			res.statusMessage = 'NotAdded';
			return res.sendStatus(400);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

router.post('/addWithCustomer', async (req, res, next) => {
	const userId = res.locals.userId;
	const order = req.body;
	console.log(Joi.validate(order, schemaAddWithCustomer).error);
	if (!Joi.validate(order, schemaAddWithCustomer).error) {
		const result = await addWithCustomer(order, userId);
		if (result === 1) {
			return res.sendStatus(200);
		} else if (result === 2) {
			res.statusMessage = 'Exist';
			return res.sendStatus(400);
		} else {
			res.statusMessage = 'NotAdded';
			return res.sendStatus(400);
		}
	} else {
		res.statusMessage = 'DataNotValidated';
		res.sendStatus(400);
	}
});

router.post('/update', async (req, res, next) => {
	const orderToUpdate = req.body;
	const userId = res.locals.userId;
	if (!Joi.validate(orderToUpdate, schemaUpdate).error) {
		const result = await update(orderToUpdate, userId);
		if (result === 1) {
			return res.sendStatus(200);
		} else {
			res.statusCode = 'NotUpdated';
			return res.sendStatus(400);
		}
	} else {
		res.statusCode = 'DataNotValidated';
		return res.sendStatus(400);
	}
});

router.post('/updateTracking', async (req, res, next) => {
	const { orderId, tracking } = req.body;
	const result = await updateTracking(orderId, tracking);
	if (result === 1) {
		return res.sendStatus(200);
	} else {
		res.statusMessage = 'NotUpdated';
		return res.sendStatus(400);
	}
});

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
		const orderList = await getAll(userId, offset, limit, orderBy, orderDirection, filters);
		res.status(200).send(orderList);
	} else {
		res.sendStatus(404);
	}
});

router.get('/getCPS', async (req, res, next) => {
	const userId = res.locals.userId;
	const result = await getCPS(userId);
	return res.status(200).send(result);
});

router.get('/getDm', async (req, res, next) => {
	const userId = res.locals.userId;
	const result = await getDm(userId);
	res.status(200).send(result);
});

router.post('/archive', async (req, res, next) => {
	const orderId = req.body;
	const result = await archive(orderId);
	if (result === 1) {
		return res.sendStatus(200);
	} else {
		res.statusMessage = 'NotArchived';
		return res.sendStatus(400);
	}
});

const schemaAdd = Joi.object().keys({
	customerId: Joi.number().required(),
	sourceId: Joi.number().required(),
	tracking: Joi.string().allow(''),
	description: Joi.string().allow(''),
	products: Joi.array().items(
		Joi.object().keys({
			productId: Joi.number().required(),
			quantity: Joi.number().required(),
			discount: Joi.number().required()
		})
	)
});

const schemaAddWithCustomer = Joi.object().keys({
	customer: Joi.object().keys({
		firstName: Joi.string().required(),
		lastName: Joi.string().allow(''),
		phone: Joi.string().required(),
		city: Joi.string().required(),
		address: Joi.string().required()
	}),
	sourceId: Joi.number().required(),
	tracking: Joi.string().allow(''),
	description: Joi.string().allow(''),
	products: Joi.array().items(
		Joi.object().keys({
			productId: Joi.number().required(),
			quantity: Joi.number().required(),
			discount: Joi.number().required()
		})
	)
});

const schemaUpdate = Joi.object().keys({
	orderId: Joi.string().required(),
	orderState: Joi.string().allow(''),
	description: Joi.string().allow(''),
	deliverymanId: Joi.number()
});

// produit *
// client
// source
// tracking OR delviery man

module.exports = router;
