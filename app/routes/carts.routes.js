module.exports = app => {
    const carts = require("../controllers/Carts.controller.js");
  
    // Cria um novo aluno
    app.post("/carts", carts.create);
  
    // Pega todos os alunos na tabela
    app.get("/carts", carts.findAll);
  
    // Pega só um aluno da tabela
    app.get("/carts/:id", carts.findOne);
  
    // Altera todos os alunos da tabela
    app.put("/carts/:id", carts.update);
  
    // Deleta os alunos com ra
    app.delete("/carts/:id", carts.delete);
  
    // Deleta todas as disciplinas
    app.delete("/carts", carts.deleteAll);
  };