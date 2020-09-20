module.exports = app => {
    const stores = require("../controllers/Stores.controller.js");
  
    // Cria um novo aluno
    app.post("/stores", stores.create);
  
    // Pega todos os alunos na tabela
    app.get("/stores", stores.findAll);
  
    // Pega só um aluno da tabela
    app.get("/stores/:id", stores.findOne);
  
    // Altera todos os alunos da tabela
    app.put("/stores/:id", stores.update);
  
    // Deleta os alunos com ra
    app.delete("/stores/:id", stores.delete);
  
    // Deleta todas as disciplinas
    app.delete("/stores", stores.deleteAll);
  };