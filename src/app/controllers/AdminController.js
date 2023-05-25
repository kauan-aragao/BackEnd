const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth.js');

//Utilizado para nichar as rotas e organizar melhor
const router = express.Router();

router.use(authMiddleware);

//Retorna todos os usuários se estiver logado na página de Admin.
router.get('/users', async (req,res)=>{
    const users =  await User.find()
    .select('+password')
    .select('+cpf')
    .select('+rg')
    .select('+cep')
    .select('+street')
    .select('+city')
    .select('+state')

    res.send(users);
});

//Procura e retorna usuário cadastrado por email.
router.get('/users/:email', async (req,res) =>{
    const { email }  = req.params;
    
    const user = await User.findOne({email})
    .select('+password')
    .select('+cpf')
    .select('+rg')
    .select('+cep')
    .select('+street')
    .select('+city')
    .select('+state');
    if(!user){
        return res.status(400).send({error: 'User not found'});
    }

    res.send(user);
});

//Deleta um usuário cadastrado por email.
router.delete('/users/:email', async (req,res) => {
    const { email } = req.params;
    const user = await User.findOne({ email });
    
    if(!user){
        return res.status(400).send({error: 'User not found'});
    }
    await User.findByIdAndDelete(user.id);

    res.status(200).send('User was successfully deleted !')
    
});

//Exporta a rota criado nesse controller 
module.exports = router;