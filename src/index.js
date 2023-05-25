//Configurações iniciais do projeto
const express = require('express');
const UserRouter = require('./app/controllers/AuthController.js');
const AdminRouter = require('./app/controllers/AdminController.js');

//Inicialização do express 
const app = express();

//Permite o entendimento de arquivos enviados em json da aplicação
app.use(express.json());
//Permite o entendimento de arquivos enviados na url da aplicação
app.use(express.urlencoded({extended: false}));

//Redireciona o usuário para a página de autenticação
app.get('/',(req,res)=>{
    res.redirect('/auth/authenticate');
});
//Cria uma ramificação das rotas para '/auth' 
app.use('/auth',UserRouter);
app.use('/admin',AdminRouter);

//Porta em que o servidor está rodando
app.listen(3000);