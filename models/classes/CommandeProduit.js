module.exports = (sequelize, DataTypes, Commande, Produit) => {

    const CommandeProduit = sequelize.define('commandeProduit', {
        commandeId: {
            type: DataTypes.INTEGER,
            references: {
                model: Commande,
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
        reduction: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true
    });

    return CommandeProduit;
};