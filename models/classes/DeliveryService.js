module.exports = (sequelize, DataTypes) => {

    const DeliveryService = sequelize.define('deliveryService', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });
    
    return DeliveryService;
};