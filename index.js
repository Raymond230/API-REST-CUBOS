const express = require("express");
const roteador = require("./routes");
const { method } = require("lodash");
const listaDeIntrutores = require("./dados/instrutores");
const {logarRequisicao,travaDeSenha} = require('./intermediarios')
const app = express();
app.use(express.json());


app.use(logarRequisicao);
app.use(travaDeSenha);


app.use(roteador);
app.listen(8000);
