const express = require('express');
const router = express.Router();
const { getProfil } = require('../../services/deliveryman/profil');

router.get('/', async (req, res, next) => {
	const userId = res.locals.userId;

	const result = await getProfil(userId);

	res.status(200).send(result);
});

module.exports = router;
