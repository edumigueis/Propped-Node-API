module.exports = app => {
    const stores = require("../controllers/Stores.controller.js");
  
    app.post("/stores", stores.create);
  
    app.get("/stores", stores.findAll);
  
    app.get("/stores/:code_store", stores.findOne);

    app.get("/stores/id/:id_store", stores.findById);
  
    app.put("/stores/:code_store", stores.update);
  
    app.delete("/stores/:code_store", stores.delete);

  };