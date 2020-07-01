const { customer, order, user, sequelize, product, orderHistory, orderProduct } = require('../../models/index');
const { Op, Model } = require('sequelize');

const getAll = async (userId) => {
	const result = await user.findAll({
		group: ['roleLibelle'],
		attributes: ['roleLibelle', [sequelize.fn('COUNT', 'roleLibelle'), 'roleLibelleCount']],
		where: {
			bossId: userId
		}
	});

	let totalOpAndDm = [];
	for (let res of result) {
		totalOpAndDm.push(res.dataValues);
	}

	// count for each order state
	const allOrders = await order.findAll({
		include: [
			{
				model: user,
				where: {
					bossId: userId
				}
			},
			{
				model: orderHistory,
				include: [
					{
						model: user
					}
				]
			},
			{
				model: orderProduct,
				include: [
					{
						model: product
					}
				]
			},
			{
				model: customer
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

	// query to find total MAD for all orders since creation
	// query to find product with MOST ORDERS
	let totalMAD = 0;
	let products = new Map();
	let currentTotal = 0;
	for (let order of allOrders) {
		for (let orderProduct of order.orderProducts) {
			totalMAD += orderProduct.quantity * orderProduct.product.price * ((100 - orderProduct.discount) * 0.01);
			currentTotal = orderProduct.quantity * orderProduct.product.price * ((100 - orderProduct.discount) * 0.01);
			//
			let totalAmountSpent = currentTotal;
			totalAmountSpent += products.get(orderProduct.product.id)
				? products.get(orderProduct.product.id).customer
					? products.get(orderProduct.product.id).customer.totalAmountSpent
					: 0
				: 0;
			//
			let totalOrders = products.get(orderProduct.product.id) ? products.get(orderProduct.product.id).totalOrders : 0;
			products.set(orderProduct.product.id, {
				name: orderProduct.product.name,
				totalOrders: totalOrders ? orderProduct.quantity + totalOrders : orderProduct.quantity,
				customer: {
					id: order.customer.id,
					firstName: order.customer.firstName,
					lastName: order.customer.lastName,
					city: order.customer.city,
					phone: order.customer.phone,
					address: order.customer.address,
					totalAmountSpent
				}
			});
		}
	}

	//

	console.log(products);
	// console.log(count);
	// console.log(totalOpAndDm);
	// console.log(Math.floor(totalMAD));

	// let productsJSON = [];

	return {
		products: JSON.stringify([...products]),
		count,
		totalOpAndDm,
		totalMAD
	};
};

module.exports.getAll = getAll;
