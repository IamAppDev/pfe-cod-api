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
	orderProduct
} = require('./models/index');
const { Op } = require('sequelize');
const { states } = require('./models/enums/states');

(async () => {
	// transaction

	const transaction = await sequelize.transaction();
	try {
		// const obj = {
		// 	orderId,
		// 	orderState,
		// 	userId: 3,
		// 	description,
		// 	products: [
		// 		{
		// 			id,
		// 			quantity
		// 		},
		// 		{
		// 			id,
		// 			quantity
		// 		}
		// 	]
		// };

		let products = [
			{
				id: 1,
				quantity: 5
			},
			{
				id: 2,
				quantity: 10
			}
		];

		// await orderHistory.create(
		// 	{
		// 		orderId: obj.orderId,
		// 		orderState: obj.orderState,
		// 		userId: obj.userId,
		// 		description: obj.description
		// 	},
		// 	{
		// 		transaction
		// 	}
		// );

		const deliveryman = await user.findByPk(3, {
			include: [
				{
					model: stock,
					include: {
						model: product
					}
				}
			]
		});

		let dbProducts = deliveryman.stock.products;
		let allGood = true;

		for (let product of products) {
			let current = dbProducts.filter((dbP) => dbP.id === product.id);
			console.log(current);
			if (!current.length) {
				allGood = false;
				console.log('1');
			} else {
				if (current[0].stockProduct.quantity >= product.quantity) {
					current[0].stockProduct.quantity -= product.quantity;
					await current[0].stockProduct.save({ transaction });
				} else {
					allGood = false;
					console.log('2');
				}
			}
		}

		if (!allGood) {
			throw '';
		}
		await transaction.commit();
	} catch (err) {
		await transaction.rollback();
	}
})();

// (async () => {
// 	const result = await order
// 		.findAll({
// 			include: [
// 				{
// 					model: orderHistory,
// 					where: {
// 						userId: 3
// 					}
// 				},
// 				{
// 					model: orderProduct,
// 					include: {
// 						model: product
// 					}
// 				},
// 				{
// 					model: customer
// 				}
// 			]
// 		})
// 		.then((res) => {
// 			return res.filter((order) => order.orderHistories[order.orderHistories.length - 1].orderState === 'shipped');
// 		});

// })();
