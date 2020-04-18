module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define('product', {
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

    return Product;
};