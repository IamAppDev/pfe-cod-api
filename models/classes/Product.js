const { categories } = require('../enums/categories');

module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		'product',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				unique: true
			},
			price: {
				type: DataTypes.FLOAT
			},
			weight: {
				type: DataTypes.FLOAT
			},
			size: {
				type: DataTypes.STRING
			},
			color: {
				type: DataTypes.STRING
			},
			category: {
				type: DataTypes.ENUM,
				values: categories,
				allowNull: false
			}
		},
		{
			freezeTableName: true
		}
	);

	return Product;
};
