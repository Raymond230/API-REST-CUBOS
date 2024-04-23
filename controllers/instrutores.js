const listaDeIntrutores = require("../dados/instrutores");

function consultarTodosOsInstrutores(req,res){
    res.json(listaDeIntrutores);
}

function consultarUmInstrutor(req,res){
    const instrutor = listaDeIntrutores.find(
      (instrutor) => instrutor.id === Number(req.params.idConsultado)
    );
    res.json(instrutor);
}

let proximoId = 5;

function adicionarUmInstrutor(req,res){
    const { nome, idade, formacao } = req.body;

    res.json({ nome, idade, formacao });

    const novoInstrutor = {
      id: proximoId,
      nome,
      idade,
      formacao,
    };
    listaDeIntrutores.push(novoInstrutor);
    proximoId += 1;

    res.json(novoInstrutor);
}

function editarInstrutor(req,res){
    const instrutor = listaDeIntrutores.find(
      (instrutor) => instrutor.id === Number(req.params.idConsultado)
    );

    const { nome, idade, formacao } = req.body;

    if (nome !== undefined) {
      instrutor.nome = nome;
    }
    if (idade !== undefined) {
      instrutor.idade = idade;
    }
    if (formacao !== undefined) {
      instrutor.formacao = formacao;
    }
    res.json(instrutor);
}
function substituiInstrutor(req, res){
    const instrutor = listaDeIntrutores.find(
      (instrutor) => instrutor.id === Number(req.params.idConsultado)
    );

    if (instrutor) {
      instrutor.nome = req.body.nome;
      instrutor.idade = req.body.idade;
      instrutor.formacao = req.body.formacao;
      res.json(instrutor);
    } else {
      const novoInstrutor = req.body;
      listaDeIntrutores.push(novoInstrutor);
      res.json(novoInstrutor);
    }
}
function deletarInstrutor(req,res){
     const instrutor = listaDeIntrutores.find(
       (instrutor) => instrutor.id === Number(req.params.idConsultado)
     );
     const indice = listaDeIntrutores.indexOf(instrutor);

     listaDeIntrutores.slice(indice, 1);

     res.json(instrutor);
}
module.exports = {consultarTodosOsInstrutores, consultarUmInstrutor,
adicionarUmInstrutor,
editarInstrutor,
substituiInstrutor,
deletarInstrutor}