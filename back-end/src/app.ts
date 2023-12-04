import express from "express";
import bodyParser from "body-parser";
import router from "./router/router";
import cors from "cors";
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", router);

const port = 2003;
app.listen(port, () => {
  console.clear();
  console.log(`http://localhost:${port}`);
});