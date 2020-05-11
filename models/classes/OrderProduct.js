module.exports = (sequelize, DataTypes, Order, Product) => {
	const OrderProduct = sequelize.define(
		'orderProduct',
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
			productId: {
				type: DataTypes.INTEGER,
				references: {
					model: Product,
					key: 'id'
				}
			},
			quantity: {
				type: DataTypes.INTEGER
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
