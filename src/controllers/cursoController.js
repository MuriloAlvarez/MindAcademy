const express = require('express');
const router = express.Router();
const db = require("../db");

exports.get = async (req, res, next) => {
    try {
        const conn = await db.connect();
        const [rows] = await conn.query('SELECT * FROM curso');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.getPorId = async (req, res, next) => {
    try {
        const conn = await db.connect();
        const [rows] = await conn.query('SELECT * FROM curso WHERE id = ?', [req.params.id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Curso não encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.post = async (req, res, next) => {
    try {
        const { nomecurso, materia, professor, descricao } = req.body;
        const conn = await db.connect();
        const sql = 'INSERT INTO curso(nomecurso, materia, professor, descricao) VALUES (?, ?, ?, ?)';
        await conn.query(sql, [nomecurso, materia, professor, descricao]);
        res.status(201).send('Curso criado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.put = async (req, res, next) => {
    try {
        const { nomecurso, materia, professor, descricao } = req.body;
        const conn = await db.connect();
        const sql = 'UPDATE curso SET nomecurso = ?, materia = ?, professor = ?, descricao = ? WHERE id = ?';
        await conn.query(sql, [nomecurso, materia, professor, descricao, req.params.id]);
        res.send('Curso atualizado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};

exports.delete = async (req, res, next) => {
    try {
        const conn = await db.connect();
        await conn.query('DELETE FROM curso WHERE id = ?', [req.params.id]);
        res.send('Curso deletado com sucesso');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor');
    }
};