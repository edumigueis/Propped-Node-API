module.exports = app => {
  const orders = require("../controllers/Orders.controller.js");

  app.post("/orders", orders.create);

  app.get("/orders", orders.findAll);

  app.get("/orders/:code_order", orders.findOne);

  app.put("/orders/:code_order", orders.update);

  app.delete("/orders/:code_order", orders.delete);
};