const sql = require("./db.js");

// Construtor
const Cart = function (cart) {
    this.code_shoppingcart = cart.code_shoppingcart;
    this.id_user_shoppingcart = cart.id_user_shoppingcart;
};

Cart.create = (newCart, result) => {
  sql.query(
    `INSERT INTO ShoppingShoppingCart_Propped VALUES('${newCart.code_shoppingcart}','${newCart.id_user_shoppingcart})`,
    newCart,
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

Cart.findByCode = (cartCODE, result) => {
  sql.query(
    `SELECT * FROM ShoppingShoppingCart_Propped WHERE code_shoppingcart = ${cartCODE}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        console.log("Cart found: ", res);
        result(null, res);
        return;
      }

      // Não achou a cart com o cod
      result(
        {
          kind: "not_found",
        },
        null
      );
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
    result(null, res.recordset);
  });
};

Cart.updateByCode = (cod, cart, result) => {
  sql.query(
    "UPDATE Carts_Propped SET code_shoppingcart = ?, id_user_shoppingcart= ?,  WHERE code_shoppingcart = ?",
    [
      cart.code_shoppingcart,
      cart.id_user_shoppingcart,
      cod,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a cart com esse cod
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("updated cart: ", {
        code_shoppingcart: cod,
        ...cart,
      });
      result(null, {
        code_shoppingcart: cod,
        ...cart,
      });
    }
  );
};

Cart.remove = (code, result) => {
  sql.query("DELETE FROM ShoppingCart_Propped WHERE code_shoppingcart = ?", code, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou a cart com esse cod
      result(
        {
          kind: "not_found",
        },
        null
      );
      return;
    }

    console.log("Cart with code: ", code, " was deleted");
    result(null, res);
  });
};

module.exports = Cart;
