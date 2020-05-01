const { customer, order, user, sequelize, stock, product } = require('./models/index');
const { Op } = require('sequelize');

(go = async () => {
	const bossId = 1;

	const products = await product.findAll({
		include: [
			{
				model: stock,
				include: [
					{
						model: user
					}
				]
			}
		],
		where: {
			[Op.or]: [
				{
					'$stocks.user.id$': bossId
				},
				{ '$stocks.user.bossId$': bossId }
			]
		}
	});

	let allproducts = [];

	for (let product of products) {
		let stocks = [];
		let quantity = 0;
		for (let stock of product.stocks) {
			if (stock.user.bossId) {
				stocks.push({
					quantity: stock.stockProduct.quantity,
					user: {
						id: stock.user.id,
						firstName: stock.user.firstName,
						lastName: stock.user.lastName,
						city: stock.user.city
					}
				});
			} else {
				quantity = stock.stockProduct.quantity;
			}
		}

		allproducts.push({
			id: product.id,
			name: product.name,
			price: product.price,
			size: product.size,
			color: product.color,
			weight: product.weight,
			category: product.category,
			quantity,
			stocks
		});
	}

	console.log(allproducts);
})();

// (go = async () => {
// 	const bossId = 1;
// 	try {
// 		const userList = await user.findAll({
// 			where: {
// 				[Op.or]: [
// 					{
// 						bossId,
// 						roleLibelle: 'ROLE_DELIVERYMAN'
// 					},
// 					{ id: bossId }
// 				]
// 			},
// 			include: [
// 				{
// 					model: stock,
// 					raw: true,
// 					include: {
// 						model: product,
// 						raw: true
// 					}
// 				}
// 			],
// 			raw: true
// 		});

// 		let productList = userList
// 			.filter((user) => !user.bossId)
// 			.map((user) => {
// 				if (user['stock.products.id']) {
// 					return {
// 						id: user['stock.products.id'],
// 						name: user['stock.products.name'],
// 						price: user['stock.products.price'],
// 						weight: user['stock.products.weight'],
// 						size: user['stock.products.size'],
// 						color: user['stock.products.color'],
// 						quantity: user['stock.products.stockProduct.quantity'],
// 						category: user['stock.products.category'],
// 						createdAt: user['stock.products.createdAt']
// 					};
// 				}
// 			});

// 		// console.log(productList.length === 1);
// 		if (productList.length === 1 && !productList.length[0]) {
// 			productList = [];
// 		}

// 		let cpt = -1;
// 		const usersStock = [];
// 		userList.forEach((user) => {
// 			if (cpt !== user.id) {
// 				usersStock.push({
// 					id: user.id,
// 					firstName: user.firstName,
// 					lastName: user.lastName,
// 					city: user.city,
// 					productList: user['stock.products.id']
// 						? [
// 								{
// 									id: user['stock.products.id'],
// 									name: user['stock.products.name'],
// 									quantity: user['stock.products.stockProduct.quantity']
// 								}
// 						  ]
// 						: []
// 				});
// 			} else {
// 				usersStock[usersStock.length - 1].productList.push(
// 					user['stock.products.id']
// 						? {
// 								id: user['stock.products.id'],
// 								name: user['stock.products.name'],
// 								quantity: user['stock.products.stockProduct.quantity']
// 						  }
// 						: null
// 				);
// 			}
// 			cpt = user.id;
// 		});

// 		const result = [productList, usersStock];
// 		console.log(result);
// 		return result;
// 	} catch (err) {
// 		return null;
// 	}
// })();

// (go = async () => {
// 	const bossId = 1;
// 	try {
// 		const userList = await user.findAll({
// 			where: {
// 				[Op.or]: [
// 					{
// 						bossId,
// 						roleLibelle: 'ROLE_DELIVERYMAN'
// 					},
// 					{ id: bossId }
// 				]
// 			},
// 			include: [
// 				{
// 					model: stock,
// 					raw: true,
// 					include: {
// 						model: product,
// 						raw: true
// 					}
// 				}
// 			],
// 			raw: true
// 		});

