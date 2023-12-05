const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');
const verificarUsuarioLogado = require("../auth.js");

router.get('/', verificarUsuarioLogado, controller.get);
router.get('/:id', verificarUsuarioLogado, controller.getPorId);
router.post('/', verificarUsuarioLogado, controller.post);
router.put('/:id', verificarUsuarioLogado, controller.put);
router.delete('/:id', verificarUsuarioLogado, controller.delete);

module.exports = router;
