// const token = req.header('x-auth-token');
// if (!token) return res.sendStatus(401);

// try {
// 	jwt.verify(token, config.get('jwtPrivateKey'));
// 	next();
// } catch (err) {
// 	res.status(401).send('Invalid token.');
// }

// const jwt = require('jsonwebtoken');
// const config = require('config');

// let token = null;
// const thisfunction = async () => {
// 	await jwt.sign({ foo: 'bar' }, config.get('jwtPrivateKey'), { expiresIn: '1day', algorithm: 'HS256' }, (err, theToken) => {
// 		console.log(err, theToken);
// 	});
// 	console.log(token);

// 	// await jwt.verify(token, config.get('jwtPrivateKey'), (err, decoded) => {
// 	// 	if (err) {
// 	// 		console.log('error bro !');
// 	// 	} else {
// 	// 		console.log(decoded);
// 	// 	}
// 	// });
// };

// thisfunction();

// const { getToken, getEmailToken } = require('./utils/bcrypt');

// const obj = { email: 'bouhoutayassine@gmail.com' };

// (myfn = async () => {
// 	console.log('jwt : ', getToken(obj, 'jwtPrivateKey'));
// })();




