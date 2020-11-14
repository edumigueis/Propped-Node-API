module.exports = app => {
    const subcategories = require("../controllers/Subcategories.controller.js");

    app.post("/subcategories", subcategories.create);

    app.get("/subcategories", subcategories.findAll);

    app.get("/subcategories/:code_subcategory", subcategories.findOne);

    app.get("/subcategories/id/:id_subcategory", subcategories.findById);

    app.get("/subcategories/category/:id_category_subcategory", subcategories.findByCategory);

    app.put("/subcategories/:code_subcategory", subcategories.update);

    app.delete("/subcategories/:code_subcategory", subcategories.delete);
};