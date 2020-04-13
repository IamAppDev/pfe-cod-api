const Sequelize = require('sequelize');
const User = require('./classes/User');
const Role = require('./classes/Role');
const Stock = require('./classes/Stock');
const Abonnement = require('./classes/Abonnement');
const Client = require('./classes/Client');
const Commande = require('./classes/Commande');
const Payement = require('./classes/Payement');
const Source = require('./classes/Source');
const ServiceLivraison = require('./classes/ServiceLivraison');
const Compte = require('./classes/Compte');
const EtatCommande = require('./classes/EtatCommande');
const Message = require('./classes/Message');
const Produit = require('./classes/Produit');
const StockProduit = require('./classes/StockProduit');
const CommandeProduit = require('./classes/CommandeProduit');
const CmdHistorique = require('./classes/CmdHistorique');

const sequelize = new Sequelize('nodejs', 'root', 'none', {
    host: 'localhost',
    dialect: 'mysql'
});

// instantiation
const role = Role(sequelize, Sequelize);
const user = User(sequelize, Sequelize, role);
const stock = Stock(sequelize, Sequelize);
const abonnement = Abonnement(sequelize, Sequelize);
const client = Client(sequelize, Sequelize);
const commande = Commande(sequelize, Sequelize);
const payement = Payement(sequelize, Sequelize);
const source = Source(sequelize, Sequelize);
const serviceLivraison = ServiceLivraison(sequelize, Sequelize);
const compte = Compte(sequelize, Sequelize);
const etatCommande = EtatCommande(sequelize, Sequelize);
const message = Message(sequelize, Sequelize);
const produit = Produit(sequelize, Sequelize);
const stockProduit = StockProduit(sequelize, Sequelize, stock, produit);
const commandeProduit = CommandeProduit(sequelize, Sequelize, commande, produit);
const cmdHistorique = CmdHistorique(sequelize, Sequelize, commande, etatCommande, user);

// association
role.hasMany(user);
user.belongsTo(role);

/*user.belongsTo(stock);
stock.hasOne(user);

user.hasMany(abonnement);
abonnement.belongsTo(user);

user.hasMany(client);
client.belongsTo(user);

payement.hasMany(commande);
commande.hasOne(payement, { constraints: false });*/



// exportation
module.exports.user = user;
module.exports.role = role;
module.exports.stock = stock;
module.exports.abonnement = abonnement;
module.exports.client = client;
module.exports.commande = commande;
module.exports.payement = payement;
module.exports.source = source;
module.exports.serviceLivraison = serviceLivraison;
module.exports.compte = compte;
module.exports.etatCommande = etatCommande;
module.exports.message = message;
module.exports.produit = produit;
module.exports.stockProduit = stockProduit;
module.exports.commandeProduit = commandeProduit;
module.exports.cmdHistorique = cmdHistorique;

module.exports.sequelize = sequelize;