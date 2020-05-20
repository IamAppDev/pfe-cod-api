const { customer, order, user, product, orderProduct, orderHistory } = require('../../models/index');
const { Op } = require('sequelize');

const getAll = async (userId, offset, limit, orderBy, orderDirection, filtersObj) => {
	const orderObj = orderBy && orderDirection ? [[orderBy, orderDirection]] : [];
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
	const { bossId } = await user.findByPk(userId);
	console.log(userId, bossId);
	let customerList = await customer.findAll({
		// group: ['id'],
		where: filters,
		include: [
			{
				model: user,
				where: {
					[Op.or]: [
						{
							id: bossId
						},
						{
							bossId
						}
					]
				}
			}
		],
		include: [
			{
				model: order,
				include: [
					{
						model: orderHistory,
						where: {
							orderState: 'new',
							userId
						}
					},
					{
						model: orderProduct,
						include: [
							{
								model: product
							}
						]
					}
				]
			}
		]
	});
	// for pagination only
	const count = customerList.length;
	if (!(offset === 0 && limit === 0)) {
		customerList = customerList.slice(offset, limit + offset);
	}
	//
	return {
		count,
		rows: customerList
	};
};

// need modification
const add = async (customerObj, bossId) => {
	const found = await customer.findOne({
		where: {
			phone: customerObj.phone
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

	if (found) {
		return 2;
	} else {
		return await customer
			.create(customerObj)
			.then(() => {
				return 1;
			})
			.catch(() => {
				return 3;
			});
	}
};

const addBulk = async (listOfCustomers) => {
	return await customer
		.bulkCreate(listOfCustomers)
		.then(() => {
			return 1;
		})
		.catch(() => {
			return 2;
		});
};

const update = async (customerObj, bossId) => {
	if (customerObj.phone) {
		const found = await customer.findOne({
			where: {
				phone: customerObj.phone
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

		if (found) {
			return 3;
		}
	}

	const id = customerObj.id;
	delete customerObj.id;
	return await customer
		.update(customerObj, {
			where: {
				id
			}
		})
		.then(() => {
			return 1;
		})
		.catch(() => {
			return 2;
		});
};

const del = async (customerId) => {
	const customerObj = await customer.findByPk(customerId, { include: order });
	if (!customerObj.orders.length) {
		return await customer
			.destroy({ where: { id: customerId } })
			.then(() => {
				return 1;
			})
			.catch(() => {
				return 3;
			});
	} else {
		return 2;
	}
};

module.exports.getAll = getAll;
module.exports.add = add;
module.exports.addBulk = addBulk;
module.exports.update = update;
module.exports.del = del;
