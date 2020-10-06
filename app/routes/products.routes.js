module.exports = app => {
    const products = require("../controllers/Products.controller.js");
  
    app.post("/products", products.create);
  
    app.get("/products", products.findByParams);

    app.get("/products/:id", products.findOne);

    app.put("/products/:id", products.update);

    app.delete("/products/:id", products.delete);
  };