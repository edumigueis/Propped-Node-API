const sql = require("./db.js");

const ProductsSale = function (productssale) {
  this.code_productssale = productssale.code_productssale;
  this.id_product_productssale = productssale.id_product_productssale;
  this.id_sale_productssale = productssale.id_sale_productssale;
  this.amount_productssale = productssale.amount_productssale;
};

ProductsSale.create = (newProductsSale, result) => {
  sql.query(
    `INSERT INTO ProductsSale_Propped VALUES('${newProductsSale.code_productssale}',${newProductsSale.id_product_productssale},${newProductsSale.id_sale_productssale},${newProductsSale.amount_productssale})`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newProductsSale,
      });
    }
  );
};

ProductsSale.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM ProductsSale_Propped WHERE code_productssale = '${code}'`,
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

ProductsSale.getAll = (result) => {
  sql.query("SELECT * FROM ProductsSale_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

ProductsSale.updateByCode = (code, productssale, result) => {
  productssale.code_productssale = code;
  sql.query(
    `UPDATE ProductsSale_Propped SET id_product_productssale = ${productssale.id_product_productssale}, id_sale_productssale = ${productssale.id_sale_productssale}, amount_productssale = ${productssale.amount_productssale} WHERE code_productssale = '${code}'`,
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
        code_productssale: code,
        ...productssale,
      });
    }
  );
};

ProductsSale.remove = (code, result) => {
  sql.query(
    "DELETE FROM ProductsSale_Propped WHERE code_productssale = '" + code + "'",
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

module.exports = ProductsSale;
