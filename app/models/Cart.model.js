const sql = require("./db.js");

const Cart = function (cart) {
  this.code_shoppingcart = cart.code_shoppingcart;
  this.id_user_shoppingcart = cart.id_user_shoppingcart;
};

Cart.create = (newCart, result) => {
  sql.query(
    `INSERT INTO ShoppingCart_Propped VALUES('${newCart.code_shoppingcart}', ${newCart.id_user_shoppingcart})`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newCart,
      });
    }
  );
};

Cart.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM ShoppingCart_Propped WHERE code_shoppingcart = '${code}'`,
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

Cart.getAll = (result) => {
  sql.query("SELECT * FROM ShoppingCart_Propped", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("carts: ", res);
    result(null, res);
  });
};

Cart.updateByCode = (code, cart, result) => {
  cart.code_shoppingcart = code;
  sql.query(
    `UPDATE ShoppingCart_Propped SET id_user_shoppingcart = ${cart.id_user_shoppingcart} WHERE code_shoppingcart = '${code}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
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
        code_shoppingcart: cod,
        ...cart,
      });
    }
  );
};

Cart.remove = (code, result) => {
  sql.query(
    "DELETE FROM ShoppingCart_Propped WHERE code_shoppingcart = '" + code + "'",
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

Cart.findByUser = (id, result) => {
  sql.query(
    `SELECT * FROM ShoppingCart_Propped WHERE id_user_shoppingcart = ${id}`,
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

module.exports = Cart;
