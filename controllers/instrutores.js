const listaDeIntrutores = require("../dados/instrutores");

const areasDeAtuacao = [
  "Logica",
  "Back-end",
  "Full-stack",
  "front-end",
  "Flutter",
  "Soft-Skills",
  "UI/UX"
]

function consultarTodosOsInstrutores(req,res){
    res.json(listaDeIntrutores);
}

function consultarUmInstrutor(req,res){
    const instrutor = listaDeIntrutores.find(
      (instrutor) => instrutor.id === Number(req.params.idConsultado)
    );
    if(!instrutor){
      res.status(404)
      res.json({erro:"Instrutor Não existe"})
      return
    }
    res.json(instrutor);
}

let proximoId = 5;

function validarInstrutor(instrutor){
  if(!instrutor.nome){
    return "O campo 'Nome' é obrigatório"
  }
  if (!instrutor.idade) {
     return "O campo 'Idade' é obrigatório";
  }
  if (!instrutor.formacao) {
    return "O campo 'Formação' é obrigatório";
  }
   if (typeof instrutor.nome !== "string") {
     return "Informação Invalida";
   }
   if (typeof instrutor.idade !== "number") {
    return "Informação Invalida";
   }
   if (typeof instrutor.formacao !== "string") {
     return "Informação Invalida";
   }
      if (instrutor.idade < 18) {
       return "Informação Invalida";
      }

      if (!areasDeAtuacao.includes(instrutor.formacao)) {
        return "Informação Invalida"
      }
}

function adicionarUmInstrutor(req,res){
    const { nome, idade, formacao } = req.body;
    const erro = validarInstrutor(req.body)

    if(erro){
      res.status(400)
      res.json({erro})
      return
    }
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

    if (!instrutor) {
      res.status(404);
      res.json({ erro: "Instrutor Não existe" });
      return;
    }

    const erro = validarInstrutor({
      nome: req.body.nome ?? instrutor.nome,
      idade: req.body.idade ?? instrutor.idade,
      formacao: req.body.formacao ?? instrutor.formacao
    });

    if (erro) {
      res.status(400);
      res.json({ erro });
      return;
    }

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
  const erro = validarInstrutor(req.body)

   if (erro) {
     res.status(400);
     res.json({ erro });
     return;
   }  

   if(req.body.id === Number(req.params.idConsultado)){
     res.status(400);
     res.json({ erro: "Erro o campo id deve ser igual na rota e no corpo da requisição"});
     return;
   }
  
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
     if (!instrutor) {
       res.status(404);
       res.json({ erro: "Instrutor Não existe" });
       return;
     }
     const indice = listaDeIntrutores.indexOf(instrutor);

     listaDeIntrutores.slice(indice, 1);

     res.json(instrutor);
}
module.exports = {consultarTodosOsInstrutores, consultarUmInstrutor,
adicionarUmInstrutor,
editarInstrutor,
substituiInstrutor,
deletarInstrutor}