module.exports = app => {
    const images = require("../controllers/Images.controller.js");

    app.post("/images", images.create);

    app.get("/images", images.findAll);

    app.get("/images/:code_image", images.findOne);

    app.get("/images/id/:id_image", images.findById);

    app.put("/images/:code_image", images.update);

    app.delete("/images/:code_image", images.delete);
};