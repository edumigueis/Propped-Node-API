module.exports = app => {
    const products = require("../controllers/Products.controller.js");
  
    // Cria um novo aluno
    app.post("/products", products.create);
  
    // Pega todos os alunos na tabela
    app.get("/products", products.findAll);
  
    // Pega só um aluno da tabela
    app.get("/products/:id", products.findOne);
  
    // Altera todos os alunos da tabela
    app.put("/products/:id", products.update);
  
    // Deleta os alunos com ra
    app.delete("/products/:id", products.delete);
  
    // Deleta todas as disciplinas
    app.delete("/products", products.deleteAll);
  };