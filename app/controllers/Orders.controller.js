import Hasher from "../data/Hasher.js";

const Order = require("../models/Order.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const order = new Order({
    code_order: req.body.code_order,
    id_user_order: req.body.id_user_order,
    id_form_of_payment_order: req.body.id_form_of_payment_order,
    date_order: req.body.date_order,
    total_order: req.body.total_order,
    total_of_shipping_order: req.body.total_of_shipping_order,
  });

  Order.create(order, (err, data) => {
    do order.code_order = Hasher.generateCode();
    while (
      Order.findByCode(order.code_order, (err, data) => {}) == -1
    );

    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create order.",
      });
    else res.send(data.recordset);
  });
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
          message:
            "Error while searching for order with the code " +
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

  Order.updateByCode(req.params.code_order, new Order(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Order with the code ${req.params.code_order} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error when trying to update order with the following code: " +
            req.params.code_order,
        });
      }
    } else res.send(data.recordset);
  });
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
          message:
            "Error when trying to update order with the following code: " +
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
