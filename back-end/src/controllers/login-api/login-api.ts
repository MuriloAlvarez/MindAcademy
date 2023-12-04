import express from "express";
import Mysql from "../../utils/mysql/mysql";
import * as CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

const loginApi = express.Router();

const mysql = new Mysql({
  host: process.env.SQL_LOGIN_HOST!,
  user: process.env.SQL_LOGIN_USER!,
  password: process.env.SQL_LOGIN_PASSWORD!,
  database: process.env.SQL_LOGIN_DATABASE!,
});

loginApi.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || username.length === 0) {
    res.status(400).json({
      label: "username",
      message: "Por favor, adicione um usuário válido.",
    });

    return;
  }

  if (!password || password.length === 0) {
    res.status(400).json({
      label: "password",
      message: "Por favor, adicione uma senha válida.",
    });

    return;
  }

  const h_username = CryptoJS.SHA512(username).toString(CryptoJS.enc.Hex);
  const h_password = CryptoJS.SHA512(password).toString(CryptoJS.enc.Hex);

  const query = await mysql.executeQuery(
    "SELECT id FROM admins WHERE username = ? AND password = ?;",
    [h_username, h_password]
  );

  if (query.length !== 1) {
    res.status(400).json({
      label: "password",
      message: "Por favor, verifique se o usuário ou senha estão corretos.",
    });

    return;
  }

  const randomBytes = CryptoJS.lib.WordArray.random(20);
  const randomString = CryptoJS.enc.Hex.stringify(randomBytes);

  await mysql.executeQuery(
    "INSERT INTO admins_session (id, token) VALUES (?, ?);",
    [query[0]!.id, randomString]
  );

  res.cookie("auth", randomString);
  res.sendStatus(200);
});

export default loginApi;
