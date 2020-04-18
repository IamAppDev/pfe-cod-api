module.exports = (sequelize, DataTypes) => {

    const Order = sequelize.define('commande', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return Order;
};