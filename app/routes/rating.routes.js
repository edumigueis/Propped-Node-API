module.exports = app => {
    const rating = require("../controllers/Rating.controller.js");
  
    app.post("/rating", rating.create);
  
    app.get("/rating", rating.findAll);
  
    app.get("/rating/:id", rating.findOne);
  
    app.put("/rating/:id", rating.update);
  
    app.delete("/rating/:id", rating.delete);
  
    app.delete("/rating", rating.deleteAll);
  };