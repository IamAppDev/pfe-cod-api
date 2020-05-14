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
const Joi = require('joi');

(go = async () => {
	// const schemaAdd = Joi.object().keys({
	//   customerId: Joi.number().required(),
	//   products: Joi.array().items(
	//     Joi.object().keys({
	//       id: Joi.number().required(),
	//       quantity: Joi.number().required(),
	//       discount: Joi.number().required()
	//     })
	//   ),
	//   sourceId: Joi.number().required()
	// });

	// const addObj = {
	// 	customerId: 3,
	// 	sourceId: 2,
	// 	orderProducts: [
	// 		{
	// 			id: 1,
	// 			quantity: 2,
	// 			discount: 10
	// 		},
	// 		{
	// 			id: 1,
	// 			quantity: 3,
	// 			discount: 20
	// 		}
	// 	]
	// };

	// if (!Joi.validate(addObj, schemaAdd).error) {
	//   console.log('done');
	// } else {
	//   console.log('not validate');
	// }

	// console.log(Joi.validate(addObj, schemaAdd).error);

	// ---------------- adding

	// const addObj = {
	// 	customerId: 3,
	// 	sourceId: 2,
	// 	tracking: '',
	// 	products: [
	// 		{
	// 			productId: 1,
	// 			quantity: 2,
	// 			discount: 10
	// 		},
	// 		{
	// 			productId: 3,
	// 			quantity: 3,
	// 			discount: 20
	// 		}
	// 	]
	// };

	// const userId = 2;
	// const transaction = await sequelize.transaction();
	// try {
	// 	const orderCreated = await order.create(
	// 		{
	// 			sourceId: addObj.sourceId,
	// 			customerId: addObj.customerId,
	// 			tracking: addObj.tracking
	// 		},
	// 		{ transaction }
	// 	);
	// 	// let products = [];
	// 	// for (let product of addObj.products){
	// 	//   products.push({
	// 	//     ...product,
	// 	//     orderId: orderCreated.id
	// 	//   });
	// 	// }
	// 	const productsCreated = await orderProduct.bulkCreate(addObj.products, { transaction });
	// 	await orderCreated.setOrderProducts(productsCreated, { transaction });
	// 	await orderHistory.create(
	// 		{
	// 			orderId: orderCreated.id,
	// 			orderState: 'new',
	// 			userId
	// 		},
	// 		{ transaction }
	// 	);

	// 	await transaction.commit();
	// } catch (err) {
	// 	console.log(err);
	// 	await transaction.rollback();
	// }

	// -------- updating

	const orderToUpdate = {
		id: '14c2597c-c01c-4013-84a6-8d904bdce68c',
		products: [
			{
				productId: 1,
				quantity: 2,
				discount: 10
			},
			{
				productId: 3,
				quantity: 3,
				discount: 20
			}
		],
		tracking: 'ZEIFN982',
		description: 'sm th'
	};
	const transaction = await sequelize.transaction();
	try {
		const orderSelected = await order.findByPk(orderToUpdate.id, {
			include: orderHistory
		});

		orderSelected.tracking = 'ZEIHFZ';
		await orderSelected.save({ transaction });
		await orderHistory.destroy(
			{
				where: {
					orderId: orderToUpdate.id,
					orderState: 'shipped'
				}
			},
			{ transaction }
		);
		await orderSelected.createOrderHistory(
			{
				userId: 3,
				orderState: 'shipped',
				description: orderToUpdate.description
			},
			{ transaction }
		);
		await orderProduct.destroy({
			where: {
				orderId: orderToUpdate.id
			}
		});
		const productsCreated = await orderProduct.bulkCreate(orderToUpdate.products, { transaction });
		await orderSelected.addOrderProducts(productsCreated, { transaction });

		transaction.commit();
	} catch (err) {
		console.log(err);
		transaction.rollback();
	}

	// --------- get all order

	// const { orderBy, orderDirection, filters } = req.query;
	// const order = orderBy && orderDirection ? [[orderBy, orderDirection]] : [];
	// let filters = {};
	// if (filtersObj) {
	// 	try {
	// 		filtersObj = filtersObj.map((e) => JSON.parse(e));
	// 		for (let filter of filtersObj) {
	// 			filters[filter.field] = {
	// 				[Op.like]: `%${filter.value}%`
	// 			};
	// 		}
	// 	} catch (ex) {}
	// }
	// const allOrders = await order.findAll({
	// 	include: [
	// 		{
	// 			model: user,
	// 			where: {
	// 				id: 2
	// 			}
	// 		},
	// 		{
	// 			model: orderHistory
	// 		},
	// 		{
	// 			model: orderProduct
	// 		}
	// 	]
	// });

	// console.log(allOrders.length);
})();
