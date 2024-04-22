const express = require("express");

const app = express();

app.use(express.json());

const listaDeIntrutores = [
  {
    id: 1,
    nome: "guido",
    idade: 27,
    formacao: "Full-stack",
  },
  {
    id: 2,
    nome: "maria",
    idade: 17,
    formacao: "Full-stack",
  },
  {
    id: 3,
    nome: "junior",
    idade: 22,
    formacao: "Full-stack",
  },
  {
    id: 4,
    nome: "felipe",
    idade: 20,
    formacao: "Full-stack",
  },
];

app.get('/instrutores',(req,res)=>{
  res.json(listaDeIntrutores)
})

app.get('/instrutores/:idConsultado',(req,res)=>{

  const instrutor = listaDeIntrutores.find(
    (instrutor) => instrutor.id === Number(req.params.idConsultado)
  );
  res.json(instrutor)
})

let proximoId = 5
app.post('/instrutores',(req,res)=>{

  const {nome, idade, formacao} = req.body

  res.json({nome,idade,formacao})

    const novoInstrutor = ({
    id:proximoId,
    nome,
    idade,
    formacao
  })
  listaDeIntrutores.push(novoInstrutor)
  proximoId += 1

  res.json(novoInstrutor)
})

app.patch('/instrutores/:idConsultado',(req,res)=>{
  
  const instrutor = listaDeIntrutores.find((instrutor) => instrutor.id === Number(req.params.idConsultado))

  const { nome, idade, formacao } = req.body;

  if(nome !== undefined){
    instrutor.nome = nome
  }
  if (idade !== undefined) {
    instrutor.idade = idade;
  }
  if (formacao !== undefined) {
    instrutor.nome = formacao;
  }
  res.json(instrutor)
})


app.listen(8000);
