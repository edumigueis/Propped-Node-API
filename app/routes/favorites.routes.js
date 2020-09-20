module.exports = app => {
    const favorites = require("../controllers/Favorites.controller.js");
  
    app.post("/favorites", favorites.create);
  
    app.get("/favorites/:id", favorites.findOne);
  
    app.put("/favorites/:id", favorites.update);
  
    app.delete("/favorites/:id", favorites.delete);
  
    app.delete("/favorites", favorites.deleteAll);
  };