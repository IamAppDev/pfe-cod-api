module.exports = (sequelize, DataTypes) => {
	const Order = sequelize.define(
		'order',
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4
			},
			tracking: {
				type: DataTypes.STRING
			}
		},
		{
			freezeTableName: true
		}
	);

	return Order;
};
