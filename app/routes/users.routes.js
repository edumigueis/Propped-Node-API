module.exports = app => {
    const users = require("../controllers/Users.controller.js");
  
    app.post("/users", users.create);
  
    app.get("/users", users.findAll);
  
    app.get("/users/:code_user", users.findOne);
  
    app.put("/users/:code_user", users.update);
  
    app.delete("/users/:code_user", users.delete);
  };