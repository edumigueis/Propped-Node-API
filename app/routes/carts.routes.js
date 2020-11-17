module.exports = app => {
  const carts = require("../controllers/ShoppingCarts.controller.js");

  app.post("/carts", carts.create);

  app.get("/carts", carts.findAll);

  app.get("/carts/:code_shoppingcart", carts.findOne);

  app.get("/carts/id/:id_shoppingcart", carts.findById);

  app.get("/carts/user/:id_user_shoppingcart", carts.findById);

  app.get("/carts/products/:id_shoppingcart", carts.findAllProducts);

  app.put("/carts/:code_shoppingcart", carts.update);

  app.delete("/carts/:code_shoppingcart", carts.delete);
};