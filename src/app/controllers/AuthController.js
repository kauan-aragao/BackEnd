const express = require('express')
const User = require('../models/User')
const Admin = require('../models/Admin');
const authConfig = require('../../config/auth.json');
const jwt = require('jsonwebtoken');

//Utilizado para nichar as rotas e organizar melhor
const router = express.Router();

function generateToken(params){
    return jwt.sign(params,authConfig.secret,{
        expiresIn: 86400
    })
}

router.post('/register',async (req,res)=>{
    try{
        const { name,email,password,cpf,rg,phone,cep,street,sity,state } = req.body;

        //Verifica se já existe cadastro com esse email
        if(await User.findOne({email})){
            return res.status(400).send({error:'User already exists' })
        }

        //Cria um usuário para quem está se registrando
        const user = await User.create(req.body)

        //Protege a senha do usuário, não retornando ela 
        return res.send(`Hey ${user.name.split(' ')[0]},you're registered in our plataform,enjoy it!`)
    }
    catch(err){
        return res.status(400).send({error: 'Registration failed'})
    }

});

//Rota para verificar se o usuário está autenticado
router.post('/authenticate', async (req,res)=>{
    try{
        const { email,password } = req.body

        //Busca um usuário com o email e senha dados no post
        const user = await User.findOne({email}).select('+password')
        if(!user){
            res.status(400).send({error: 'User not found'})
        }

        //Analisa se a senha dada no post é a mesma da armazenada no usuário
        if(user.password !== password){
            return res.status(400).send({error: 'Email or Password incorrects '})
        }
        
        res.status(200).send(`Hey ${user.name.split(' ')[0]},you're authenticated in our plataform!`);
    }
    catch(err){
        return res.status(400).send({error: 'Authentication failed'})
    }
});

router.post('/admin', async (req,res)=>{
    try{
        const { email,password } = req.body;
        const userAdmin =  await Admin.findOne({email}).select('+password');

        if(!userAdmin){
            return res.status(400).send({error: 'This User does not exists in the userAdmin page.'});
        }
        if(userAdmin.password !== password){
            return res.status(400).send({error: 'Email or Password incorrects'});
        }
        
        return res.status(200).send({
            userAdmin,
            token:generateToken({id: userAdmin.id})
        });

    }
    catch(err){
        return res.status(400).send({error: 'Authentication in Admin page failed'});
    }
    })

//Exporta a rota criado nesse controller 
module.exports = router;