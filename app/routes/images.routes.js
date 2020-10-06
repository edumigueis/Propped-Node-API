module.exports = app => {
    const images = require("../controllers/Images.controller.js");

    app.post("/images", images.create);

    app.get("/images", images.findAll);

    app.get("/images/:id", images.findOne);

    app.put("/images/:id", images.update);

    app.delete("/images/:id", images.delete);
};