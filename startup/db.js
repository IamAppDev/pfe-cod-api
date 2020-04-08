const db = require('../models/index');
const {roles} = require('../models/enums/roles');


module.exports = async (logger) => {

    await db.sequelize.authenticate().then(() => {
        logger.info('Connected to db .. ');
        return db.sequelize.sync({ force: true });
    })
    .then(() => {
        logger.info('Tables created .. ');
        // creation des roles
        db.role.bulkCreate([
            {libelle: roles[0]},
            {libelle: roles[1]},
            {libelle: roles[2]},
            {libelle: roles[3]}
        ]).then().catch(err => console.log(err));
    });

};