// 		// console.log(userList);

// 		let productList = userList
// 			.filter((user) => !user.bossId)
// 			.map((user) => {
// 				console.log(user);
// 				if (user['stock.products.id']) {
// 					// console.log(user['stock.products.id']);
// 					// console.log(user);
// 					console.log(user['stock.products.id']);
// 					return {
// 						id: user['stock.products.id'],
// 						name: user['stock.products.name'],
// 						price: user['stock.products.price'],
// 						weight: user['stock.products.weight'],
// 						size: user['stock.products.size'],
// 						color: user['stock.products.color'],
// 						quantity: user['stock.products.stockProduct.quantity'],
// 						category: user['stock.products.category'],
// 						createdAt: user['stock.products.createdAt']
// 					};
// 				}
// 			});

// 		if (!productList.length[0]) {
// 			productList = [];
// 		}

// 		let cpt = -1;
// 		const usersStock = [];
// 		userList.forEach((user) => {
// 			if (cpt !== user.id) {
// 				usersStock.push({
// 					id: user.id,
// 					firstName: user.firstName,
// 					lastName: user.lastName,
// 					city: user.city,
// 					productList: user['stock.products.id']
// 						? [
// 								{
// 									id: user['stock.products.id'],
// 									name: user['stock.products.name'],
// 									quantity: user['stock.products.stockProduct.quantity']
// 								}
// 						  ]
// 						: []
// 				});
// 			} else {
// 				usersStock[usersStock.length - 1].productList.push(
// 					user['stock.products.id']
// 						? {
// 								id: user['stock.products.id'],
// 								name: user['stock.products.name'],
// 								quantity: user['stock.products.stockProduct.quantity']
// 						  }
// 						: null
// 				);
// 			}
// 			cpt = user.id;
// 		});

// 		const result = [productList, usersStock];
// 		console.log(result);
// 	} catch (err) {
// 		console.log(err);
// 	}
// })();

// (go = async () => {
// 	const phone = '0655336666';
// 	const customerObj = await customer.findOne({
// 		where: {
// 			phone
// 		},
// 		include: [
// 			{
// 				model: user,
// 				where: {
// 					[Op.or]: [
// 						{
// 							id: 1
// 						},
// 						{ bossId: 1 }
// 					]
// 				}
// 				// raw: true
// 			}
// 		]
// 		// raw: true
// 	});

// 	console.log(customerObj);
// })();

// (go = async () => {
// 	const customerObj = await customer.findByPk(1, { include: order });

// 	console.log(customerObj.orders.length);

// 	if (customerObj.orders.length) {
// 		console.log('DONT DELETE');
// 	} else {
// 		console.log('GO AHEAD DELETE IT BRO =)');
// 	}
// })();

// (go = async () => {
// 	const customerList = await customer.findAll({
// 		attributes: {
// 			include: [[sequelize.fn('date_format', sequelize.col('customer.createdAt'), '%d-%m-%Y'), 'createdAt']]
// 		},
// 		include: [
// 			{
// 				model: user,
// 				where: {
// 					[Op.or]: [
// 						{
// 							id: 1
// 						},
// 						{ bossId: 1 }
// 					]
// 				},
// 				raw: true
// 			}
// 		],
// 		raw: true
// 	});

// 	const allCustomers = [];
// 	for (let i = 0; i < customerList.length; i++) {
// 		allCustomers.push({
// 			id: customerList[i].id,
// 			firstName: customerList[i].firstName,
// 			lastName: customerList[i].lastName,
// 			phone: customerList[i].phone,
// 			city: customerList[i].city,
// 			address: customerList[i].address,
// 			createdBy: customerList[i]['user.firstName'] + ' ' + customerList[i]['user.lastName'],
// 			createdAt: customerList[i].createdAt
// 		});
// 	}

// 	console.log(allCustomers);
// })();
