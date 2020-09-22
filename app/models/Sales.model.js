const sql = require("./db.js");

// Construtor
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

Sale.findByCode = (saleCODE, result) => {
  sql.query(
    `SELECT * FROM Sale_Propped WHERE code_sale = '${saleCODE}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        console.log("Sale found: ", res);
        result(null, res);
        return;
      }

      // Não achou a sale com o cod
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

Sale.getAll = (result) => {
  sql.query("SELECT * FROM Sale_Propped", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sales: ", res.recordset);
    result(null, res.recordset);
    
  });
};

Sale.updateByCode = (cod, sale, result) => {
  sale.code_sale = cod;
  sql.query(
    `UPDATE Sale_Propped SET id_store_sale = ${sale.id_store_sale}, delivery_time_sale = '${sale.delivery_time_sale}', amount_sale = ${sale.amount_sale}, shipping_sale= ${sale.shipping_sale}, date_order= '${sale.date_order}'  WHERE code_sale = '${cod}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a sale com esse cod
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("updated sale: ", {
        ...sale,
      });
      result(null, {
        code_sale: cod,
        ...sale,
      });
    }
  );
};

Sale.remove = (code, result) => {
  sql.query("DELETE FROM Sale_Propped WHERE code_sale = '" + code + "'", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou a sale com esse cod
      result(
        {
          kind: "not_found",
        },
        null
      );
      return;
    }

    console.log("Sale with code: ", code, " was deleted");
    result(null, res);
  });
};

module.exports = Sale;