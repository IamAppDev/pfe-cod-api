const { user, stock, product, stockProduct, sequelize } = require('../../models/index');
const { Op } = require('sequelize');

const add = async (productObj, userId) => {
	const userInstance = await user.findByPk(userId, {
		include: [
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

	let found = userInstance.stock.products.filter((p) => p.name === productObj.name);
	if (found.length > 0) {
		return 2;
	}

	const { quantity } = productObj;
	delete productObj.quantity;
	return await userInstance.stock
		.createProduct(productObj, { through: { quantity } })
		.then(() => {
			return 1;
		})
		.catch(() => {
			return 3;
		});
};

const addBulk = async (listOfProducts) => {
	// return await product
	// 	.bulkCreate(listOfProducts)
	// 	.then(() => {
	// 		return 1;
	// 	})
	// 	.catch(() => {
	// 		return 2;
	// 	});
};

const update = async (productObj, userId) => {
	const userInstance = await user.findByPk(userId, {
		include: [
			{
				model: stock,
				include: {
					model: product
				}
			}
		]
	});
	let found = userInstance.stock.products.filter((p) => p.name === productObj.name);
	if (found.length > 1) {
		return 2;
	}
	if (userInstance) {
		const products = userInstance.stock.products.filter((p) => p.id === productObj.id);
		const productInstance = products[0];
		const stockProductInstance = productInstance.stockProduct;
		stockProductInstance.quantity = productObj.quantity;

		productInstance.name = productObj.name;
		productInstance.price = productObj.price;
		productInstance.color = productObj.color;
		productInstance.size = productObj.size;
		productInstance.category = productObj.category;

		const transaction = await sequelize.transaction();
		try {
			await productInstance.save({ transaction });
			await stockProductInstance.save({ transaction });
			await transaction.commit();
			return 1;
		} catch (ex) {
			await transaction.rollback();
			return 3;
		}
	} else {
		return 4;
	}
};

const affect = async (bossId, infoAffect) => {
	const { affectedId, productId, quantity } = infoAffect;
	const transaction = await sequelize.transaction();
	try {
		// get product then decrement
		const bossInstance = await user.findByPk(bossId, {
			include: [
				{
					model: stock,
					include: {
						model: product,
						where: {
							id: productId
						}
					}
				}
			]
		});
		const productInstance = bossInstance.stock.products[0];
		const stockProductInstance = bossInstance.stock.products[0].stockProduct;
		await stockProductInstance.decrement('quantity', { by: quantity, transaction });
		// update quantity for already existed, else add product then increment
		const affectedWithProductInstance = await user.findByPk(affectedId, {
			include: [
				{
					model: stock,
					include: {
						model: product,
						where: {
							id: productId
						}
					}
				}
			]
		});
		//
		if (!affectedWithProductInstance.stock) {
			const affectedWithoutProductInstance = await user.findByPk(affectedId, {
				include: stock
			});
			await affectedWithoutProductInstance.stock.addProduct(productInstance, { through: { quantity }, transaction });
		} else {
			await affectedWithProductInstance.stock.products[0].stockProduct.increment('quantity', {
				by: quantity,
				transaction
			});
		}
		await transaction.commit();
		return 1;
	} catch (err) {
		await transaction.rollback();
		return 2;
	}
};

const del = async (productId) => {
	const countAffected = await stockProduct.count({
		where: {
			productId
		}
	});
	if (countAffected > 1) {
		return 2;
	} else {
		return await product
			.destroy({
				where: {
					id: productId
				}
			})
			.then(() => {
				return 1;
			})
			.catch(() => {
				return 3;
			});
	}
};

// const getAll = async (bossId, offset, limit) => {
// 	let products = await product.findAll({
// 		include: [
// 			{
// 				model: stock,
// 				include: [
// 					{
// 						model: user
// 					}
// 				]
// 			}
// 		],
// 		where: {
// 			[Op.or]: [
// 				{
// 					'$stocks.user.id$': bossId
// 				},
// 				{ '$stocks.user.bossId$': bossId }
// 			]
// 		}
// 	});

// 	const count = products.length;
// 	if (!(offset === 0 && limit === 0)) {
// 		products = products.slice(offset, limit + offset);
// 	}

// 	let allProducts = [];

// 	for (let product of products) {
// 		let stocks = [];
// 		let quantity = 0;
// 		for (let stock of product.stocks) {
// 			if (stock.user.bossId) {
// 				stocks.push({
// 					quantity: stock.stockProduct.quantity,
// 					user: {
// 						id: stock.user.id,
// 						firstName: stock.user.firstName,
// 						lastName: stock.user.lastName,
// 						city: stock.user.city
// 					}
// 				});
// 			} else {
// 				quantity = stock.stockProduct.quantity;
// 			}
// 		}

// 		allProducts.push({
// 			id: product.id,
// 			name: product.name,
// 			price: product.price,
// 			size: product.size,
// 			color: product.color,
// 			weight: product.weight,
// 			category: product.category,
// 			quantity,
// 			stocks
// 		});
// 	}

// 	return {
// 		count,
// 		rows: allProducts
// 	};
// };

const getAll = async (bossId, offset, limit) => {
	try {
		const userList = await user.findAll({
			where: {
				[Op.or]: [
					{
						bossId,
						roleLibelle: 'ROLE_DELIVERYMAN'
					},
					{ id: bossId }
				]
			},
			include: [
				{
					model: stock,
					raw: true,
					include: {
						model: product,
						raw: true
					}
				}
			],
			raw: true
		});

		let productList = userList
			.filter((user) => !user.bossId)
			.map((user) => {
				if (user['stock.products.id']) {
					return {
						id: user['stock.products.id'],
						name: user['stock.products.name'],
						price: user['stock.products.price'],
						weight: user['stock.products.weight'],
						size: user['stock.products.size'],
						color: user['stock.products.color'],
						quantity: user['stock.products.stockProduct.quantity'],
						category: user['stock.products.category'],
						createdAt: user['stock.products.createdAt']
					};
				}
			});

		if (productList.length === 1 && !productList[0]) {
			productList = [];
		}

		let cpt = -1;
		const usersStock = [];
		userList.forEach((user) => {
			if (user.bossId) {
				if (cpt !== user.id) {
					usersStock.push({
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						city: user.city,
						productList: user['stock.products.id']
							? [
									{
										id: user['stock.products.id'],
										name: user['stock.products.name'],
										quantity: user['stock.products.stockProduct.quantity']
									}
							  ]
							: []
					});
				} else {
					usersStock[usersStock.length - 1].productList.push(
						user['stock.products.id']
							? {
									id: user['stock.products.id'],
									name: user['stock.products.name'],
									quantity: user['stock.products.stockProduct.quantity']
							  }
							: null
					);
				}
			}
			cpt = user.id;
		});

		// for pagination only
		const count = productList.length;
		if (!(offset === 0 && limit === 0)) {
			productList = productList.slice(offset, limit + offset);
		}
		//
		for (let product of productList) {
			let theStock = [];
			for (let userStock of usersStock) {
				const quantityObj = userStock.productList.find((p) => p.id === product.id);
				theStock.push({
					id: userStock.id,
					firstName: userStock.firstName,
					lastName: userStock.lastName,
					city: userStock.city,
					quantity: quantityObj ? quantityObj.quantity : 0
				});
			}
			product.theStock = theStock;
		}
		//
		return {
			count,
			productList,
			usersStock
		};
	} catch (err) {
		return null;
	}
};

module.exports.add = add;
module.exports.addBulk = addBulk;
module.exports.update = update;
module.exports.affect = affect;
module.exports.getAll = getAll;
module.exports.del = del;
