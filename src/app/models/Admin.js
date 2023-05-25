const mongoose = require('../../database/index.js');

//Cria um Schema para os usuários 
const UserAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true,
        lowercase: true 
    },
    password: {
        type: String,
        require: true,
        //select serve para que a senha do usuário não seja retornada ao obtermos as informações dos usuários
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

//Cria o model para o usuário
const UserAdmin = mongoose.model('UserAdmin',UserAdminSchema);

module.exports = UserAdmin;