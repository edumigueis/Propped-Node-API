module.exports = app => {
    const users = require("../controllers/Users.controller.js");
  
    app.post("/users", users.create);
  
    app.get("/users", users.findAll);

    app.get("/users/login/:email_user/:pass_user", users.login);

    app.get("/users/id/:id_user", users.findById);
  
    app.get("/users/:code_user", users.findOne);

    app.get("/users/email/:email_user", users.findOne);
  
    app.put("/users/:code_user", users.update);
  
    app.delete("/users/:code_user", users.delete);
  };