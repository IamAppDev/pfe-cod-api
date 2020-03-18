module.exports = (sequelize, DataTypes) => {

    const Produit = sequelize.define('produit', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        libelle: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Produit;
};