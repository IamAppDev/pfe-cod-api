const { cities } = require('../enums/cities');

module.exports = (sequelize, DataTypes, Role) => {
	const User = sequelize.define(
		'user',
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
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true
				}
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			city: {
				type: DataTypes.STRING
			},
			phone: {
				type: DataTypes.STRING
			},
			idCard: {
				type: DataTypes.STRING
			},
			active: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			confirmed: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			},
			price: {
				type: DataTypes.INTEGER
			},
			refreshToken: {
				type: DataTypes.STRING
			},
			notifToken: {
				type: DataTypes.STRING
			}
		},
		{
			freezeTableName: true
		}
	);

	return User;
};
