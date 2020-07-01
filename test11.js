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
	orderProduct,
	payment
} = require('./models/index');
const { Op, Model } = require('sequelize');
const { states } = require('./models/enums/states');
// const router = require('./routers/admin/orders');

(async () => {
	// let offset = 0;
	// let limit = 5;
	// let refOrderFilter = undefined;
	// let sourceNameFilter = undefined;
	// let paymentRefFilter = undefined;
	// let customerNameOrPhoneFilter = undefined;
	// let searchByThis = ''; // value received from front app
	// if (true) {
	// 	refOrderFilter = {
	// 		ref: { [Op.like]: `%%` }
	// 	};
	// 	sourceNameFilter = {
	// 		name: { [Op.like]: `%%` }
	// 	};
	// 	// paymentRefFilter = {
	// 	// 	ref: { [Op.like]: `%%` }
	// 	// };
	// 	customerNameOrPhoneFilter = {
	// 		[Op.or]: [
	// 			{ firstName: { [Op.like]: `%${searchByThis}%` } },
	// 			{ lastName: { [Op.like]: `%${searchByThis}%` } },
	// 			{ phone: { [Op.like]: `%${searchByThis}%` } }
	// 		]
	// 	};
	// }
	// const allOrders = await order.findAndCountAll({
	// 	distinct: true,
	// 	include: [
	// 		{
	// 			model: orderHistory,
	// 			include: [
	// 				{
	// 					model: user
	// 				}
	// 			]
	// 		},
	// 		{
	// 			model: customer,
	// 			where: customerNameOrPhoneFilter
	// 		},
	// 		{
	// 			model: payment,
	// 			where: paymentRefFilter
	// 		},
	// 		{
	// 			model: source,
	// 			where: sourceNameFilter
	// 		},
	// 		{
	// 			model: orderProduct,
	// 			include: [
	// 				{
	// 					model: product
	// 				}
	// 			]
	// 		}
	// 	],
	// 	offset,
	// 	limit
	// });
	// console.log(allOrders);
})();
