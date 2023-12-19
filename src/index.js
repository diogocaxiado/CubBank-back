require("dotenv").config();

const express = require("express");
const cors = require("cors");
const roteador = require("./rotas");

const app = express();

app.use(cors());
app.use(express.json());
app.use(roteador);

app.listen(process.env.PORT);
