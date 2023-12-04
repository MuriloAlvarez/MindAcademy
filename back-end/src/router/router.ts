import express from "express";
import loginApi from "../controllers/login-api/login-api";
import curso from "../controllers/curso/curso";

const router = express.Router();

router.use("/login", loginApi)
router.use("/curso", curso)

export default router;
