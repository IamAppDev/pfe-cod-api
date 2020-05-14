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

const add = async (orderToAdd, userId) => {
	const transaction = await sequelize.transaction();
	try {
		const orderCreated = await order.create(
			{
				sourceId: orderToAdd.sourceId,
				customerId: orderToAdd.customerId,
				tracking: orderToAdd.tracking
			},
			{ transaction }
		);
		const productsCreated = await orderProduct.bulkCreate(orderToAdd.products, { transaction });
		await orderCreated.setOrderProducts(productsCreated, { transaction });
		await orderHistory.create(
			{
				orderId: orderCreated.id,
				orderState: 'new',
				userId,
				description: orderToAdd.description
			},
			{ transaction }
		);
		await transaction.commit();
		return 1;
	} catch (err) {
		console.log(err);
		await transaction.rollback();
		return 2;
	}
};

const addWithCustomer = async (orderToAdd, userId) => {
	const transaction = await sequelize.transaction();
	try {
		////////////////////////////////////////////
		const { bossId } = await user.findByPk(userId);
		const found = await customer.findOne({
			where: {
				phone: orderToAdd.customer.phone
			},
			include: [
				{
					model: user,
					where: {
						[Op.or]: [
							{
								id: bossId
							},
							{ bossId: bossId }
						]
					}
				}
			]
		});
		let createdCustomer = null;
		if (found) {
			return 2;
		} else {
			orderToAdd.customer.userId = userId;
			createdCustomer = await customer.create(orderToAdd.customer, { transaction });
		}
		////////////////////////////////////////////
		const orderCreated = await order.create(
			{
				sourceId: orderToAdd.sourceId,
				customerId: createdCustomer.id,
				tracking: orderToAdd.tracking
			},
			{ transaction }
		);
		const productsCreated = await orderProduct.bulkCreate(orderToAdd.products, { transaction });
		await orderCreated.setOrderProducts(productsCreated, { transaction });
		await orderHistory.create(
			{
				orderId: orderCreated.id,
				orderState: 'new',
				userId,
				description: orderToAdd.description
			},
			{ transaction }
		);
		await transaction.commit();
		return 1;
	} catch (err) {
		console.log(err);
		await transaction.rollback();
		return 3;
	}
};

const update = async (orderToUpdate) => {
	const transaction = await sequelize.transaction();
	const { tracking, description, deliverymanId, orderId, products } = orderToUpdate;
	try {
		const orderSelected = await order.findByPk(orderId, {
			include: orderHistory
		});

		if (tracking) {
			orderSelected.tracking = tracking;
			await orderSelected.save({ transaction });
		}
		if (deliverymanId) {
			await orderHistory.destroy(
				{
					where: {
						orderId,
						orderState: 'shipped'
					}
				},
				{ transaction }
			);
			await orderSelected.createOrderHistory(
				{
					userId: deliverymanId,
					orderState: 'shipped',
					description
				},
				{ transaction }
			);
		}
		await orderProduct.destroy({
			where: {
				orderId: orderToUpdate.id
			}
		});
		const productsCreated = await orderProduct.bulkCreate(products, { transaction });
		await orderSelected.addOrderProducts(productsCreated, { transaction });

		await transaction.commit();
		return 1;
	} catch (err) {
		await transaction.rollback();
		return 2;
	}
};

const getAll = async (userId, offset, limit, orderBy, orderDirection, filtersObj) => {
	const order = orderBy && orderDirection ? [[orderBy, orderDirection]] : [];
	let filters = {};
	if (filtersObj) {
		try {
			filtersObj = filtersObj.map((e) => JSON.parse(e));
			for (let filter of filtersObj) {
				filters[filter.field] = {
					[Op.like]: `%${filter.value}%`
				};
			}
		} catch (ex) {}
	}
	const allOrders = await order.findAll({
		offset,
		limit,
		order,
		where: filters,
		include: [
			{
				model: user,
				where: {
					id: userId
				}
			},
			{
				model: orderHistory
			}
		]
	});
	return allOrders;
};

const getCPS = async (userId) => {
	const { bossId } = await user.findByPk(userId, { attributes: ['bossId'] });
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

	return {
		products,
		customers,
		sources
	};
};

const getDm = async (userId) => {
	const { bossId } = await user.findByPk(userId, { attributes: ['bossId'] });
	const deliverymen = await user.findAll({
		where: {
			bossId,
			roleLibelle: 'ROLE_DELIVERYMAN'
		},
		include: [
			{
				model: order,
				include: [
					{
						model: orderHistory
					}
				]
			}
		]
	});

	const finalResult = [];

	for (let dman of deliverymen) {
		let total = 0;
		for (let order of dman.orders) {
			let indexOfLastElement = order.orderHistories.length - 1;
			if (order.orderHistories[indexOfLastElement].orderState === 'shipped') {
				total = total + 1;
			}
		}
		finalResult.push({
			id: dman.id,
			firstName: dman.firstName,
			lastName: dman.lastName,
			city: dman.city,
			totalCurrentOrders: total
		});
	}

	return finalResult;
};

const archive = async (orderId) => {
	return await order
		.update(
			{
				active: false
			},
			{
				where: {
					id: orderId
				}
			}
		)
		.then(() => {
			return 1;
		})
		.catch(() => {
			return 2;
		});
};

module.exports.add = add;
module.exports.addWithCustomer = addWithCustomer;
module.exports.update = update;
module.exports.getAll = getAll;
module.exports.getCPS = getCPS;
module.exports.getDm = getDm;
module.exports.archive = archive;
