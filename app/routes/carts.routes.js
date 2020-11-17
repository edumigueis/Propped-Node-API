module.exports = app => {
  const carts = require("../controllers/ShoppingCarts.controller.js");

  app.post("/carts", carts.create);

  app.get("/carts", carts.findAll);

  app.get("/carts/:code_cart", carts.findOne);

  app.get("/carts/id/:id_cart", carts.findById);

  app.put("/carts/:code_cart", carts.update);

  app.delete("/carts/:code_cart", carts.delete);
};