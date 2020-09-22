const Sale = require("../models/Sale.model.js");

// Cria e salva um novo sale
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  // Cria um Sale
  const sale = new Sale({
    code_sale: req.body.code_sale,
    id_store_sale: req.body.id_store_sale,
    delivery_time_sale: req.body.delivery_time_sale,
    amount_sale: req.body.amount_sale,
    shipping_sale: req.body.shipping_sale,
    date_order: req.body.date_order
  });

  // Salva Sale no banco de dados
  Sale.create(sale, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create sale.",
      });
    else res.send(data);
  });
};

// Pega todos os sales do banco de dados
exports.findAll = (req, res) => {
  Sale.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for sales.",
      });
    else res.send(data);
  });
};

// Achar sale com ra especifico
exports.findOne = (req, res) => {
  Sale.findByCode(req.params.code_sale, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Sale with the code ${req.params.code_sale} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for sale with the code " + req.params.code_sale,
        });
      }
    } else res.send(data.recordset);
  });
};

// Altera o sale com ra específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  Sale.updateByCode(req.params.code_sale, new Sale(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Sale with the code ${req.params.code_sale} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update sale with the following code: " + req.params.code_sale,
        });
      }
    } 
    else res.send(data);
  });
};

// Deleta sale com ra especifico
exports.delete = (req, res) => {
  Sale.remove(req.params.code_sale, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Sale with the code ${req.params.code_sale} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update sale with the following code: " + req.params.code_sale,
        });
      }
    } else{
      res.send({
        message: `Sale has been deleted succesfully!`,
      });
    }
  });
};
