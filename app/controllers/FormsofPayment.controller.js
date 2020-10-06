const Hasher = require("../data/Hasher.js");

const FormofPayment = require("../models/FormofPayment.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const formofpayment = new FormofPayment({
    name_formofpayment: req.body.name_formofpayment,
    time_formofpayment: req.body.time_formofpayment
  });

  if (typeof formofpayment.name_formofpayment === "undefined" || typeof formofpayment.time_formofpayment === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do formofpayment.code_formofpayment = Hasher.generateCode();
    while (
      FormofPayment.findByCode(formofpayment.code_formofpayment, (err, data) => {}) == -1
    );
    FormofPayment.create(formofpayment, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create form of payment.",
        });
      else res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  FormofPayment.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for forms of payments.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  FormofPayment.findByCode(req.params.code_formofpayment, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `FormofPayment with the code ${req.params.code_formofpayment} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for form of payment with the code " +
            req.params.code_formofpayment,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  var formofpayment = new FormofPayment(req.body);
  if (typeof formofpayment.name_formofpayment === "undefined" || typeof formofpayment.time_formofpayment === "undefined") {
    res.status(400).send({
      message: err.message || "Parts of the data weren't given correctly.",
    });
  } else {
    FormofPayment.updateByCode(
      req.params.code_formofpayment,
      formofpayment,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `FormofPayment with the code ${req.params.code_formofpayment} wasn't found.`,
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update form of payment with the following code: " +
                req.params.code_formofpayment,
            });
          }
        } else res.send(data.recordset);
      }
    );
  }
};

exports.delete = (req, res) => {
  FormofPayment.remove(req.params.code_formofpayment, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `FormofPayment with the code ${req.params.code_formofpayment} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update form of payment with the following code: " +
            req.params.code_formofpayment,
        });
      }
    } else {
      res.send({
        message: `Form of payment has been deleted succesfully!`,
      });
    }
  });
};