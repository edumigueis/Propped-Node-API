const sql = require("./db.js");

const Sale = function (sale) {
  this.code_sale = sale.code_sale;
  this.id_store_sale = sale.id_store_sale;
  this.delivery_time_sale = sale.delivery_time_sale;
  this.amount_sale = sale.amount_sale;
  this.shipping_sale = sale.shipping_sale;
  this.date_order = sale.date_order;
};

Sale.create = (newSale, result) => {
  sql.query(
    `INSERT INTO Sale_Propped VALUES('${newSale.code_sale}',${newSale.id_store_sale},'${newSale.delivery_time_sale}',${newSale.amount_sale},${newSale.shipping_sale},'${newSale.date_order}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newSale,
      });
    }
  );
};

Sale.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM Sale_Propped WHERE code_sale = '${code}'`,
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

Sale.getAll = (result) => {
  sql.query("SELECT * FROM Sale_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);    
  });
};

Sale.updateByCode = (code, sale, result) => {
  sale.code_sale = code;
  sql.query(
    `UPDATE Sale_Propped SET id_store_sale = ${sale.id_store_sale}, delivery_time_sale = '${sale.delivery_time_sale}', amount_sale = ${sale.amount_sale}, shipping_sale= ${sale.shipping_sale}, date_order= '${sale.date_order}'  WHERE code_sale = '${code}'`,
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
        code_sale: code,
        ...sale,
      });
    }
  );
};

Sale.remove = (code, result) => {
  sql.query("DELETE FROM Sale_Propped WHERE code_sale = '" + code + "'", (err, res) => {
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

module.exports = Sale;
