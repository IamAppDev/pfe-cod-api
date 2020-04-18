module.exports = (sequelize, DataTypes) => {

    const Payment = sequelize.define('payment', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        ref: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Payment;
};