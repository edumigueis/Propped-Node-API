const Hasher = require("../data/Hasher.js");

const Attribute = require("../models/Attribute.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const attribute = new Attribute({
    name_attribute: req.body.name_attribute,
  });

  if (typeof attribute.name_attribute === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do attribute.code_attribute = Hasher.generateCode();
    while (
      Attribute.findByCode(attribute.code_attribute, (err, data) => {}) == -1
    );
    Attribute.create(attribute, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create attribute.",
        });
      else res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  Attribute.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for attributes.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Attribute.findByCode(req.params.code_attribute, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Attribute with the code ${req.params.code_attribute} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for attribute with the code " +
            req.params.code_attribute,
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

  var attribute = new Attribute(req.body);

  if (typeof attribute.name_attribute === "undefined") {
    res.status(400).send({
      message: err.message || "Parts of the data weren't given correctly.",
    });
  } else {
    Attribute.updateByCode(req.params.code_attribute, attribute,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Attribute with the code ${req.params.code_attribute} wasn't found.`,
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update attribute with the following code: " +
                req.params.code_attribute,
            });
          }
        } else res.send(data.recordset);
      }
    );
  }
};

exports.delete = (req, res) => {
  Attribute.remove(req.params.code_attribute, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Attribute with the code ${req.params.code_attribute} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update attribute with the following code: " +
            req.params.code_attribute,
        });
      }
    } else {
      res.send({
        message: `Attribute has been deleted succesfully!`,
      });
    }
  });
};