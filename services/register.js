const { utilisateur } = require('../models/index');
const {
	getHashPassword,
	getEmailToken,
	getRefreshToken
} = require('../utils/bcrypt');
const { roles } = require('../models/enums/roles');
const sendEmail = require('../utils/sendEmail');
const config = require('config');

const register = async (obj) => {
	const found = await utilisateur.findOne({ where: { email: obj.email } });

	if (!found) {
		const hashed = await getHashPassword(obj.password);
		const refreshToken = getRefreshToken({ email: obj.email });
		return await utilisateur
			.create({
				prenom: obj.firstName,
				nom: obj.lastName,
				email: obj.email,
				motdepasse: hashed,
				refreshToken,
				roleId: roles.indexOf('ROLE_ADMIN') + 1
			})
			.then((res) => {
				const emailToken = getEmailToken({ email: res.email });
				sendEmail(
					res.email,
					`${config.get('server')}/confirmation/${emailToken}`
				);
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
