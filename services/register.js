const {utilisateur} = require('../models/index');
const {getHashPassword, getToken} = require('../utils/bcrypt');

const register = async (obj) => {

    const found = await utilisateur.findOne({  where: { email: obj.email }});

    if( !found ){
        //const salt = await bcrypt.genSalt(10);
        //const hashed = await bcrypt.hash(obj.motdepasse, salt);
        const hashed = await getHashPassword(obj.motdepasse);
        return await utilisateur.create({
            nom: obj.nom,
            prenom: obj.prenom, 
            email: obj.email, 
            motdepasse: hashed, 
            ville: obj.ville,
            telephone: obj.telephone, 
            cin: obj.cin
        })
        .then((res) => {
            res = res.toJSON();
            return getToken({ email: res.email });
        })
        .catch(() => new Error('500'));
    } else {
        return new Error('400');
    }
};

module.exports = register;