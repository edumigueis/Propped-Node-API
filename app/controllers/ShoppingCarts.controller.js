const Hasher = require("../data/Hasher.js");

const ShoppingCart = require("../models/ShoppingCart.model.js");
const ProductsShoppingCart = require("../models/ProductsShoppingCart.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const cart = new ShoppingCart({
    id_user_shoppingcart: req.body.id_user_shoppingcart,
  });

  if (typeof cart.id_user_shoppingcart === "undefined") {
    res.status(400).send({
      message: err.message || "Parts of the data weren't given correctly.",
    });
  } else {
    do cart.code_shoppingcart = Hasher.generateCode();
    while (
      ShoppingCart.findByCode(cart.code_shoppingcart, (err, data) => {}) == -1
    );
    ShoppingCart.create(cart, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create cart.",
        });
      else res.status(201).send(data.recordset);
    });
  }
};

exports.addProduct = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const productsshoppingcart = new ProductsShoppingCart({
    id_product_productsshoppingcart: req.body.id_product_productsshoppingcart,
    id_shoppingcart_productsshoppingcart: req.body.id_shoppingcart_productsshoppingcart,
    amount_productsshoppingcart: req.body.amount_productsshoppingcart,
    id_user_shoppingcart: req.body.id_user_shoppingcart
  });

  if (typeof productsshoppingcart.id_product_productsshoppingcart === "undefined" || typeof productsshoppingcart.id_shoppingcart_productsshoppingcart === "undefined" || typeof productsshoppingcart.amount_productsshoppingcart === "undefined") {
    res.status(400).send({
      message: err.message || "Parts of the data weren't given correctly.",
    });
  } else {
    do productsshoppingcart.code_productsshoppingcart = Hasher.generateCode();
    while (
      ProductsShoppingCart.findByCode(productsshoppingcart.code_productsshoppingcart, (err, data) => {}) == -1
    );

    if (productsshoppingcart.id_shoppingcart_productsshoppingcart == "null") {
      let cart = new ShoppingCart({
        id_user_shoppingcart: productsshoppingcart.id_user_shoppingcart
      });
      do cart.code_shoppingcart = Hasher.generateCode();
      while (
        ShoppingCart.findByCode(cart.code_shoppingcart, (err, data) => {}) == -1
      );
      ShoppingCart.create(cart, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Error while trying to add product into cart.",
          });
        else{
          productsshoppingcart.id_shoppingcart_productsshoppingcart = data.recordset[0].id_cart;
          ProductsShoppingCart.create(productsshoppingcart, (err, data) => {
            if (err)
              res.status(500).send({
                message: err.message || "Error while trying to add product into cart.",
              });
            else {res.status(201).send(data.recordset);}
          });
        }
      });
    } else {
      ProductsShoppingCart.create(productsshoppingcart, (err, data) => {
        if (err)
          res.status(500).send({
            message: err.message || "Error while trying to add product into cart.",
          });
        else res.status(201).send(data.recordset);
      });
    }
  }
};

exports.findAll = (req, res) => {
  ShoppingCart.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for carts.",
      });
    else res.status(200).send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  ShoppingCart.findByCode(req.params.code_shoppingcart, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `ShoppingCart with the code ${req.params.code_shoppingcart} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for cart with the code " +
            req.params.code_shoppingcart,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.findById = (req, res) => {
  ShoppingCart.findById(req.params.id_cart, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `ShoppingCart with the id ${req.params.id_cart} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for cart with the id " +
            req.params.id_cart,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.findByUser = (req, res) => {
  ShoppingCart.findByUser(req.params.id_user_shoppingcart, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `ShoppingCart with the user with the id ${req.params.id_user_shoppingcart} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for cart with the user with the id " +
            req.params.id_user_shoppingcart,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.findAllProducts = (req, res) => {
  ProductsShoppingCart.findAllProductsByCart(req.params.id_shoppingcart, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `ShoppingCart with the id ${req.params.id_shoppingcart} is empty.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for content of cart with the id " +
            req.params.id_shoppingcart,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.countByUser = (req, res) => {
  ProductsShoppingCart.countByUser(req.params.id_user_shoppingcart, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error while counting content of cart with the user with the id " +
          req.params.id_user_shoppingcart,
      });
    } else res.status(200).send(data.recordset);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  var cart = new ShoppingCart(req.body);

  if (typeof cart.id_user_shoppingcart === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    ShoppingCart.updateByCode(
      req.params.code_shoppingcart,
      cart,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `ShoppingCart with the code ${req.params.code_shoppingcart} wasn't found.`,
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update cart with the following code: " +
                req.params.code_shoppingcart,
            });
          }
        } else res.status(200).send(data.recordset);
      }
    );
  }
};

exports.delete = (req, res) => {
  ShoppingCart.remove(req.params.code_shoppingcart, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `ShoppingCart with the code ${req.params.code_shoppingcart} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to delete cart with the following code: " +
            req.params.code_shoppingcart,
        });
      }
    } else {
      res.status(200).send({
        message: `ShoppingCart has been deleted succesfully!`,
      });
    }
  });
};

exports.deleteProduct = (req, res) => {
  ProductsShoppingCart.removeFromCart(req.params.id_shoppingcart, req.params.id_product_shoppingcart, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Cart with the id ${req.params.id_shoppingcart} does not have product with the id ${req.params.id_product_shoppingcart}.`,
        });
      } else {
        res.status(500).send({
          message: `Error when trying to delete product thith the id ${req.params.id_product_shoppingcart} from cart with the following id: ` +
            req.params.id_shoppingcart,
        });
      }
    } else {
      res.status(200).send({
        message: `Product has been deleted succesfully!`,
      });
    }
  });
};