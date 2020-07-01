const express = require('express');
const router = express.Router();
const { getAll, updateOrder, getDelivered, getCustomAll, setPayment } = require('../../services/deliveryman/orders');

router.get('/shipped', async (req, res, next) => {
	const userId = res.locals.userId;
	const result = await getAll(userId);
	res.status(200).send(result);
});

router.get('/delivered', async (req, res, next) => {
	const userId = res.locals.userId;
	const result = await getDelivered(userId);
	res.status(200).send(result);
});

router.get('/customAll/:orderState', async (req, res, next) => {
	const userId = res.locals.userId;
	const orderState = req.params.orderState;
	const result = await getCustomAll(userId, orderState);
	res.status(200).send(result);
});

router.post('/update', async (req, res, next) => {
	const userId = res.locals.userId;
	const data = req.body;
	data.userId = userId;
	console.log(data);
	const result = await updateOrder(data);
	if (result === 1) {
		return res.sendStatus(200);
	} else {
		return res.sendStatus(400);
	}
});

router.post('/setPayment', async (req, res, next) => {
	const userId = res.locals.userId;
	const data = req.body;
	data.userId = userId;
	const result = await setPayment(data);
	if (result === 1) {
		res.sendStatus(200);
	} else {
		res.sendStatus(400);
	}
});

module.exports = router;
