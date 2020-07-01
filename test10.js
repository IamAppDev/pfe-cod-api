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

(async () => {
	const result = await user.findByPk(3, {
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

	console.log(result.stock.products.length);
})();
