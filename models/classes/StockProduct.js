module.exports = (sequelize, DataTypes, Stock, Product) => {
	const StockProduct = sequelize.define(
		'stockProduct',
		{
			stockId: {
				type: DataTypes.INTEGER,
				references: {
					model: Stock,
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
			}
		},
		{
			freezeTableName: true
		}
	);

	return StockProduct;
};
