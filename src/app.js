const express = require('express');
const cors = require('cors');

const app = express();
const router = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Rotas
const index = require('./routes/index');
const cursoRoute = require('./routes/cursoRoute');
const autenticacaoRoute = require('./routes/autenticacaoRoute');
const usuarioRoute = require('./routes/usuarioRoute');
app.use('/', index);
app.use('/curso', cursoRoute);
app.use('/autenticacao', autenticacaoRoute);
app.use('/usuarios', usuarioRoute);

module.exports = app;