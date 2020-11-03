module.exports = app => {
    const favorites = require("../controllers/Favorites.controller.js");
  
    app.post("/favorites", favorites.create);

    app.get("/favorites", favorites.findAll);

    app.get("/favorites/user/:id_user_favorite", favorites.findByUser);
  
    app.get("/favorites/:code_favorite", favorites.findOne);
  
    app.put("/favorites/:code_favorite", favorites.update);
  
    app.delete("/favorites/:code_favorite", favorites.delete);
  };