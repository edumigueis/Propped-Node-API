import Hasher from "../data/Hasher.js";

const Subcategory = require("../models/Subcategory.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const subcategory = new Subcategory({
    code_subcategory: req.body.code_subcategory,
    name_subcategory: req.body.name_subcategory,
  });

  Subcategory.create(subcategory, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create subcategory.",
      });
    else res.send(data.recordset);
  });
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
          message:
            "Error while searching for subcategory with the code " +
            req.params.code_subcategory,
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

  Subcategory.updateByRA(
    req.params.code_subcategory,
    new Subcategory(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Subcategory with the code ${req.params.code_subcategory} wasn't found.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error when trying to update subcategory with the following code: " +
              req.params.subcode_category,
          });
        }
      } else res.send(data.recordset);
    }
  );
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
          message:
            "Error when trying to delete subcategory with the following code: " +
            req.params.code_subcategory,
        });
      }
    } else
      res.send({
        message: `Subcategory has been deleted succesfully!`,
      });
  });
};
