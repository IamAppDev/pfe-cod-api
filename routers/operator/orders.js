const express = require('express');
const router = express.Router();
const { add, update, getAll, getCPS, getDm } = require('../../services/operator/orders');
const Joi = require('joi');

router.post('add', async (req, res, next) => {
	const userId = res.locals.userId;
	const order = req.body;
	if (!Joi.validate(order, schemaAdd).error) {
		// const result = await 
	} else {
		res.statusMessage = 'dataNotValidated';
		res.sendStatus(400);
	}
});

router.post('update', async (req, res, next) => {});

router.get('getAll/:offset?/:limit?', async (req, res, next) => {});

router.get('getCPS', async (req, res, next) => {
	const userId = res.locals.userId;
	const result = await getCPS(userId);
	res.statusCode(200).send(result);
});

router.get('getDm', async (req, res, next) => {
	const userId = res.locals.userId;
	const result = await getDm(userId);
	res.statusCode(200).send(result);
});

const schemaAdd = Joi.object().keys({
	customerId: Joi.number().required(),
	sourceId: Joi.number().required(),
	tracking: Joi.string(),
	products: Joi.array().items(
		Joi.object().keys({
			productId: Joi.number().required(),
			quantity: Joi.number().required(),
			discount: Joi.number().required()
		})
	)
});

// produit *
// client
// source
// tracking OR delviery man

module.exports = router;
