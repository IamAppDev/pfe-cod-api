const { sources } = require('../enums/sources');

module.exports = (sequelize, DataTypes) => {
	const Source = sequelize.define(
		'source',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING
			},
			type: {
				type: DataTypes.STRING
			}
		},
		{
			freezeTableName: true
		}
	);

	return Source;
};
