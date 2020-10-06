module.exports = app => {
    const categories = require("../controllers/Categories.controller.js");

    app.post("/categories", categories.create);

    app.get("/categories", categories.findAll);

    app.get("/categories/:id", categories.findOne);

    app.put("/categories/:id", categories.update);

    app.delete("/categories/:id", categories.delete);
};