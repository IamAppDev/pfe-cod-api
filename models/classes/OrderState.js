const {states} = require('../enums/states');

module.exports = (sequelize, DataTypes) => {

    const OrderState = sequelize.define(
			'orderState',
			{
				id: {
					type: DataTypes.INTEGER,
					autoIncrement: true,
					primaryKey: true,
					allowNull: false
				},
				type: {
					type: DataTypes.ENUM,
					values: states
				}
			},
			{
				freezeTableName: true
			}
		);

    return OrderState;
};