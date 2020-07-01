const express = require('express');
const router = express.Router();
const { getAll } = require('../../services/deliveryman/stock');

router.get('/', async (req, res, next) => {
	const userId = res.locals.userId;
	const result = await getAll(userId);
	res.status(200).send(result);
});

module.exports = router;
