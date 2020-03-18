const {etats} = require('../enums/etats');

module.exports = (sequelize, DataTypes) => {

    const EtatCommande = sequelize.define('', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM,
            values: etats
        }
    }, {
        freezeTableName: true
    });

    return EtatCommande;
};