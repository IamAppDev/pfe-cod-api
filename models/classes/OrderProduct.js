module.exports = (sequelize, DataTypes, Order, Product) => {
	const OrderProduct = sequelize.define(
		'orderProduct',
		{
			orderId: {
				type: DataTypes.INTEGER,
				references: {
					model: Order,
					key: 'id'
				}
			},
			productId: {
				type: DataTypes.INTEGER,
				references: {
					model: Product,
					key: 'id'
				}
			},
			discount: {
				type: DataTypes.INTEGER
			}
		},
		{
			freezeTableName: true
		}
	);

	return OrderProduct;
};
