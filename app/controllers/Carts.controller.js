const Hasher = require("../data/Hasher.js");

const Cart = require("../models/Cart.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const cart = new Cart({
    id_user_shoppingcart: req.body.id_user_shoppingcart,
  });

  if (typeof cart.id_user_shoppingcart === "undefined") {
    res.status(400).send({
      message: err.message || "Parts of the data weren't given correctly.",
    });
  } else {
    do cart.code_shoppingcart = Hasher.generateCode();
    while (
      Cart.findByCode(cart.code_shoppingcart, (err, data) => {}) == -1
    );
    Cart.create(cart, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create cart.",
        });
      else res.send(data.recordset);
    });
  }
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
          message: "Error while searching for cart with the code " +
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

  var cart = new Cart(req.body);

  if (typeof cart.id_user_shoppingcart === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Cart.updateByCode(
      req.params.code_shoppingcart,
      cart,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Cart with the code ${req.params.code_shoppingcart} wasn't found.`,
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update cart with the following code: " +
                req.params.code_shoppingcart,
            });
          }
        } else res.send(data.recordset);
      }
    );
  }
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
          message: "Error when trying to update cart with the following code: " +
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