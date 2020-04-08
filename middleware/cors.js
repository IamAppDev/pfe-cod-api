const cors = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.setHeader('Access-Control-Allow-Headers', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE');
	next();
};

module.exports = cors;
