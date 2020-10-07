module.exports = app => {
    const ratings = require("../controllers/Ratings.controller.js");
  
    app.post("/ratings", ratings.create);
  
    app.get("/ratings", ratings.findAll);
  
    app.get("/ratings/:code_rating", ratings.findOne);

    app.get("/ratings/user/:id_user", ratings.findAllByUser);

    app.get("/ratings/store/:id_store", ratings.findAllByStore);
  
    app.put("/ratings/:code_rating", ratings.update);
  
    app.delete("/ratings/:code_rating", ratings.delete);
  };