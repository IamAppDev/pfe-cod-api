const {sources} = require('../enums/sources');

module.exports = (sequelize, DataTypes) => {

    const Source = sequelize.define('source', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        libelle: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.ENUM,
            values: sources
        }
    }, {
        freezeTableName: true
    });

    return Source;
};