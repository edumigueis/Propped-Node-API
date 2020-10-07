const sql = require("./db.js");

const Order = function (order) {
  this.code_order = order.code_order;
  this.id_user_order = order.id_user_order;
  this.id_form_of_payment_order = order.id_form_of_payment_order;
  this.date_order = order.date_order;
  this.total_order = order.total_order;
  this.total_of_shipping_order = order.total_of_shipping_order;
};

Order.create = (newOrder, result) => {
  sql.query(
    `INSERT INTO Order_Propped VALUES('${newOrder.code_order}',${newOrder.id_user_order},${newOrder.id_form_of_payment_order},'${newOrder.date_order}',${newOrder.total_order},${newOrder.total_of_shipping_order})`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newOrder,
      });
    }
  );
};

Order.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM Order_Propped WHERE code_order = '${code}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        result(null, res);
        return;
      }
      result(
        {
          kind: "not_found",
        },
        null
      );

      return -1;
    }
  );
};

Order.getAll = (result) => {
  sql.query("SELECT * FROM Order_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);    
  });
};

Order.updateByCode = (code, order, result) => {
  order.code_order = code;
  sql.query(
    `UPDATE Order_Propped SET id_user_order = ${order.id_user_order}, id_form_of_payment_order = '${order.id_form_of_payment_order}', date_order = ${order.date_order}, total_order= ${order.total_order}, total_of_shipping_order= '${order.total_of_shipping_order}'  WHERE code_order = '${code}'`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      result(null, {
        code_order: code,
        ...order,
      });
    }
  );
};

Order.remove = (code, result) => {
  sql.query("DELETE FROM Order_Propped WHERE code_order = '" + code + "'", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result(
        {
          kind: "not_found",
        },
        null
      );
      return;
    }

    result(null, res);
  });
};

module.exports = Order;
