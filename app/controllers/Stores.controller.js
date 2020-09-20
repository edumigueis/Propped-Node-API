const Store = require("../models/Store.model.js");

// Cria e salva um novo store
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  // Cria um Store
  const store = new Store({
    code_store = req.body.code_store,
    name_store = req.body.name_store,
    registry_store = req.body.registry_store,
    website_store = req.body.website_store,
    phone_store = req.body.phone_store,
    postal_code_store = req.body.postal_code_store,
    address_store = req.body.address_store,
    city_store = req.body.city_store,
    state_store = req.body.state_store,
    country_store = req.body.country_store,
    image_store = req.body.image_store
  });

  // Salva Store no banco de dados
  Store.create(store, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create store.",
      });
    else res.send(data.recordset);
  });
};

// Pega todos os stores do banco de dados
exports.findAll = (req, res) => {
  Store.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for stores.",
      });
    else res.send(data.recordset);
  });
};

// Achar store com ra especifico
exports.findOne = (req, res) => {
  Store.findByCode(req.params.code_store, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Store with the code ${req.params.code_store} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for store with the code " + req.params.code_store,
        });
      }
    } else res.send(data);
  });
};

// Altera o store com ra específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  Store.updateByCode(req.params.code_store, new Store(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Store with the code ${req.params.code_store} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update store with the following code: " + req.params.code_store,
        });
      }
    } else res.send(data.recordset);
  });
};

// Deleta store com ra especifico
exports.delete = (req, res) => {
  Store.remove(req.params.code_store, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Store with the code ${req.params.code_store} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update store with the following code: " + req.params.code_store,
        });
      }
    } else {
      res.send({
        message: `Store has been deleted succesfully!`,
      });
    }
  });
};