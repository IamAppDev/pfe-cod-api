const { cities } = require('../enums/cities');

module.exports = (sequelize, DataTypes) => {
	const Customer = sequelize.define(
		'customer',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			firstName: {
				type: DataTypes.STRING
			},
			lastName: {
				type: DataTypes.STRING
			},
			address: {
				type: DataTypes.STRING
			},
			phone: {
				type: DataTypes.STRING
			},
			city: {
				type: DataTypes.ENUM,
				values: cities
			}
		},
		{
			freezeTableName: true
		}
	);

	return Customer;
};
