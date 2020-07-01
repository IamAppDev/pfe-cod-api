const {
	source,
	customer,
	orderState,
	order,
	user,
	sequelize,
	stock,
	product,
	orderHistory,
	stockProduct,
	orderProduct
} = require('./models/index');
const { Op } = require('sequelize');
const { states } = require('./models/enums/states');
const Joi = require('joi');
const https = require('https');
const fetch = require('node-fetch');

(go = async () => {
	const url = 'https://tracking.baridserv.com/api/results/tracking/' + 'AD309353649MA';

	let result = await fetch(url).then((res) => res.json()); // expecting a json response
	result = result.replace(/<\/.*>/g, '');
	result = result.replace(/<.*>/g, '');
	result = JSON.parse(result);
})();
