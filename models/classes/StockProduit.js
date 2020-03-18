

module.exports = (sequelize, DataTypes, Stock, Produit) => {

    const StockProduit = sequelize.define('stockProduit', {
        stockId: {
            type: DataTypes.INTEGER,
            references: {
                model: Stock,
                key: 'id'
            }
        },
        produitId: {
            type: DataTypes.INTEGER,
            references: {
                model: Produit,
                key: 'id'
            }
        },
        quantite: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true
    });

    return StockProduit;    
};