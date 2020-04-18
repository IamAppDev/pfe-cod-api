module.exports = (sequelize, DataTypes, Order, OrderState, User) => {
	const OrderHistory = sequelize.define(
		'orderHistory',
		{
			orderId: {
				type: DataTypes.INTEGER,
				references: {
					model: Order,
					key: 'id'
				}
			},
			orderStateId: {
				type: DataTypes.INTEGER,
				references: {
					model: OrderState,
					key: 'id'
				}
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: User,
					key: 'id'
				}
			}
		},
		{
			freezeTableName: true
		}
	);

	return OrderHistory;
};
