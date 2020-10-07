module.exports = app => {
    const formsofpayment = require("../controllers/FormsofPayment.controller.js");

    app.post("/formsofpayment", formsofpayment.create);

    app.get("/formsofpayment", formsofpayment.findAll);

    app.get("/formsofpayment/:code_formofpayment", formsofpayment.findOne);

    app.put("/formsofpayment/:code_formofpayment", formsofpayment.update);

    app.delete("/formsofpayment/:code_formofpayment", formsofpayment.delete);
  };