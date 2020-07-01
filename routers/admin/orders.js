const express = require('express');
const router = express.Router();
const { getAll } = require('../../services/admin/orders');

router.get('/', async (req, res, next) => {
	const filters = req.query;
	console.log(filters);
	const result = await getAll(filters);
	res.status(200).send(result);
});

module.exports = router;
