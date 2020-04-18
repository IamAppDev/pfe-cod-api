const { user, role } = require('../models/index');
const { getToken, getRefreshToken } = require('../utils/bcrypt');
const bcrypt = require('bcrypt');

const login = async (obj) => {
	const { email, password } = obj;
	const found = await user.findOne({
		raw: true,
		where: { email },
		include: { model: role }
	});

	if (!found) {
		return 1;
	} else {
		const isValid = await bcrypt.compare(password, found.password);
		if (isValid) {
			if (!found.confirmed) {
				return 2;
			} else if (!found.active) {
				return 3;
			} else {
				const objUser = {
					userId: found.id,
					email: found.email,
					role: found.roleLibelle
				};
				const refreshToken = getRefreshToken(objUser);
				await user.update({ refreshToken }, { where: { email } });
				return {
					accessToken: getToken(objUser),
					refreshToken
				};
			}
		} else {
			return 4;
		}
	}
};

module.exports = login;
