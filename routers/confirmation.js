const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { utilisateur } = require('../models/index');



router.post('/', async (req, res, next) => {

    const token = req.body.token;
    let result = null;
    try {
        const { email } = jwt.verify(token, config.get('jwtEmailPrivateKey'));
        result = await utilisateur.update({ confirme: true, active: true }, { where: { email } });
    } catch (ex) {
        return res.sendStatus(404);
    } finally {
        return result[0] ? res.sendStatus(200) : res.sendStatus(404);
    }

});

module.exports = router;