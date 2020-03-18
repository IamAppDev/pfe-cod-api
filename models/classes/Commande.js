module.exports = (sequelize, DataTypes) => {

    const Commande = sequelize.define('commande', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });

    return Commande;
};