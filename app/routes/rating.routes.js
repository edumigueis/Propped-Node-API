module.exports = app => {
    const rating = require("../controllers/Rating.controller.js");
  
    // Cria um novo aluno
    app.post("/rating", rating.create);
  
    // Pega todos os alunos na tabela
    app.get("/rating", rating.findAll);
  
    // Pega só um aluno da tabela
    app.get("/rating/:id", rating.findOne);
  
    // Altera todos os alunos da tabela
    app.put("/rating/:id", rating.update);
  
    // Deleta os alunos com ra
    app.delete("/rating/:id", rating.delete);
  
    // Deleta todas as disciplinas
    app.delete("/rating", rating.deleteAll);
  };