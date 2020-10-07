const Hasher = require("../data/Hasher.js");

const Category = require("../models/Category.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const category = new Category({
    name_category: req.body.name_category,
  });

  if (typeof category.name_category === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do category.code_category = Hasher.generateCode();
    while (
      Category.findByCode(category.code_category, (err, data) => {}) == -1
    );
    Category.create(category, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create category.",
        });
      else res.send(data.recordset);
    });
  }
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
          message: "Error while searching for category with the code " +
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

  var category = new Category(req.body);

  if (typeof category.name_category === "undefined") {
    res.status(400).send({
      message: err.message || "Parts of the data weren't given correctly.",
    });
  } else {
    Category.updateByCode(
      req.params.code_category,
      category,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Category with the code ${req.params.code_category} wasn't found.`,
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update category with the following code: " +
                req.params.code_category,
            });
          }
        } else res.send(data.recordset);
      }
    );
  }
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
          message: "Error when trying to delete category with the following code: " +
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