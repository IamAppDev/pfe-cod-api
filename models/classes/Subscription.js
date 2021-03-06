module.exports = (sequelize, DataTypes) => {

    const Subscription = sequelize.define('subscription', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        dateDebut: {
            type: DataTypes.STRING,
            validate: {
                isDate: true
            }
        },
        dateFin: {
            type: DataTypes.STRING,
            validate: {
                isDate: true,
                isOrderCorrect(value) {
                    if (this.dateDebut > value) {
                        throw new Error('Date order is incorrect !');
                    } 
                }
            }
        }
    }, {
        freezeTableName: true
    });

    return Subscription;
};