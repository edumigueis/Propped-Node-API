module.exports = app => {
    const attributes = require("../controllers/Attributes.controller.js");
  
    app.post("/attributes", attributes.create);
  
    app.get("/attributes", attributes.findAll);
  
    app.get("/attributes/:code_attribute", attributes.findOne);
  
    app.put("/attributes/:code_attribute", attributes.update);
  
    app.delete("/attributes/:code_attribute", attributes.delete);
  };