const express = require('express');
const router = express.Router();
const { getAll } = require('../../services/admin/dashboard');

router.get('/', async (req, res, next) => {
	const bossId = res.locals.userId;
	const result = await getAll(bossId);
	res.status(200).send(result);
});

module.exports = router;
