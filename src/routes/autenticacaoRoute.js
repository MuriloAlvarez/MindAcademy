const express = require('express');
const router = express.Router();
const controller = require('../controllers/autenticacaoController')

router.post('/login', controller.AutenticarUsuario);

module.exports = router;