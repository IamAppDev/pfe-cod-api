const { customer, order, user, sequelize, stock, product, source, stockProduct } = require('./models/index');
const { Op } = require('sequelize');

(go = async () => {

	const found = await source.findByPk(1,{
		include: [{
			model: user
		}, {
			model: order
		}]
	});

	console.log(found.orders.length);

	// const orderBy = 'name';
	// const orderDirection = 'DESC';
	// let order = [];
	// if (orderBy && orderDirection) {
	// 	order = [[orderBy, orderDirection]];
	// }

	// const filtersObj = [
	// 	{
	// 		field: 'name',
	// 		value: 'fb page'
	// 	},
	// 	{
	// 		field: 'type',
	// 		value: 'f'
	// 	}
	// ];
	// // const filters = {
	// // 	name: { [Op.like]: `%fb page%` }
	// // };
	// let filters = {};

	// for( let filter of filtersObj) {
	// 	filters[filter.field] = { [Op.like]: `%${filter.value}%` };
	// };

	// console.log(filters);

	// const all = await source.findAndCountAll({
	// 	offset: 0,
	// 	limit: 5,
	// 	order,
	// 	where: filters,
	// 	include: [
	// 		{
	// 			model: user,
	// 			where: {
	// 				id: 1
	// 			}
	// 		}
	// 	]
	// });
	// console.log(all.rows);
	// console.log(all.count);

	// return {
	// 	count,
	// 	productList,
	// 	usersStock
	// };
	// const src = { id: 4, name: 'fb page 1', type: 'facebook' };
	// const userInstance = await user.findByPk(1, {
	// 	include: [
	// 		{
	// 			model: source
	// 		}
	// 	]
	// });
	// const found = userInstance.sources.filter((s) => s.name === src.name);
	// if (found.length >= 1) {
	// 	console.log('EXIST');
	// } else {
	// 	let sourceInstance = userInstance.sources.filter((s) => s.id === src.id)[0];
	// 	sourceInstance.name = src.name;
	// 	sourceInstance.type = src.type;
	// 	await sourceInstance.save().then().catch(err => {
	// 		console.log(err);
	// 	});
	// await source
	// 	.update(sourceInstance, {
	// 		where: {
	// 			id: src.id
	// 		}
	// 	})
	// 	.then()
	// 	.catch((err) => {
	// 		console.log(err);
	// 	});
	// }
	// console.log(userInstance);
	// const productObj = {
	// 	id: 25,
	// 	name: 'aaa',
	// 	price: 333,
	// 	quantity: 333,
	// 	weight: null,
	// 	size: null,
	// 	color: null,
	// 	category: null
	// };
	// const userInstance = await user.findByPk(1, {
	// 	include: [
	// 		{
	// 			model: stock,
	// 			include: {
	// 				model: product
	// 			}
	// 		}
	// 	]
	// });
	// let found = userInstance.stock.products.filter(p => p.name === productObj.name);
	// if (found.length > 1) {
	//   return console.log('NAME EXIST');
	// }
	// if (userInstance) {
	//   const products = userInstance.stock.products.filter((p) => p.id === productObj.id);
	// 	const productInstance = products[0];
	// 	const stockProductInstance = productInstance.stockProduct;
	// 	stockProductInstance.quantity = productObj.quantity;
	// 	productInstance.name = productObj.name;
	// 	productInstance.price = productObj.price;
	// 	productInstance.color = productObj.color;
	// 	productInstance.size = productObj.size;
	// 	productInstance.category = productObj.category;
	// 	const transaction = await sequelize.transaction();
	// 	try {
	// 		await productInstance.save({ transaction });
	// 		await stockProductInstance.save({ transaction });
	// 		await transaction.commit();
	// 		return 1;
	// 	} catch (ex) {
	// 		await transaction.rollback();
	// 		return 2;
	// 	}
	// } else {
	// 	return 3;
	// }
	// product.create({ name: 'aaa', quantity: '100', price: '200' });
	// const productObj = { name: 'aaa', quantity: '100', price: '200' };
	// const userInstance = await user.findByPk(1, {
	// 	include: [
	// 		{
	// 			model: stock,
	// 			include: [
	// 				{
	// 					model: product
	// 				}
	// 			]
	// 		}
	// 	]
	// });
	// let found = userInstance.stock.products.filter(p => p.name === productObj.name);
	// console.log('AAAA', found.length);
	// if (found.length > 0) {
	//   console.log('EXIST', found.length);
	// }
	// console.log(found.length);
	// console.log(await productInstance.findOne({ where: { name: productObj.name } }));
	// const { quantity } = productObj;
	// delete productObj.quantity;
	// await userInstance.stock
	// 	.createProduct(productObj, { through: { quantity } })
	// 	.then(() => {
	//     console.log(1);
	// 	})
	// 	.catch((err) => {
	//     console.log(err);
	// 	});
})();
