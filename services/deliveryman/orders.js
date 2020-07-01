const {
	customer,
	order,
	user,
	sequelize,
	stock,
	product,
	orderHistory,
	orderProduct,
	payment
} = require('../../models/index');
const { Op } = require('sequelize');

const setPayment = async (data) => {
	const transaction = await sequelize.transaction();
	try {
		// const userId = 4;
		const dmFound = await user.findByPk(data.userId, {
			include: {
				model: payment
			}
		});
		const bossId = dmFound.bossId;
		// const ref = data.ref;
		const p = await payment.create(
			{
				userId: data.userId,
				receiver: bossId,
				ref: data.ref
			},
			{ transaction }
		);

		await order.update(
			{
				paymentId: p.id
			},
			{
				where: {
					id: {
						// [Op.or]: ['b326dd3f-e4bb-4ad5-87a6-3708fdbc42a8', 'de3f5383-a381-4b53-b67e-a6fbb5daf1f9']
						[Op.or]: data.orders
					}
				},
				transaction
			}
		);

		let ordersToAdd = [];
		for (let orderId of data.orders) {
			ordersToAdd.push({
				orderId,
				orderState: 'payed',
				userId: data.userId
			});
		}

		await orderHistory.bulkCreate(ordersToAdd, { transaction });

		transaction.commit();
		return 1;
	} catch (err) {
		console.log(err);
		transaction.rollback();
		return 2;
	}
};

const updateOrder = async (data) => {
	const transaction = await sequelize.transaction();
	try {
		await orderHistory.create(
			{
				orderId: data.orderId,
				orderState: data.orderState,
				userId: data.userId,
				description: data.description
			},
			{
				transaction
			}
		);

		// case orderState ==> delivered
		if (data.orderState === 'delivered') {
			const products = data.products;
			const deliveryman = await user.findByPk(data.userId, {
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
				if (!current.length) {
					allGood = false;
				} else {
					if (current[0].stockProduct.quantity >= product.quantity) {
						current[0].stockProduct.quantity -= product.quantity;
						await current[0].stockProduct.save({ transaction });
					} else {
						allGood = false;
					}
				}
			}

			if (!allGood) {
				throw '';
			}
		}

		await transaction.commit();
		return 1;
	} catch (ex) {
		await transaction.rollback();
		return 2;
	}
};

const getCustomAll = async (userId, orderState) => {
	return await order
		.findAll({
			include: [
				{
					model: orderHistory,
					where: {
						userId
					}
				},
				{
					model: orderProduct,
					include: {
						model: product
					}
				},
				{
					model: customer
				},
				{
					model: payment
				}
			]
		})
		.then((res) => {
			return res.filter((order) => order.orderHistories[order.orderHistories.length - 1].orderState === orderState);
		});
};

const getAll = async (userId) => {
	return await order
		.findAll({
			include: [
				{
					model: orderHistory,
					where: {
						userId
					}
				},
				{
					model: orderProduct,
					include: {
						model: product
					}
				},
				{
					model: customer
				}
			]
		})
		.then((res) => {
			return res.filter((order) => order.orderHistories[order.orderHistories.length - 1].orderState === 'shipped');
		});
};

const getDelivered = async (userId) => {
	return await order
		.findAll({
			include: [
				{
					model: orderHistory,
					where: {
						userId
					}
				},
				{
					model: orderProduct,
					include: {
						model: product
					}
				},
				{
					model: customer
				}
			]
		})
		.then((res) => {
			return res.filter((order) => order.orderHistories[order.orderHistories.length - 1].orderState === 'delivered');
		});
};

module.exports.getDelivered = getDelivered;
module.exports.getAll = getAll;
module.exports.updateOrder = updateOrder;
module.exports.getCustomAll = getCustomAll;
module.exports.setPayment = setPayment;
