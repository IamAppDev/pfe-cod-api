const {
	user,
	customer,
	order,
	source,
	stock,
	product,
	orderProduct,
	orderHistory,
	sequelize
} = require('../../models/index');
const { Op } = require('sequelize');

const getOrderStates = async (userId) => {
	const allOrders = await order.findAll({
		include: [
			{
				model: user,
				where: {
					id: userId
				}
			},
			{
				model: orderHistory,
				include: [
					{
						model: user
					}
				]
			}
		]
	});

	let count = {
		new: 0,
		pending: 0,
		confirmed: 0,
		canceled: 0,
		shipped: 0,
		delivered: 0,
		returned: 0
	};

	for (let order of allOrders) {
		let lastState = order.orderHistories[order.orderHistories.length - 1].orderState;
		switch (lastState) {
			case 'new':
				count.new++;
				break;
			case 'pending':
				count.pending++;
				break;
			case 'confirmed':
				count.confirmed++;
				break;
			case 'canceled':
				count.canceled++;
				break;
			case 'shipped':
				count.shipped++;
				break;
			case 'delivered':
				count.delivered++;
				break;
			case 'returned':
				count.returned++;
				break;
		}
	}

	return count;
};

module.exports.getOrderStates = getOrderStates;
