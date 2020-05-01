const { customer, order, user, sequelize } = require('../../models/index');
const { Op } = require('sequelize');

const getAll = async (bossId, offset, limit) => {
	const customerList = await customer.findAndCountAll({
		offset,
		limit,
		attributes: {
			include: [[sequelize.fn('date_format', sequelize.col('customer.createdAt'), '%d-%m-%Y'), 'createdAt']]
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
				},
				raw: true
			}
		],
		raw: true
	});

	const allCustomers = [];
	for (let i = 0; i < customerList.rows.length; i++) {
		allCustomers.push({
			id: customerList.rows[i].id,
			firstName: customerList.rows[i].firstName,
			lastName: customerList.rows[i].lastName,
			phone: customerList.rows[i].phone,
			city: customerList.rows[i].city,
			address: customerList.rows[i].address,
			createdBy: customerList.rows[i]['user.firstName'] + ' ' + customerList.rows[i]['user.lastName'],
			createdAt: customerList.rows[i].createdAt
		});
	}

	return {
		count: customerList.count,
		rows: allCustomers
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
