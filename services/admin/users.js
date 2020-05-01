const { user, stock, sequelize } = require('../../models/index');

const getAll = async (bossId, offset, limit) => {
	const usersList = await user.findAndCountAll({
		offset,
		limit,
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
			'price',
			'idCard',
			'createdAt',
			'updatedAt',
			'roleLibelle',
			'active',
			[sequelize.fn('date_format', sequelize.col('createdAt'), '%d-%m-%Y'), 'createdAt']
		]
	});
	return usersList;
};

const add = async (userObj) => {
	if (userObj.roleLibelle === 'ROLE_DELIVERYMAN') {
		const transaction = await sequelize.transaction();
		try {
			const userInstance = await user.create({ ...userObj }, { transaction });
			await userInstance.createStock({}, { transaction });
			await transaction.commit();
			return 1;
		} catch (err) {
			console.log(err);
			await transaction.rollback();
			return 2;
		}
	} else {
		return await user
			.create({ ...userObj })
			.then(() => {
				return 1;
			})
			.catch((err) => {
				console.log(err);
				return 2;
			});
	}
};

const update = async (userObj) => {
	const id = userObj.id;
	delete userObj.id;
	return await user
		.update(
			{ ...userObj },
			{
				where: {
					id
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
