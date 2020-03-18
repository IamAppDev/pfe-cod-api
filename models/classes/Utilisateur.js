const {villes} = require('../enums/villes');

module.exports = (sequelize, DataTypes) => {

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
        prenom:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING,
            validate : {
                isEmail: true
            }
        },
        ville:{
            type: DataTypes.ENUM,
            values: villes
        },
        telephone:{
            type: DataTypes.STRING
        },
        cin:{
            type: DataTypes.STRING
        },
        accessToken:{
            type: DataTypes.STRING
        },
        notifToken:{
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Utilisateur;
};