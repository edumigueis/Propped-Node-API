const Hasher = require("../data/Hasher.js");

const Sale = require("../models/Sale.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const sale = new Sale({
    id_store_sale: req.body.id_store_sale,
    delivery_time_sale: req.body.delivery_time_sale,
    amount_sale: req.body.amount_sale,
    shipping_sale: req.body.shipping_sale,
    date_order: req.body.date_order,
  });

  if (typeof sale.id_store_sale === "undefined" || typeof sale.delivery_time_sale === "undefined" || typeof sale.amount_sale === "undefined" || typeof sale.shipping_sale === "undefined" || typeof sale.date_order === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do sale.code_sale = Hasher.generateCode();
    while (Sale.findByCode(sale.code_sale, (err, data) => {}) == -1);
    Sale.create(sale, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create sale.",
        });
      else res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  Sale.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for sales.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Sale.findByCode(req.params.code_sale, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Sale with the code ${req.params.code_sale} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for sale with the code " +
            req.params.code_sale,
        });
      }
    } else res.send(data.recordset);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  var sale = new Sale(req.body);

  if (typeof sale.id_store_sale === "undefined" || sale.delivery_time_sale === "undefined" || sale.amount_sale === "undefined" || sale.shipping_sale === "undefined" || sale.date_order === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Sale.updateByCode(req.params.code_sale, sale, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Sale with the code ${req.params.code_sale} wasn't found.`,
          });
        } else {
          res.status(500).send({
            message: "Error when trying to update sale with the following code: " +
              req.params.code_sale,
          });
        }
      } else res.send(data.recordset);
    });
  }
};

exports.delete = (req, res) => {
  Sale.remove(req.params.code_sale, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Sale with the code ${req.params.code_sale} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update sale with the following code: " +
            req.params.code_sale,
        });
      }
    } else {
      res.send({
        message: `Sale has been deleted succesfully!`,
      });
    }
  });
};