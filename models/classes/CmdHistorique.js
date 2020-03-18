module.exports = (sequelize, DataTypes, Commande, EtatCommande, Utilisateur) => {

    const CmdHistorique = sequelize.define('cmdHistorique', {
        commandeId: {
            type: DataTypes.INTEGER,
            references: {
                model: Commande,
                key: 'id'
            }
        },
        etatCommandeId: {
            type: DataTypes.INTEGER,
            references: {
                model: EtatCommande,
                key: 'id'
            }
        },
        utilisateurId: {
            type: DataTypes.INTEGER,
            references: {
                model: Utilisateur,
                key: 'id'
            }
        }
    }, {
        freezeTableName: true
    });
    
    return CmdHistorique;
};