"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const CryptoJS = __importStar(require("crypto-js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loginApi = express_1.default.Router();
const mysql = new mysql_1.default({
    host: process.env.SQL_LOGIN_HOST,
    user: process.env.SQL_LOGIN_USER,
    password: process.env.SQL_LOGIN_PASSWORD,
    database: process.env.SQL_LOGIN_DATABASE,
});
loginApi.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const query = yield mysql.executeQuery("SELECT id FROM usuarios WHERE username = ? AND password = ?;", [h_username, h_password]);
    if (query.length !== 1) {
        res.status(400).json({
            label: "password",
            message: "Por favor, verifique se o usuário ou senha estão corretos.",
        });
        return;
    }
    const randomBytes = CryptoJS.lib.WordArray.random(20);
    const randomString = CryptoJS.enc.Hex.stringify(randomBytes);
    yield mysql.executeQuery("INSERT INTO usuarios_session (id, token) VALUES (?, ?);", [query[0].id, randomString]);
    res.cookie("auth", randomString);
    res.sendStatus(200);

    res.sendFile(path.join(__dirname, '../../../../Front-end/Cadastro/index.html'));
    return;
}));
exports.default = loginApi;
