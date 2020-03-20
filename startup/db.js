const db = require('../models/index');


module.exports = async (logger) => {

    await db.sequelize.authenticate().then(() => {
        logger.info('Connected to db .. ');
        return db.sequelize.sync(/*{ force: true }*/);
    })
    .then(() => {
        logger.info('Tables created .. ');
    });

};