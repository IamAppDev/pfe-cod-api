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


  // ----------------
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
  
  
})();
