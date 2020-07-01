const Sequelize = require('sequelize');
const User = require('./classes/User');
const Role = require('./classes/Role');
const Stock = require('./classes/Stock');
const Subscription = require('./classes/Subscription');
const Customer = require('./classes/Customer');
const Order = require('./classes/Order');
const Payment = require('./classes/Payment');
const Source = require('./classes/Source');
const DeliveryService = require('./classes/DeliveryService');
const Account = require('./classes/Account');
const OrderState = require('./classes/OrderState');
const Message = require('./classes/Message');
const Product = require('./classes/Product');
const StockProduct = require('./classes/StockProduct');
const OrderProduct = require('./classes/OrderProduct');
const OrderHistory = require('./classes/OrderHistory');

const sequelize = new Sequelize('nodejs', 'root', 'none', {
	host: 'localhost',
	dialect: 'mysql'
});

// instantiation
const role = Role(sequelize, Sequelize);
const user = User(sequelize, Sequelize, role);
const stock = Stock(sequelize, Sequelize);
const subscription = Subscription(sequelize, Sequelize);
const customer = Customer(sequelize, Sequelize);
const order = Order(sequelize, Sequelize);
const payment = Payment(sequelize, Sequelize);
const source = Source(sequelize, Sequelize);
const deliveryService = DeliveryService(sequelize, Sequelize);
const account = Account(sequelize, Sequelize);
const orderState = OrderState(sequelize, Sequelize);
const message = Message(sequelize, Sequelize);
const product = Product(sequelize, Sequelize);
const stockProduct = StockProduct(sequelize, Sequelize, stock, product);
const orderProduct = OrderProduct(sequelize, Sequelize, order, product);
const orderHistory = OrderHistory(sequelize, Sequelize, order, orderState, user);

// association
role.hasMany(user);
user.belongsTo(role);

user.hasOne(user, { as: 'boss', foreignKey: 'bossId', useJunctionTable: false });

user.hasMany(customer);
customer.belongsTo(user);

// user.hasMany(payment, { foreignKey: 'sender' });
// user.hasMany(payment, { foreignKey: 'receiver' });
user.hasMany(payment);
payment.belongsTo(user);

user.hasMany(subscription);
subscription.belongsTo(user);

source.hasMany(order);
order.belongsTo(source);

user.hasMany(source);
source.belongsTo(user);

payment.hasMany(order);
order.belongsTo(payment);

stock.hasOne(user);
user.belongsTo(stock);

product.belongsToMany(stock, { through: 'stockProduct' });
stock.belongsToMany(product, { through: 'stockProduct' });

customer.hasMany(order);
order.belongsTo(customer);

user.belongsToMany(order, { through: { model: orderHistory, unique: false } });
order.belongsToMany(user, { through: { model: orderHistory, unique: false } });
user.hasMany(orderHistory);
orderHistory.belongsTo(user);
order.hasMany(orderHistory);
orderHistory.belongsTo(order);

product.belongsToMany(order, { through: { model: orderProduct, unique: false } });
order.belongsToMany(product, { through: { model: orderProduct, unique: false } });
product.hasMany(orderProduct);
orderProduct.belongsTo(product);
order.hasMany(orderProduct);
orderProduct.belongsTo(order);

// exportation
module.exports.user = user;
module.exports.role = role;
module.exports.stock = stock;
module.exports.subscription = subscription;
module.exports.customer = customer;
module.exports.order = order;
module.exports.payment = payment;
module.exports.source = source;
module.exports.deliveryService = deliveryService;
module.exports.account = account;
module.exports.orderState = orderState;
module.exports.message = message;
module.exports.product = product;
module.exports.stockProduct = stockProduct;
module.exports.orderProduct = orderProduct;
module.exports.orderHistory = orderHistory;

module.exports.sequelize = sequelize;
