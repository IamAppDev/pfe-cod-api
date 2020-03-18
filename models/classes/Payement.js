module.exports = (sequelize, DataTypes) => {

    const Payement = sequelize.define('payement', {
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

    return Payement;
};