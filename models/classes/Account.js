module.exports = (sequelize, DataTypes) => {

    const Account = sequelize.define('account', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Account;
};