module.exports = app => {
    const formsofpayment = require("../controllers/FormsofPayment.controller.js");

    app.post("/formsofpayment", formsofpayment.create);

    app.get("/formsofpayment", formsofpayment.findAll);

    app.get("/formsofpayment/:id", formsofpayment.findOne);

    app.put("/formsofpayment/:id", formsofpayment.update);

    app.delete("/formsofpayment/:id", formsofpayment.delete);
  };