module.exports = app => {
    const sales = require("../controllers/Sales.controller.js");
  
    app.get("/sales", sales.findAll);

    app.post("/sales", sales.create);
  
    app.get("/sales/:code_sale", sales.findOne);
  
    app.put("/sales/:code_sale", sales.update);
  
    app.delete("/sales/:code_sale", sales.delete);
  };