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
	stockProduct
} = require('./models/index');
const { Op } = require('sequelize');
const { states } = require('./models/enums/states');

(go = async () => {
	// const { bossId } = await user.findByPk(2, {
	// 	attributes: ['bossId'],
	// 	raw: true
	// });
	// console.log(bossId);
	// const customersAndSources = await user.findByPk(bossId, {
	// 	include: [
	// 		{
	// 			model: customer,
	// 			where: {
	// 				userId: bossId
	// 			}
	// 		},
	// 		{
	// 			model: source,
	// 			where: {
	// 				userId: bossId
	// 			}
	// 		}
	// 	]
	// 	// raw: true
	// });

	// --------------

	// const deliverymen = await user.findAll({
	// 	where: {
	// 		bossId: 1,
	// 		roleLibelle: 'ROLE_DELIVERYMAN'
	// 	},
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

	// const finalResult = [];

	// for (let dman of deliverymen) {
	// 	let total = 0;
	// 	for (let order of dman.orders) {
	// 		let indexOfLastElement = order.orderHistories.length - 1;
	// 		if (order.orderHistories[indexOfLastElement].orderState === 'shipped') {
	// 			total = total + 1;
	// 		}
	// 	}
	// 	finalResult.push({
	// 		id: dman.id,
	// 		firstName: dman.firstName,
	// 		lastName: dman.lastName,
	// 		city: dman.city,
	// 		totalCurrentOrders: total
	// 	});
	// }

	// console.log(finalResult);

	// ----------------

	const { bossId } = await user.findByPk(2, { attributes: ['bossId'] });
	const productsSourcesInstance = await user.findByPk(bossId, {
		include: [
			{
				model: source
			},
			{
				model: stock,
				include: [
					{
						model: product
					}
				]
			}
		]
	});

	const customersInstance = await customer.findAll({
		include: user,
		where: {
			[Op.or]: [
				{
					'$user.id$': bossId
				},
				{ '$user.bossId$': bossId }
			]
		}
	});

	let products = [];
	let sources = [];
	let customers = [];

	for (let product of productsSourcesInstance.stock.products) {
		products.push({
			id: product.id,
			name: product.name,
			price: product.price
		});
	}

	for (let source of productsSourcesInstance.sources) {
		sources.push({
			id: source.id,
			name: source.name,
			type: source.type
		});
	}

	for (let customer of customersInstance) {
		customers.push({
			id: customer.id,
			firstName: customer.firstName,
			lastName: customer.lastName,
			phone: customer.phone,
			city: customer.city,
			address: customer.address
		});
	}

	console.log(sources);

	return {
		products,
		customers,
		sources
	};

})();
