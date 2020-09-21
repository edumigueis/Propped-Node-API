module.exports = app => {
    const stores = require("../controllers/Stores.controller.js");
  
    app.post("/stores", stores.create);
  
    app.get("/stores", stores.findAll);
  
    app.get("/stores/:id", stores.findOne);
  
    app.put("/stores/:id", stores.update);
  
    app.delete("/stores/:id", stores.delete);

  };