module.exports = app => {
    const subcategories = require("../controllers/Subcategories.controller.js");

    app.post("/subcategories", subcategories.create);

    app.get("/subcategories", subcategories.findAll);

    app.get("/subcategories/:id", subcategories.findOne);

    app.put("/subcategories/:id", subcategories.update);

    app.delete("/subcategories/:id", subcategories.delete);
};