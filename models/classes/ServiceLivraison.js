module.exports = (sequelize, DataTypes) => {

    const ServiceLivraison = sequelize.define('serviceLivraison', {
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
    
    return ServiceLivraison;
};