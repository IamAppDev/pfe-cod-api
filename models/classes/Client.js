const {villes} = require('../enums/villes');

module.exports = (sequelize, DataTypes) => {

    const Client = sequelize.define('client', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING,
        },
        prenom: {
            type: DataTypes.STRING,
        },
        adresse: {
            type: DataTypes.STRING,
        },
        telephone: {
            type: DataTypes.STRING,
        },
        ville: {
            type: DataTypes.ENUM,
            values: villes
        },
        dateAjout: {
            type: DataTypes.DATE
        },
    }, {
        freezeTableName: true
    });

    return Client;
};