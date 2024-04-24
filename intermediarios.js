function logarRequisicao(req,res,next){
     console.log(req.method, req.url);
     next();
}

function travaDeSenha(req,res,next){
    if (req.method === "GET" || req.query.senha === "12345") {
      next();
    } else {
      res.status(401);
      res.json({ error: "Acesso não autorizado" });
    }
}

module.exports = {logarRequisicao,travaDeSenha}