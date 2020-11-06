const Hasher = require("../data/Hasher.js");

const Subcategory = require("../models/Subcategory.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const subcategory = new Subcategory({
    id_category_subcategory: req.body.id_category_subcategory,
    name_subcategory: req.body.name_subcategory,
  });

  if (typeof subcategory.id_category_subcategory === "undefined" || typeof subcategory.name_subcategory === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do subcategory.code_subcategory = Hasher.generateCode();
    while (
      Subcategory.findByCode(subcategory.code_subcategory, (err, data) => {}) == -1
    );
    Subcategory.create(subcategory, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create subcategory.",
        });
      else res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  Subcategory.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for subcategories.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Subcategory.findByCode(req.params.code_subcategory, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Subcategory with the code ${req.params.code_subcategory} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for subcategory with the code " +
            req.params.code_subcategory,
        });
      }
    } else res.send(data.recordset);
  });
};

exports.findByCategory = (req, res) => {
  Subcategory.findByCategory(req.params.id_category_subcategory, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Subcategories with the category ${req.params.id_category_subcategory} weren't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for subcategory with the category " +
            req.params.id_category_subcategory,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  var subcategory = new Subcategory(req.body);

  if (typeof subcategory.id_category_subcategory === "undefined" || typeof subcategory.name_subcategory === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Subcategory.updateByRA(req.params.code_subcategory, subcategory, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Subcategory with the code ${req.params.code_subcategory} wasn't found.`,
          });
        } else {
          res.status(500).send({
            message: "Error when trying to update subcategory with the following code: " +
              req.params.subcode_category,
          });
        }
      } else res.send(data.recordset);
    })
  }
};



exports.delete = (req, res) => {
  Subcategory.remove(req.params.code_subcategory, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Subcategory with the code ${req.params.code_subcategory} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to delete subcategory with the following code: " +
            req.params.code_subcategory,
        });
      }
    } else
      res.send({
        message: `Subcategory has been deleted succesfully!`,
      });
  });
};