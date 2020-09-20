module.exports = app => {
    const sales = require("../controllers/Sales.controller.js");
  
    app.get("/sales", sales.findAll);

    app.post("/sales", sales.create);
  
    app.get("/sales/:id", sales.findOne);
  
    app.put("/sales/:id", sales.update);
  
    app.delete("/sales/:id", sales.delete);
  
    app.delete("/sales", sales.deleteAll);
  };