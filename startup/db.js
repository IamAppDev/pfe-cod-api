const winston = require('winston');
const db = require('../models/index');


module.exports = async () => {

    await db.sequelize.authenticate().then(() => {
        winston.info('Connected to db .. ');
        return db.sequelize.sync(/*{ force: true }*/);
    })
    .then(() => {
        winston.info('Tables created .. ');
    });

};