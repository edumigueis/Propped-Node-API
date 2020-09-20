module.exports = app => {
    const ratings = require("../controllers/Ratings.controller.js");
  
    app.post("/ratings", ratings.create);
  
    app.get("/ratings", ratings.findAll);
  
    app.get("/ratings/:id", ratings.findOne);
  
    app.put("/ratings/:id", ratings.update);
  
    app.delete("/ratings/:id", ratings.delete);
  
    app.delete("/ratings", ratings.deleteAll);
  };