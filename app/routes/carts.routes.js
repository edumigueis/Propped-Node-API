module.exports = app => {
    const carts = require("../controllers/Carts.controller.js");

    app.post("/carts", carts.create);
  
    app.get("/carts/:id", carts.findOne);

    app.put("/carts/:id", carts.update);

    app.delete("/carts/:id", carts.delete);

    app.delete("/carts", carts.deleteAll);
  };