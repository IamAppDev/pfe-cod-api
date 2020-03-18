const {roles} = require('../enums/roles');

module.exports = (sequelize, DataTypes) => {
  
    const Role = sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }, 
        libelle: {
            type: DataTypes.ENUM,
            values: roles
        }
    }, {
        freezeTableName: true
    });

    return Role;
};