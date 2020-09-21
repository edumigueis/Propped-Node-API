module.exports = app => {
    const orders = require("../controllers/Orders.controller.js");

    app.post("/orders", orders.create);

    app.get("/orders", orders.findAll);

    app.get("/orders/:id", orders.findOne);

    app.put("/orders/:id", orders.update);

    app.delete("/orders/:id", orders.delete);
  };