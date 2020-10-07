const Hasher = require("../data/Hasher.js");

const Product = require("../models/Product.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const product = new Product({
    id_store_product: req.body.id_store_product,
    id_category_product: req.body.id_category_product,
    id_subcategory_product: req.body.id_subcategory_product,
    name_product: req.body.name_product,
    description_product: req.body.description_product,
    weight_product: req.body.weight_product,
    price_product: req.body.price_product,
    stock_product: req.body.stock_product
  });

  if (typeof product.id_store_product === "undefined" || product.id_category_product === "undefined" || product.id_subcategory_product === "undefined" || product.name_product === "undefined" || product.description_product === "undefined" || product.weight_product === "undefined" || product.price_product === "undefined" || product.stock_product === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do product.code_product = Hasher.generateCode();
    while (Product.findByCode(product.code_product, (err, data) => {}) != -1);
    Product.create(product, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create product.",
        });
      else res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for products.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Product.findByCode(req.params.code_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the code ${req.params.code_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for product with the code " +
            req.params.code_product,
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

  var product = new Product(req.body);

  if (typeof product.id_store_product === "undefined" || product.id_category_product === "undefined" || product.id_subcategory_product === "undefined" || product.name_product === "undefined" || product.description_product === "undefined" || product.weight_product === "undefined" || product.price_product === "undefined" || product.stock_product === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Product.updateByCode(
      req.params.code_product,
      product,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Product with the code ${req.params.code_product} wasn't found.`,
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update product with the following code: " +
                req.params.code_product,
            });
          }
        } else res.send(data.recordset);
      }
    );
  }
};

exports.delete = (req, res) => {
  Product.remove(req.params.code_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the code ${req.params.code_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update product with the following code: " +
            req.params.code_product,
        });
      }
    } else {
      res.send({
        message: `Product has been deleted succesfully!`,
      });
    }
  });
};

exports.findByName = (req, res) => {
  Product.findByName(req.params.name_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the name ${req.params.name_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for product with the name " +
            req.params.name_product,
        });
      }
    } else res.send(data.recordset);
  });
};

exports.findByStore = (req, res) => {
  Product.findByStore(req.params.id_store_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the store ${req.params.id_store_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for product with the store " +
            req.params.id_store_product,
        });
      }
    } else res.send(data.recordset);
  });
};

exports.findByParams = (req, res) => {
  Product.findByParams(req.body.name_product, req.body.id_category_product, req.body.id_subcategory_product,
    req.body.filters_product, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Product with these attributes wasn't found.`,
          });
        } else if (err.kind === "bad_request") {
          res.status(400).send({
            message: `Invalid parameters were entered to search a product.`,
          });
        } else {
          res.status(500).send({
            message: "Error while searching for product with these attributes",
          });
        }
      } else res.send(data.recordset);
    });
};