module.exports = app => {
    const categories = require("../controllers/Categories.controller.js");

    app.post("/categories", categories.create);

    app.get("/categories", categories.findAll);

    app.get("/categories/:code_category", categories.findOne);

    app.get("/categories/id/:id_category", categories.findById);

    app.put("/categories/:code_category", categories.update);

    app.delete("/categories/:code_category", categories.delete);
};