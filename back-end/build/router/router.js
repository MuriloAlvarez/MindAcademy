"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_api_1 = __importDefault(require("../controllers/login-api/login-api"));
const curso_1 = __importDefault(require("../controllers/curso/curso"));
const router = express_1.default.Router();
router.use("/login", login_api_1.default);
router.use("/curso", curso_1.default);
exports.default = router;
