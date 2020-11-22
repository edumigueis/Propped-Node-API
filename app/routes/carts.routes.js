module.exports = app => {
  const carts = require("../controllers/ShoppingCarts.controller.js");

  app.post("/carts", carts.create);

  app.post("/carts/product", carts.addProduct);

  app.get("/carts", carts.findAll);

  app.get("/carts/:code_shoppingcart", carts.findOne);

  app.get("/carts/id/:id_shoppingcart", carts.findById);

  app.get("/carts/user/:id_user_shoppingcart", carts.findById);

  app.get("/carts/products/:id_shoppingcart", carts.findAllProducts);

  app.get("/carts/products/count/:id_user_shoppingcart", carts.countByUser);

  app.put("/carts/:code_shoppingcart", carts.update);

  app.delete("/carts/:code_shoppingcart", carts.delete);

  app.delete("/carts/product/:id_shoppingcart/:id_product_shoppingcart", carts.deleteProduct);
};