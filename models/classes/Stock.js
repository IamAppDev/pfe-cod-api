module.exports = (sequelize, DataTypes) => {

    const Stock = sequelize.define('stock', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return Stock;
};