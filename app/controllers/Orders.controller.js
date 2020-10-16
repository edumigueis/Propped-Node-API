const Hasher = require("../data/Hasher.js");

const Order = require("../models/Order.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const order = new Order({
    id_user_order: req.body.id_user_order,
    id_form_of_payment_order: req.body.id_form_of_payment_order,
    date_order: req.body.date_order,
    total_order: req.body.total_order,
    total_of_shipping_order: req.body.total_of_shipping_order,
  });

  if (typeof order.id_user_order === "undefined" || typeof order.id_form_of_payment_order === "undefined" || typeof order.date_order === "undefined" || typeof order.total_order === "undefined" || typeof order.total_of_shipping_order === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do order.code_order = Hasher.generateCode();
    while (
      Order.findByCode(order.code_order, (err, data) => { }) == -1
    );
    Order.create(order, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create order.",
        });
      else res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  Order.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for orders.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Order.findByCode(req.params.code_order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Order with the code ${req.params.code_order} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for order with the code " +
            req.params.code_order,
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

  var order = new Order(req.body);

  if (typeof order.id_user_order === "undefined" || typeof order.id_form_of_payment_order === "undefined" || typeof order.date_order === "undefined" || typeof order.total_order === "undefined" || typeof order.total_of_shipping_order === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Order.updateByCode(req.params.code_order, order, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Order with the code ${req.params.code_order} wasn't found.`,
          });
        } else {
          res.status(500).send({
            message: "Error when trying to update order with the following code: " +
              req.params.code_order,
          });
        }
      } else res.send(data.recordset);
    });
  }
};

exports.delete = (req, res) => {
  Order.remove(req.params.code_order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Order with the code ${req.params.code_order} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update order with the following code: " +
            req.params.code_order,
        });
      }
    } else {
      res.send({
        message: `Order has been deleted succesfully!`,
      });
    }
  });
};