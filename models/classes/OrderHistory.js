module.exports = (sequelize, DataTypes, Order, OrderState, User) => {
	const OrderHistory = sequelize.define(
		'orderHistory',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			orderId: {
				type: DataTypes.INTEGER,
				references: {
					model: Order,
					key: 'id'
				}
			},
			orderState: {
				type: DataTypes.STRING
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
