const {
	source,
	customer,
	orderState,
	order,
	user,
	sequelize,
	stock,
	product,
	orderProduct,
	orderHistory,
	stockProduct
} = require('./models/index');
const { Op } = require('sequelize');
const { states } = require('./models/enums/states');

(go = async () => {
	const userId = 5;
	const { bossId } = await user.findByPk(userId);

	const customerList = await customer.findAll({
		include: [
			{
				model: user,
				where: {
					[Op.or]: [
						{
							id: bossId
						},
						{
							bossId
						}
					]
				}
			}
		],
		include: [
			{
				model: order,
				include: [
					{
						model: orderHistory,
						where: {
							orderState: 'new',
							userId
						}
					},
					{
						model: orderProduct,
						include: [
							{
								model: product
							}
						]
					}
				]
			}
		]
	});

	console.log(customerList[0]);
	// console.log(customerList.rows[1].orders[0].orderHistories[0]);
	// console.log(customerList.rows[1].orders[0].orderProducts[0].product);
})();
