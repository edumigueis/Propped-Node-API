module.exports = app => {
  const carts = require("../controllers/Carts.controller.js");

  app.post("/carts", carts.create);

  app.get("/carts", carts.findAll);

  app.get("/carts/:code_cart", carts.findOne);

  app.put("/carts/:code_cart", carts.update);

  app.delete("/carts/:code_cart", carts.delete);
};