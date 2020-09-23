import Hasher from "../data/Hasher.js";

const Cart = require("../models/Cart.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const cart = new Cart({
    code_shoppingcart: req.body.code_shoppingcart,
    id_cart_shoppingcart: req.body.id_cart_shoppingcart,
  });

  Cart.create(cart, (err, data) => {
    do cart.code_attribute = Hasher.generateCode();
    while (
      Cart.findByCode(cart.code_attribute, (err, data) => {}) == -1
    );

    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create cart.",
      });
    else res.send(data.recordset);
  });
};

exports.findAll = (req, res) => {
  Cart.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for carts.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Cart.findByCode(req.params.code_shoppingcart, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cart with the code ${req.params.code_shoppingcart} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error while searching for cart with the code " +
            req.params.code_shoppingcart,
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

  Cart.updateByCode(
    req.params.code_shoppingcart,
    new Cart(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Cart with the code ${req.params.code_shoppingcart} wasn't found.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error when trying to update cart with the following code: " +
              req.params.code_shoppingcart,
          });
        }
      } else res.send(data.recordset);
    }
  );
};

exports.delete = (req, res) => {
  Cart.remove(req.params.code_shoppingcart, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cart with the code ${req.params.code_shoppingcart} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error when trying to update cart with the following code: " +
            req.params.code_shoppingcart,
        });
      }
    } else {
      res.send({
        message: `Cart has been deleted succesfully!`,
      });
    }
  });
};
