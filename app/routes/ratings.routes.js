module.exports = app => {
    const ratings = require("../controllers/Ratings.controller.js");
  
    app.post("/ratings", ratings.create);
  
    app.get("/ratings", ratings.findAll);
  
    app.get("/ratings/:code_rating", ratings.findOne);
  
    app.put("/ratings/:code_rating", ratings.update);
  
    app.delete("/ratings/:code_rating", ratings.delete);
  };