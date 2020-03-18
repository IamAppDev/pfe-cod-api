module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define('message', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        contenu: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Message;
};