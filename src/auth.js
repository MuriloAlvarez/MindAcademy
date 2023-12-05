const jwt = require("jsonwebtoken");
const express = require('express');
const router = express.Router();

function verificarUsuarioLogado(req, res, next){
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, 'secret-super-secreto', function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      req.userId = decoded.id;
      next();
    });
}

module.exports = verificarUsuarioLogado;