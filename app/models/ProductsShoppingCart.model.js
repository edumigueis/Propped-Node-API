const sql = require("./db.js");

const ProductsShoppingCart = function (productsshoppingcart) {
  this.code_productsshoppingcart = productsshoppingcart.code_productsshoppingcart;
  this.id_product_productsshoppingcart = productsshoppingcart.id_product_productsshoppingcart;
  this.id_shoppingcart_productsshoppingcart = productsshoppingcart.id_shoppingcart_productsshoppingcart;
  this.amount_productsshoppingcart = productsshoppingcart.amount_productsshoppingcart;
  this.id_user_shoppingcart = productsshoppingcart.id_user_shoppingcart;
};

ProductsShoppingCart.create = (newProductsShoppingCart, result) => {
  sql.query(
    `INSERT INTO ProductsShoppingCart_Propped VALUES(${newProductsShoppingCart.id_product_productsshoppingcart},${newProductsShoppingCart.id_shoppingcart_productsshoppingcart},${newProductsShoppingCart.amount_productsshoppingcart},'${newProductsShoppingCart.code_productsshoppingcart}')`,
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

ProductsShoppingCart.findAllProductsByCart = (id, result) => {
  sql.query(
    `SELECT pc.amount_productsshoppingcart, p.* FROM ProductsShoppingCart_Propped pc, Product_Propped p WHERE pc.id_shoppingcart_productsshoppingcart = ${id} and p.id_product = pc.id_product_productsshoppingcart`,
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

ProductsShoppingCart.countByUser = (id, result) => {
  sql.query(
    `SELECT COUNT(*) AS 'count' FROM ProductsShoppingCart_Propped ps, ShoppingCart_Propped s WHERE ps.id_shoppingcart_productsshoppingcart = s.id_shoppingcart and s.id_user_shoppingcart = ${id}`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

        result(null, res);
        return;
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

ProductsShoppingCart.removeFromCart = (idCart, idProduct, result) => {
  sql.query(
    "DELETE FROM ProductsShoppingCart_Propped WHERE id_shoppingcart_productsshoppingcart = " + idCart + " and id_product_productsshoppingcart = " + idProduct,
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
