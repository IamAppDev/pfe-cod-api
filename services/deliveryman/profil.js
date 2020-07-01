const { user } = require('../../models/index');

const getProfil = async (userId) => {
	return await user.findByPk(userId, {
		attributes: ['firstName', 'lastName', 'email', 'city', 'phone']
	});
};

module.exports.getProfil = getProfil;
