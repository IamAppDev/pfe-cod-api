const {utilisateur} = require('../models/index');
const {getHashPassword, getToken} = require('../utils/bcrypt');
const bcrypt = require('bcrypt');

const login =  async (obj) => {

    const found = await utilisateur.findOne({ where : { email: obj.email }});

    if( !found ){
        return false;
    } else {
        const isValid = await bcrypt.compare(obj.motdepasse, found.motdepasse);
        return isValid ? true : false;
    }

};

module.exports = login;