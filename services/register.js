const {utilisateur} = require('../models/index');
const {getHashPassword, getToken, getEmailToken} = require('../utils/bcrypt');
const {roles} = require('../models/enums/roles');
const sendEmail = require('../utils/sendEmail');

const register = async (obj) => {

    const found = await utilisateur.findOne({  where: { email: obj.email }});

    if( !found ){
        const hashed = await getHashPassword(obj.motdepasse);
        return await utilisateur.create({
            nom: obj.nom,
            prenom: obj.prenom, 
            email: obj.email, 
            motdepasse: hashed,
            roleId: roles.indexOf('ROLE_ADMIN') + 1
        })
        .then((res) => {
            // role.findAll({include: utilisateur}).then(res => console.log(res));
            // console.log(res);
            res = res.toJSON();
            // getToken({ email: res.email, ura: roles.indexOf('ROLE_ADMIN') + 1 });
            const emailToken = getEmailToken({email: res.email, id: res.id});
            sendEmail(res.email, `http://localhost:3000/confirmation/${emailToken}`);
            return;
        })
        .catch((err) =>{
            //console.log(err);
            return new Error('500');
        });
    } else {
        return new Error('400');
    }
};

module.exports = register;