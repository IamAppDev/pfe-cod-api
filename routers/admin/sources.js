const express = require('express');
const router = express.Router();
const { getAll, add, update, del } = require('../../services/admin/sources');
const Joi = require('joi');

router.get('/getAll/:offset?/:limit?', async (req, res, next) => {
	const bossId = res.locals.userId;
	let { offset, limit } = req.params;
	// console.log('body ==>',req.query);
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
	if (bossId) {
		const sourceList = await getAll(bossId, offset, limit, orderBy, orderDirection, filters);
		res.status(200).send(sourceList);
	} else {
		res.sendStatus(404);
	}
});

router.post('/add', async (req, res, next) => {
	const src = req.body;
	const bossId = res.locals.userId;
	if (!Joi.validate(src, schema).error) {
		const result = await add(src, bossId);
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

router.post('/update', async (req, res, next) => {
	const src = req.body;
	const bossId = res.locals.userId;
	if (!Joi.validate(src, schemaUpdate).error) {
		const result = await update(src, bossId);
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

router.delete('/delete/:id', async (req, res, next) => {
	const srcId = req.params.id;
	if (!req.params.id) {
		res.statusMessage = 'NoIdProvided';
		return res.sendStatus(400);
	}
	const result = await del(srcId);
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
	name: Joi.string().required(),
	type: Joi.string().required()
});

const schemaUpdate = Joi.object().keys({
	id: Joi.number().required(),
	name: Joi.string().required(),
	type: Joi.string().required()
});

module.exports = router;
