module.exports = app => {
    const attributes = require("../controllers/Attributes.controller.js");
  
    app.post("/attributes", attributes.create);
  
    app.post("/attributes/search", attributes.findByParams);
  
    app.get("/attributes", attributes.findAll);
  
    app.get("/attributes/:id", attributes.findOne);
  
    app.put("/attributes/:id", attributes.update);
  
    app.delete("/attributes/:id", attributes.delete);
  };