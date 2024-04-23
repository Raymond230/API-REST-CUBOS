const express = require('express')
const controllers = require("./controllers/instrutores");
const roteador = express()

roteador.get("/instrutores", controllers.consultarTodosOsInstrutores);

roteador.get("/instrutores/:idConsultado", controllers.consultarUmInstrutor);

roteador.post("/instrutores", controllers.adicionarUmInstrutor);

roteador.patch("/instrutores/:idConsultado", controllers.editarInstrutor);

roteador.put("/instrutores/:idConcultado", controllers.substituiInstrutor);

roteador.delete("/instrutores/:idConsultado", controllers.deletarInstrutor);

module.exports = roteador
