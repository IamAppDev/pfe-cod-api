const { user } = require('../models/index');
const { getHashPassword, getEmailToken, getRefreshToken } = require('../utils/bcrypt');
const { roles } = require('../models/enums/roles');
const sendEmail = require('../utils/sendEmail');
const config = require('config');

const register = async (obj) => {
	const found = await user.findOne({ where: { email: obj.email } });

	if (!found) {
		const { firstName, lastName, email, password } = obj;
		const hashed = await getHashPassword(password);
		const refreshToken = getRefreshToken({ email, role: 'ROLE_ADMIN' });
		const emailToken = getEmailToken({ email, role: 'ROLE_ADMIN' });
		return await user
			.create({
				firstName,
				lastName,
				email,
				password: hashed,
				refreshToken,
				roleId: roles.indexOf('ROLE_ADMIN') + 1
			})
			.then((res) => {
				sendEmail(res.email, `${config.get('server')}/confirmation/${emailToken}`);
				return;
			})
			.catch(() => {
				return new Error('500');
			});
	} else {
		return new Error('400');
	}
};

module.exports = register;
