const mongoose = require('mongoose');

//Se conecta com o banco de dados Mongo
mongoose.connect('mongodb://localhost:27017/BackEnd');

module.exports = mongoose;