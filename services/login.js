const {utilisateur, role} = require('../models/index');
const {getToken} = require('../utils/bcrypt');
const bcrypt = require('bcrypt');



const login =  async (obj) => {

    const found = await utilisateur.findOne({
        raw: true,
        where : { email: obj.email },
        include: { model: role}
    });

    if( !found ){
        return 1;
    } else {
        const isValid = await bcrypt.compare(obj.motdepasse, found.motdepasse);
        if( isValid ){
            if( !found.confirme ){
                return 2;
            } else if( !found.active ) {
                return 3;
            } else {
                const objUser = {
                    email: found.email,
                    id: found.id,
                    role: found['role.libelle']
                };
                return getToken(objUser);
            }
        } else {
            return 4;
        }
    }

};

module.exports = login;