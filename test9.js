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
	orderProduct,
	payment
} = require('./models/index');
const { Op, Model } = require('sequelize');
const { states } = require('./models/enums/states');

(async () => {
	const transaction = await sequelize.transaction();

	try {
		const userId = 4;
		const dmFound = await user.findByPk(4, {
			include: {
				model: payment
			}
		});
		const bossId = dmFound.bossId;
		const ref = '66734623542768';
		const p = await payment.create({
			userId,
			receiver: bossId,
			ref
		});

		// const result = await order.findByPk('2c1cdd5d-f3b5-46ca-b348-b818ab7efbbc');

		await order.update(
			{
				paymentId: p.id
			},
			{
				where: {
					id: {
						[Op.or]: ['b326dd3f-e4bb-4ad5-87a6-3708fdbc42a8', 'de3f5383-a381-4b53-b67e-a6fbb5daf1f9']
					}
				}
			}
		);

		// result.createPayment(p);
		// order.paymentId = p.id;
		// order.save();

		// console.log(result);

		transaction.commit();
	} catch (err) {
		transaction.rollback();
		console.log(err);
	}

	//
})();
