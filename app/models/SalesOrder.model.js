const sql = require("./db.js");

const SalesOrder = function (salesorder) {
  this.code_salesorder = salesorder.code_salesorder;
  this.id_sale_salesorder = salesorder.id_sale_salesorder;
  this.id_order_salesorder = salesorder.id_order_salesorder;
};

SalesOrder.create = (newSalesOrder, result) => {
  sql.query(
    `INSERT INTO SalesOrder_Propped VALUES('${newSalesOrder.code_salesorder}',${newSalesOrder.id_sale_salesorder},${newSalesOrder.id_order_salesorder})`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newSalesOrder,
      });
    }
  );
};

SalesOrder.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM SalesOrder_Propped WHERE code_salesorder = '${code}'`,
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

SalesOrder.getAll = (result) => {
  sql.query("SELECT * FROM SalesOrder_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

SalesOrder.updateByCode = (code, salesorder, result) => {
  salesorder.code_salesorder = code;
  sql.query(
    `UPDATE SalesOrder_Propped SET id_sale_salesorder = ${salesorder.id_sale_salesorder}, id_order_salesorder = ${salesorder.id_order_salesorder} WHERE code_salesorder = '${code}'`,
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
        code_salesorder: code,
        ...salesorder,
      });
    }
  );
};

SalesOrder.remove = (code, result) => {
  sql.query(
    "DELETE FROM SalesOrder_Propped WHERE code_salesorder = '" + code + "'",
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

      result(null, res);
    }
  );
};

module.exports = SalesOrder;
