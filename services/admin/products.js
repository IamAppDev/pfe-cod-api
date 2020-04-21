const { user, stock, product, sequelize } = require('../../models/index');
const { Op } = require('sequelize');

const add = async (productObj, userId) => {
	const transaction = await sequelize.transaction();
	try {
		const userInstance = await user.findByPk(userId, {
			include: stock,
			transaction
		});
		const { quantity } = productObj;
		delete productObj.quantity;
		await userInstance.stock.createProduct(productObj, { through: { quantity } });
		await transaction.commit();
		return 1;
	} catch (err) {
		await transaction.rollback();
		return 2;
	}
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
					model: product,
					where: {
						id: productObj.id
					}
				}
			}
		]
	});
	if (userInstance) {
		const stockProductInstance = userInstance.stock.products[0].stockProduct;
		stockProductInstance.quantity = productObj.quantity;
		return await stockProductInstance
			.save()
			.then(() => {
				return 1;
			})
			.catch(() => {
				return 2;
			});
	} else {
		return 2;
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

const getAll = async (bossId) => {
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

		const productList = userList
			.filter((user) => !user.bossId)
			.map((user) => {
				if (!user['products.id']) {
					return {
						id: user['stock.products.id'],
						name: user['stock.products.name'],
						price: user['stock.products.price'],
						weight: user['stock.products.weight'],
						size: user['stock.products.size'],
						color: user['stock.products.color'],
						category: user['stock.products.category'],
						createdAt: user['stock.products.createdAt']
					};
				}
			});

		let cpt = -1;
		const usersStock = [];
		userList.forEach((user) => {
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
			cpt = user.id;
		});

		const result = [productList, usersStock];
		return result;
	} catch (err) {
		return null;
	}
};

module.exports.add = add;
module.exports.addBulk = addBulk;
module.exports.update = update;
module.exports.affect = affect;
module.exports.getAll = getAll;
