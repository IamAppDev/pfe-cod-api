module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define('message', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Message;
};