const Hasher = require("../data/Hasher.js");

const Store = require("../models/Store.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const store = new Store({
    name_store: req.body.name_store,
    registry_store: req.body.registry_store,
    website_store: req.body.website_store,
    phone_store: req.body.phone_store,
    postal_code_store: req.body.postal_code_store,
    address_store: req.body.address_store,
    city_store: req.body.city_store,
    state_store: req.body.state_store,
    country_store: req.body.country_store,
    image_store: req.body.image_store
  });

  if (typeof store.name_store === "undefined" || typeof store.registry_store === "undefined" || typeof store.website_store === "undefined" || typeof store.phone_store === "undefined" || typeof store.postal_code_store === "undefined" || typeof store.address_store === "undefined" || typeof store.city_store === "undefined" || typeof store.state_store === "undefined" || typeof store.country_store === "undefined" || typeof store.image_store === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do store.code_store = Hasher.generateCode();
    while (
      Store.findByCode(store.code_store, (err, data) => {}) == -1
    );
    Store.create(store, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create store.",
        });
      else
        res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  Store.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for stores.",
      });
    else
      res.send(data.recordset);
  });
};

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
    } else
      res.status(200).send(data.recordset);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  var store = new Store(req.body);

  if (typeof store.name_store === "undefined" || typeof store.registry_store === "undefined" || typeof store.website_store === "undefined" || typeof store.phone_store === "undefined" || typeof store.postal_code_store === "undefined" || typeof store.address_store === "undefined" || typeof store.city_store === "undefined" || typeof store.state_store === "undefined" || typeof store.country_store === "undefined" || typeof store.image_store === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Store.updateByCode(req.params.code_store, store, (err, data) => {
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
      } else
        res.send(data.recordset);
    });
  }
};

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