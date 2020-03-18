const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const db = require('./models/index');


app.listen(3000, () => {
    console.log('Server Started !');

    

    db.sequelize.sync({ force: true })
        .then(() =>  {
            db.commande.create({});
        });


});
