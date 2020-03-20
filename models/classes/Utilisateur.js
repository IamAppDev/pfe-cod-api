const {villes} = require('../enums/villes');

module.exports = (sequelize, DataTypes) => {

    const Utilisateur = sequelize.define('utilisateur', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        nom: {
            type: DataTypes.STRING
        },
        prenom: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate : {
                isEmail: true
            }
        },
        motdepasse: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ville: {
            type: DataTypes.ENUM,
            values: villes
        },
        telephone: {
            type: DataTypes.STRING
        },
        cin:{
            type: DataTypes.STRING
        },
        accessToken: {
            type: DataTypes.STRING
        },
        notifToken: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true
    });

    return Utilisateur;
};

/*
{
        instanceMethods: {
            hashPassword: async function() {
                //const salt = await bcrypt.genSalt(10);
                //this.motdepasse = await bcrypt.hash(this.motdepasse, salt);
                console.log('-----------------------------------------hello !!!');
            }
        },
        classMethods: {
            generateAuthToken: function() {
                const token = jwt.sign({ email: this.email }, config.get('jwtPrivateKey'));
                return token;
            }
        }
*/