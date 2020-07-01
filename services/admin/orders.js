const { source, customer, order, user, product, orderHistory, orderProduct, payment } = require('../../models/index');
const { Op, literal } = require('sequelize');

const getAll = async (filters) => {
	let { offset, limit, id, sourceName, paymentRef, customerNameOrPhone, createdAt } = filters;

	let offsetValue = 0;
	let limitValue = 5;
	let refOrderFilter = undefined;
	let sourceNameFilter = undefined;
	let paymentRefFilter = undefined;
	let customerNameOrPhoneFilter = undefined;
	let createdAtFilter = undefined;

	if (!isNaN(offset) && !isNaN(limit)) {
		try {
			offsetValue = Math.floor(parseInt(offset));
			limitValue = Math.floor(parseInt(limit));
		} catch (err) {
			offsetFilter = 0;
			limitFilter = 0;
		}
	}

	if (id) {
		refOrderFilter = {
			id: { [Op.like]: `%${id}%` }
		};
	}

	if (sourceName) {
		sourceNameFilter = {
			name: { [Op.like]: `%${sourceName}%` }
		};
	}

	if (paymentRef) {
		paymentRefFilter = {
			ref: { [Op.like]: `%${paymentRef}%` }
		};
	}

	if (customerNameOrPhone) {
		customerNameOrPhoneFilter = {
			[Op.or]: [
				{ firstName: { [Op.like]: `%${customerNameOrPhone}%` } },
				{ lastName: { [Op.like]: `%${customerNameOrPhone}%` } },
				{ phone: { [Op.like]: `%${customerNameOrPhone}%` } }
			]
		};
	}

	if (createdAt) {
		createdAtFilter = {
			createdAt: {
				[Op.between]: [`${createdAt} 00:00:00`, `${createdAt} 23:59:59`]
			}
		};
	}

	return await order.findAndCountAll({
		distinct: true,
		where: {
			[Op.and]: [refOrderFilter, createdAtFilter]
		},
		include: [
			{
				model: orderHistory,
				include: [
					{
						model: user,
						attributes: ['firstName', 'lastName', 'city', 'phone', 'email', 'roleLibelle']
					}
				]
			},
			{
				model: customer,
				where: customerNameOrPhoneFilter
			},
			{
				model: payment,
				where: paymentRefFilter
			},
			{
				model: source,
				where: sourceNameFilter
			},
			{
				model: orderProduct,
				include: [
					{
						model: product
					}
				]
			}
		],
		offset: offsetValue,
		limit: limitValue
	});
};

module.exports.getAll = getAll;
