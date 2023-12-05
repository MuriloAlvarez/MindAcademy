const express = require('express');
const router = express.Router();
const db = require("../db");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.get = async (req, res, next) => {
    try {
        const conn = await db.connect();
        const [rows] = await conn.query('SELECT id, username FROM usuarios');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.getPorId = async (req, res, next) => {
    try {
        const conn = await db.connect();
        const [rows] = await conn.query('SELECT id, username FROM usuarios WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Usuário não encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.post = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const conn = await db.connect();
        const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?)';
        await conn.query(sql, [username, hashedPassword]);
        res.status(201).send('Usuário criado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.put = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const conn = await db.connect();
        const sql = 'UPDATE usuarios SET username = ?, password = ? WHERE id = ?';
        await conn.query(sql, [username, hashedPassword, req.params.id]);
        res.send('Usuário atualizado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.delete = async (req, res, next) => {
    try {
        const conn = await db.connect();
        await conn.query('DELETE FROM usuarios WHERE id = ?', [req.params.id]);
        res.send('Usuário deletado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};