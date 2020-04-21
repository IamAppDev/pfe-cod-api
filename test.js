// const token = req.header('x-auth-token');
// if (!token) return res.sendStatus(401);

// try {
// 	jwt.verify(token, config.get('jwtPrivateKey'));
// 	next();
// } catch (err) {
// 	res.status(401).send('Invalid token.');
// }

// const jwt = require('jsonwebtoken');
// const config = require('config');

// let token = null;
// const thisfunction = async () => {
// 	await jwt.sign({ foo: 'bar' }, config.get('jwtPrivateKey'), { expiresIn: '1day', algorithm: 'HS256' }, (err, theToken) => {
// 		console.log(err, theToken);
// 	});
// 	console.log(token);

// 	// await jwt.verify(token, config.get('jwtPrivateKey'), (err, decoded) => {
// 	// 	if (err) {
// 	// 		console.log('error bro !');
// 	// 	} else {
// 	// 		console.log(decoded);
// 	// 	}
// 	// });
// };

// thisfunction();

// const { getToken, getEmailToken } = require('./utils/bcrypt');

// const obj = { email: 'bouhoutayassine@gmail.com' };

// (myfn = async () => {
// 	console.log('jwt : ', getToken(obj, 'jwtPrivateKey'));
// })();

// const { sendInvitation } = require('./utils/sendEmail');

// sendInvitation('yassine', 'bouhoutayassine@gmail.com', 'thepass', 'owner', 'boss');

// const { invite } = require('./services/admin/users');

// invite(2, 3);

const { getUser } = require('./services/admin/users');
const { user, stock, role, product, stockProduct, sequelize } = require('./models/index');

(show = async () => {
	// const userInstance = await user.findByPk(2);
	// const stockInstance = await userInstance.getStock();
	// const productInstance = await stockInstance.createProduct({ name: 'test', price: '299' });
	// await stockProductInstance.createProduct({name: 'test', price: '299'});
	// console.log(stockObj);

	// const userInstance = await user.findByPk(3, {
	// 	include: [
	// 		{
	// 			model: stock,
	// 			include: product
	// 		}
	// 	]
	// });
	// const s = await userInstance.getStock();
	// console.log(await s.getProducts());
	// console.log(Object.keys(userInstance));
	// console.log(userInstance.stock.products[0]);
	// console.log(userInstance.stock.products[0].stockProduct.quantity);
	// console.log(userInstance.stock.products[0].stockProduct);
	// await userInstance.stock.products[0].setQuantity(30);
	// userInstance.stock.products[0].stockProduct.quantity = 20;
	// console.log(userInstance.stock.products[0].stockProduct.quantity);

	// const transaction = await sequelize.transaction();
	// try {
	// 	const userInstance = await user.findByPk(3, {
	// 		include: [
	// 			{
	// 				model: stock,
	// 				include: {
	// 					model: product,
	// 					where: {
	// 						id: 4
	// 					}
	// 				}
	// 			}
	// 		]
	// 	});
	// 	const stockProductInstance = userInstance.stock.products[0].stockProduct;

	// 	await stockProductInstance.decrement('quantity', { by: 343, transaction });
	// 	await transaction.commit();
	// } catch (err) {
	// 	await transaction.rollback();
	// }

	const { Op } = require('sequelize');

	const userList = await user.findAll({
		where: {
			[Op.or]: [
				{
					bossId: 3,
					roleLibelle: 'ROLE_DELIVERYMAN'
				},
				{ id: 3 }
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
	// console.log(usersStock[2].productList);
	console.log(result);
})();
