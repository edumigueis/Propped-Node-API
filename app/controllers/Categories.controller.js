import Hasher from "../data/Hasher.js";

const Category = require("../models/Category.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const category = new Category({
    code_category: req.body.code_category,
    name_category: req.body.name_category,
  });

  Category.create(category, (err, data) => {
    do category.code_attribute = Hasher.generateCode();
    while (
      Category.findByCode(category.code_attribute, (err, data) => {}) == -1
    );

    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create category.",
      });
    else res.send(data.recordset);
  });
};

exports.findAll = (req, res) => {
  Category.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for categories.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Category.findByCode(req.params.code_category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Category with the code ${req.params.code_category} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error while searching for category with the code " +
            req.params.code_category,
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

  Category.updateByCode(
    req.params.code_category,
    new Category(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Category with the code ${req.params.code_category} wasn't found.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error when trying to update category with the following code: " +
              req.params.code_category,
          });
        }
      } else res.send(data.recordset);
    }
  );
};

exports.delete = (req, res) => {
  Category.remove(req.params.code_category, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Category with the code ${req.params.code_category} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error when trying to delete category with the following code: " +
            req.params.code_category,
        });
      }
    } else {
      res.send({
        message: `Category has been deleted succesfully!`,
      });
    }
  });
};
