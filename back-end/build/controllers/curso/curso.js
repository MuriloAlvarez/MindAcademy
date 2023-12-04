"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("../../utils/mysql/mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const curso = express_1.default.Router();
const mysql = new mysql_1.default({
    host: process.env.SQL_LOGIN_HOST,
    user: process.env.SQL_LOGIN_USER,
    password: process.env.SQL_LOGIN_PASSWORD,
    database: process.env.SQL_LOGIN_DATABASE,
});
curso.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield mysql.executeQuery("select * from curso");
    res.json(query);
}));
curso.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = Object(req).params;
    const query = yield mysql.executeQuery("select * from curso where id = ?;", [
        id,
    ]);
    res.json(query);
}));
curso.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const query = yield mysql.executeQuery("insert into curso (nomecurso, materia, professor, descricao) values(?, ?, ?, ?);", [nomecurso, materia, professor, descricao]);
    res.sendStatus(200);
}));
exports.default = curso;
