const { user, stock, product } = require('../../models/index');

const getAll = async (userId) => {
	return await user.findByPk(userId, {
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
};

module.exports.getAll = getAll;
