module.exports = app => {
  const products = require("../controllers/Products.controller.js");

  app.post("/products", products.create);

  app.post("/products/search", products.findByParams);

  app.get("/products", products.findAll);

  app.get("/products/:code_product", products.findOne);

  app.put("/products/:code_product", products.update);

  app.delete("/products/:code_product", products.delete);
};