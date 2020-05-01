const { customer, order, user, sequelize, stock, product, stockProduct } = require('./models/index');
const { Op } = require('sequelize');

(go = async () => {
	const bossId = 1;

	try {
		const userList = await user.findAll({
			where: {
				[Op.or]: [
					{
						bossId,
						roleLibelle: 'ROLE_DELIVERYMAN'
					},
					{ id: bossId }
				]
			},
			include: [
				{
					model: stock,
					raw: true,
					include: {
						model: product,
						raw: true
					}
				}
			],
			raw: true
		});

		let productList = userList
			.filter((user) => !user.bossId)
			.map((user) => {
				if (user['stock.products.id']) {
					return {
						id: user['stock.products.id'],
						name: user['stock.products.name'],
						price: user['stock.products.price'],
						weight: user['stock.products.weight'],
						size: user['stock.products.size'],
						color: user['stock.products.color'],
						quantity: user['stock.products.stockProduct.quantity'],
						category: user['stock.products.category'],
						createdAt: user['stock.products.createdAt']
					};
				}
			});

		if (productList.length === 1 && !productList.length[0]) {
			productList = [];
		}

		let cpt = -1;
		const usersStock = [];
		userList.forEach((user) => {
			if (user.bossId) {
				if (cpt !== user.id) {
					usersStock.push({
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						city: user.city,
						productList: user['stock.products.id']
							? [
									{
										id: user['stock.products.id'],
										name: user['stock.products.name'],
										quantity: user['stock.products.stockProduct.quantity']
									}
							  ]
							: []
					});
				} else {
					usersStock[usersStock.length - 1].productList.push(
						user['stock.products.id']
							? {
									id: user['stock.products.id'],
									name: user['stock.products.name'],
									quantity: user['stock.products.stockProduct.quantity']
							  }
							: null
					);
				}
			}
			cpt = user.id;
		});

		// for pagination only
		// const count = productList.length;
		// if (!(offset === 0 && limit === 0)) {
		// 	productList = productList.slice(offset, limit + offset);
		// }
    //
    for (let product of productList){
      let theStock = [];
      for ( let userStock of usersStock ){
        const quantityObj = userStock.productList.find((p) => p.id === product.id);
        theStock.push({
					id: userStock.id,
					firstName: userStock.firstName,
					lastName: userStock.lastName,
					city: userStock.city,
					quantity: quantityObj ? quantityObj.quantity : 0
				});
      }
      product.theStock = theStock;
      // console.log(theStock);
    }

    console.log();

		const final =  {
			// count,
			productList,
			usersStock
    };
    
	} catch (err) {
    console.log(err);
	}
})();
