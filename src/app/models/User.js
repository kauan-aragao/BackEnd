const mongoose = require('../../database/index.js');

//Cria um Schema para os usuários 
const UserSchema = new mongoose.Schema({
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
    cpf: {
        type: String,
        require: true,
        select: false,
        unique: true
    },
    rg : {
        type: String,
        require: true,
        select: false,
        unique:true
    },
    phone: {
        type: String,
        require: true,
        select: false
    },
    cep: {
        type: String,
        require: true,
        select: false
    },
    street:{
        type: String,
        require:true,
        select: false
    },
    city: {
        type: String,
        require: true,
        select: false
    },
    state: {
        type:String,
        require:true,
        select:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

//Cria o model para o usuário
const User = mongoose.model('User',UserSchema);

module.exports = User;