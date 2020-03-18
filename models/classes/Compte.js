module.exports = (sequelize, DataTypes) => {

    const Compte = sequelize.define('compte', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        ndc: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Compte;
};