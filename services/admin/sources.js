const { user, source, order, sequelize } = require('../../models/index');
const { Op } = require('sequelize');

const getAll = async (userId, offset, limit, orderBy, orderDirection, filtersObj) => {
	const order = orderBy && orderDirection ? [[orderBy, orderDirection]] : [];
	let filters = {};
	if (filtersObj) {
		try {
			filtersObj = filtersObj.map((e) => JSON.parse(e));
			for (let filter of filtersObj) {
				filters[filter.field] = {
					[Op.like]: `%${filter.value}%`
				};
			}
		} catch (ex) {}
	}

	const allSources = await source.findAndCountAll({
		offset,
		limit,
		order,
		where: filters,
		include: [
			{
				model: user,
				where: {
					id: userId
				}
			}
		]
	});

	return {
		count: allSources.count,
		rows: allSources.rows
	};
};

const add = async (src, userId) => {
	const userInstance = await user.findByPk(userId, {
		include: [
			{
				model: source
			}
		]
	});
	const found = userInstance.sources.filter((s) => s.name === src.name);
	if (found.length >= 1) {
		return 2;
	} else {
		return await userInstance
			.createSource(src)
			.then(() => {
				return 1;
			})
			.catch(() => {
				return 3;
			});
	}
};

const update = async (src, userId) => {
	const userInstance = await user.findByPk(userId, {
		include: [
			{
				model: source
			}
		]
	});
	const found = userInstance.sources.filter((s) => s.name === src.name && s.id !== src.id);
	if (found.length >= 1) {
		return 2;
	} else {
		let sourceInstance = userInstance.sources.filter((s) => s.id === src.id)[0];
		sourceInstance.name = src.name;
		sourceInstance.type = src.type;
		return await sourceInstance
			.save()
			.then(() => {
				return 1;
			})
			.catch(() => {
				return 3;
			});
	}
};

const del = async (srcId) => {
	const found = await source.findByPk(srcId, {
		include: [
			{
				model: user
			},
			{
				model: order
			}
		]
	});

	if (found.orders.length > 0) {
		return 2;
	}

	return await source
		.destroy({ where: { id: srcId } })
		.then(() => {
			return 1;
		})
		.catch(() => {
			return 3;
		});
};

module.exports.getAll = getAll;
module.exports.add = add;
module.exports.update = update;
module.exports.del = del;
