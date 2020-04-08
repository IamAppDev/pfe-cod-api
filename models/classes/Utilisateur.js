const { villes } = require('../enums/villes');

module.exports = (sequelize, DataTypes, Role) => {

    const Utilisateur = sequelize.define('utilisateur', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING
        },
        prenom: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        motdepasse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ville: {
            type: DataTypes.ENUM,
            values: villes
        },
        telephone: {
            type: DataTypes.STRING
        },
        cin: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        confirme: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        tarif: {
            type: DataTypes.INTEGER
        },
        refreshToken: {
            type: DataTypes.STRING
        },
        notifToken: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Utilisateur;
};