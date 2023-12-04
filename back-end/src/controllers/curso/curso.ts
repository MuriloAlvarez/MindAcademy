import express from "express";
import Mysql from "../../utils/mysql/mysql";
import dotenv from "dotenv";

dotenv.config();

const curso = express.Router();

const mysql = new Mysql({
  host: process.env.SQL_LOGIN_HOST!,
  user: process.env.SQL_LOGIN_USER!,
  password: process.env.SQL_LOGIN_PASSWORD!,
  database: process.env.SQL_LOGIN_DATABASE!,
});

curso.get("/", async (req, res) => {
  const query = await mysql.executeQuery("select * from curso");
  res.json(query);
});

curso.get("/:id", async (req, res) => {
  const { id } = Object(req).params;
  const query = await mysql.executeQuery("select * from curso where id = ?;", [
    id,
  ]);
  res.json(query);
});

curso.post("/", async (req, res) => {
  const { nomecurso, materia, professor, descricao } = req.body;

  if (!nomecurso || nomecurso.length === 0 || nomecurso.length > 30) {
    res.status(400).json({
      label: "nomecurso",
      message: "Nome extenso, máximo 30 caracteres",
    });

    return;
  }

  if (!materia || materia.length === 0 || materia.length > 20) {
    res.status(400).json({
      label: "materia",
      message: "Nome extenso, máximo 20 caracteres",
    });

    return;
  }

  if (!professor || professor.length === 0 || professor.length > 20) {
    res.status(400).json({
      label: "materia",
      message: "Nome extenso, máximo 20 caracteres",
    });

    return;
  }
  if (!descricao || descricao.length === 0 || descricao.length > 80) {
    res.status(400).json({
      label: "descricao",
      message: "Nome extenso, máximo 80 caracteres",
    });

    return;
  }

  const query = await mysql.executeQuery(
    "insert into curso (nomecurso, materia, professor, descricao) values(?, ?, ?, ?);",
    [nomecurso, materia, professor, descricao]
  );

  res.sendStatus(200);
});

export default curso;
