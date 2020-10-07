const sql = require("./db.js");

const ProductsShoppingCart = function (productsshoppingcart) {
  this.code_productsshoppingcart = productsshoppingcart.code_productsshoppingcart;
  this.id_product_productsshoppingcart = productsshoppingcart.id_product_productsshoppingcart;
  this.id_shoppingcart_productsshoppingcart = productsshoppingcart.id_shoppingcart_productsshoppingcart;
  this.amount_productsshoppingcart = productsshoppingcart.amount_productsshoppingcart;
};

ProductsShoppingCart.create = (newProductsShoppingCart, result) => {
  sql.query(
    `INSERT INTO ProductsShoppingCart_Propped VALUES('${newProductsShoppingCart.code_productsshoppingcart}',${newProductsShoppingCart.id_product_productsshoppingcart},${newProductsShoppingCart.id_shoppingcart_productsshoppingcart},${newProductsShoppingCart.amount_productsshoppingcart})`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newProductsShoppingCart,
      });
    }
  );
};

ProductsShoppingCart.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM ProductsShoppingCart_Propped WHERE code_productsshoppingcart = '${code}'`,
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

ProductsShoppingCart.getAll = (result) => {
  sql.query("SELECT * FROM ProductsShoppingCart_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

ProductsShoppingCart.updateByCode = (code, productsshoppingcart, result) => {
  productsshoppingcart.code_productsshoppingcart = code;
  sql.query(
    `UPDATE ProductsShoppingCart_Propped SET id_product_productsshoppingcart = ${productsshoppingcart.id_product_productsshoppingcart}, id_shoppingcart_productsshoppingcart = ${productsshoppingcart.id_shoppingcart_productsshoppingcart}, amount_productsshoppingcart = ${productsshoppingcart.amount_productsshoppingcart} WHERE code_productsshoppingcart = '${code}'`,
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
        code_productsshoppingcart: code,
        ...productsshoppingcart,
      });
    }
  );
};

ProductsShoppingCart.remove = (code, result) => {
  sql.query(
    "DELETE FROM ProductsShoppingCart_Propped WHERE code_productsshoppingcart = '" + code + "'",
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

module.exports = ProductsShoppingCart;
