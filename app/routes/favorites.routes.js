module.exports = app => {
    const favorites = require("../controllers/Favorites.controller.js");
  
    app.post("/favorites", favorites.create);

    app.get("/favorites", favorites.findAll);

    app.get("/favorites/user/:id_user_favorite", favorites.findByUser);

    app.get("/favorites/id/:id_favorite", favorites.findById);

    app.get("/favorites/product/:id_user_favorite/:id_product_favorite", favorites.findByUserAndProduct);
  
    app.get("/favorites/:code_favorite", favorites.findOne);

    app.get("/favorites/count/:id_user_favorite", favorites.countByUser);
  
    app.put("/favorites/:code_favorite", favorites.update);
  
    app.delete("/favorites/:id_user/:id_product", favorites.delete);
  };