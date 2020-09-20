module.exports = app => {
    const orders = require("../controllers/Orders.controller.js");
  
    // Cria um novo aluno
    app.post("/orders", orders.create);
  
    // Pega todos os alunos na tabela
    app.get("/orders", orders.findAll);
  
    // Pega só um aluno da tabela
    app.get("/orders/:id", orders.findOne);
  
    // Altera todos os alunos da tabela
    app.put("/orders/:id", orders.update);
  
    // Deleta os alunos com ra
    app.delete("/orders/:id", orders.delete);
  
    // Deleta todas as disciplinas
    app.delete("/orders", orders.deleteAll);
  };