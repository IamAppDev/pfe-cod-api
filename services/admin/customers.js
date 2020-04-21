const { customer } = require('../../models/index');

const add = async (customerObj) => {
	return await customer
		.create(customerObj)
		.then(() => {
			return 1;
		})
		.catch(() => {
			return 2;
		});
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

const update = async (customerObj) => {
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

module.exports.add = add;
module.exports.addBulk = addBulk;
module.exports.update = update;
