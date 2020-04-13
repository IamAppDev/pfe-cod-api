const cors = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.setHeader('Access-Control-Allow-Headers', '*, x-auth-token, x-refresh-token');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
	res.setHeader('Access-Control-Expose-Headers', 'x-auth-token, x-refresh-token');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
};

module.exports = cors;
