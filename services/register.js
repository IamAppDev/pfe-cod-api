const { user, sequelize } = require('../models/index');
const { getHashPassword, getEmailToken, getRefreshToken } = require('../utils/bcrypt');
const { roles } = require('../models/enums/roles');
const { sendEmailRegistration } = require('../utils/sendEmail');
const config = require('config');

const register = async (obj) => {
	const found = await user.findOne({ where: { email: obj.email } });

	if (!found) {
		const { firstName, lastName, email, password } = obj;
		const hashed = await getHashPassword(password);
		const refreshToken = getRefreshToken({ email, role: 'ROLE_ADMIN' });
		const emailToken = getEmailToken({ email, role: 'ROLE_ADMIN' });
		//
		const transaction = await sequelize.transaction();
		try {
			const userInstance = await user.create(
				{
					firstName,
					lastName,
					email,
					password: hashed,
					refreshToken,
					roleLibelle: roles.indexOf('ROLE_ADMIN') + 1
				},
				{ transaction }
			);
			await userInstance.createStock({}, { transaction });
			await transaction.commit();
			sendEmailRegistration(email, `${config.get('server')}/confirmation/${emailToken}`);
			return;
		} catch (err) {
			await transaction.rollback();
			return new Error('500');
		}

		// return await user
		// 	.create({
		// 		firstName,
		// 		lastName,
		// 		email,
		// 		password: hashed,
		// 		refreshToken,
		// 		roleLibelle: roles.indexOf('ROLE_ADMIN') + 1
		// 	})
		// 	.then((res) => {
		// 		sendEmailRegistration(res.email, `${config.get('server')}/confirmation/${emailToken}`);
		// 		return;
		// 	})
		// 	.catch(() => {
		// 		return new Error('500');
		// 	});
	} else {
		return new Error('400');
	}
};

module.exports = register;
