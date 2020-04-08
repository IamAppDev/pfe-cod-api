const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const { utilisateur } = require('../models/index');



router.get('/', (req, res, next) => {

    const {oldAccessToken, refreshToken} = req.body;
    
    res.status(200).send('new token');

    // const token = req.params.token;
    // try {
    //     const { id } = jwt.verify(token, config.get('jwtEmailPrivateKey'));
    //     utilisateur.update({ confirme: true, active: true }, { where: { id } });
    // } catch (ex) {
    //     return res.send(404);
    // }
    // res.status(200).redirect('http://localhost:3001/login');
});

module.exports = router;