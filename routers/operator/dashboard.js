const express = require('express');
const router = express.Router();
const { getOrderStates } = require('../../services/operator/dashboard');

router.get('/orderStates', async (req, res, next) => {
	const userId = res.locals.userId;
	const result = await getOrderStates(userId);
	res.status(200).send(result);
});

module.exports = router;
