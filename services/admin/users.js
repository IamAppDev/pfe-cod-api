const { user, role } = require('../../models/index');

const getAll = async (bossId) => {
	const usersList = await user.findAll({
		where: {
			bossId,
			roleLibelle: ['ROLE_OPERATOR', 'ROLE_DELIVERYMAN']
		},
		attributes: [
			'id',
			'firstName',
			'lastName',
			'email',
			'phone',
			'city',
			'idCard',
			'createdAt',
			'updatedAt',
			'roleLibelle'
		]
	});
	return usersList;
};

const add = async (userObj) => {
	return await user
		.create({ ...userObj })
		.then(() => {
			return 1;
		})
		.catch(() => {
			return 2;
		});
};

const update = async (userObj) => {
	return await user
		.update(
			{ ...userObj },
			{
				where: {
					id: userObj.id
				}
			}
		)
		.then(() => {
			return 1;
		})
		.catch(() => {
			return 2;
		});
};

const getUser = async (id) => {
	return await user
		.findByPk(id, {
			raw: true
		})
		.then((res) => {
			return res;
		})
		.catch(() => {
			return null;
		});
};

module.exports.getAll = getAll;
module.exports.add = add;
module.exports.update = update;
module.exports.getUser = getUser;
