const { villes } = require('../enums/villes');

module.exports = (sequelize, DataTypes, Role) => {

    const User = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
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
        password: {
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

    return User;
};