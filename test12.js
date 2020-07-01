const {
	source,
	customer,
	orderState,
	order,
	user,
	sequelize,
	stock,
	product,
	orderHistory,
	stockProduct,
	orderProduct,
	payment
} = require('./models/index');
const { Op, Model } = require('sequelize');
const { states } = require('./models/enums/states');
// const router = require('./routers/admin/orders');

(async () => {
	// let offset = 0;
	// let limit = 5;
	// let refOrderFilter = undefined;
	// let sourceNameFilter = undefined;
	// let paymentRefFilter = undefined;
	// let customerNameOrPhoneFilter = undefined;
	// let searchByThis = ''; // value received from front app
	// if (true) {
	// 	refOrderFilter = {
	// 		ref: { [Op.like]: `%%` }
	// 	};
	// 	sourceNameFilter = {
	// 		name: { [Op.like]: `%%` }
	// 	};
	// 	// paymentRefFilter = {
	// 	// 	ref: { [Op.like]: `%%` }
	// 	// };
	// 	customerNameOrPhoneFilter = {
	// 		[Op.or]: [
	// 			{ firstName: { [Op.like]: `%${searchByThis}%` } },
	// 			{ lastName: { [Op.like]: `%${searchByThis}%` } },
	// 			{ phone: { [Op.like]: `%${searchByThis}%` } }
	// 		]
	// 	};
	// }
	// const allOrders = await order.findAndCountAll({
	// 	distinct: true,
	// 	include: [
	// 		{
	// 			model: orderHistory,
	// 			include: [
	// 				{
	// 					model: user
	// 				}
	// 			]
	// 		},
	// 		{
	// 			model: customer,
	// 			where: customerNameOrPhoneFilter
	// 		},
	// 		{
	// 			model: payment,
	// 			where: paymentRefFilter
	// 		},
	// 		{
	// 			model: source,
	// 			where: sourceNameFilter
	// 		},
	// 		{
	// 			model: orderProduct,
	// 			include: [
	// 				{
	// 					model: product
	// 				}
	// 			]
	// 		}
	// 	],
	// 	offset,
	// 	limit
	// });
	// console.log(allOrders);

	let userId = 5;

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

	// const newOrders = await user.findByPk(4, {
	// 	include: [
	// 		{
	// 			model: order,
	// 			include: [
	// 				{
	// 					model: orderHistory
	// 				}
	// 			]
	// 		}
	// 	]
	// });

	// console.log(allOrders);

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

	console.log(count);
})();

// new - pending -  confirmed - canceled - shipped - delivered - returned
