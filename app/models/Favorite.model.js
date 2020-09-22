const sql = require("./db.js");

// Construtor
const Favorite = function (favorite) {
  this.code_favorite = favorite.code_favorite;
  this.id_user_favorite = favorite.id_user_favorite;
  this.id_product_favorite = favorite.id_product_favorite;
};

Favorite.create = (newFavorite, result) => {
  sql.query(
    `INSERT INTO Favorite_Propped VALUES('${newFavorite.code_favorite}',${newFavorite.id_user_favorite},'${newFavorite.id_product_favorite}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newFavorite,
      });
    }
  );
};

Favorite.findByCode = (favoriteCODE, result) => {
  sql.query(
    `SELECT * FROM Favorite_Propped WHERE code_favorite = '${favoriteCODE}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        console.log("Favorite found: ", res);
        result(null, res);
        return;
      }

      // Não achou a favorite com o cod
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

Favorite.getAll = (result) => {
  sql.query("SELECT * FROM Favorite_Propped", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("favorites: ", res.recordset);
    result(null, res.recordset);
  });
};

Favorite.updateByCode = (cod, favorite, result) => {
  favorite.code_favorite = cod;
  sql.query(
    `UPDATE Favorite_Propped SET id_user_favorite = ${favorite.id_user_favorite}, id_product_favorite = ${favorite.id_product_favorite}  WHERE code_favorite = '${cod}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a favorite com esse cod
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("updated favorite: ", {
        ...favorite,
      });
      result(null, {
        code_favorite: cod,
        ...favorite,
      });
    }
  );
};

Favorite.remove = (code, result) => {
  sql.query(
    "DELETE FROM Favorite_Propped WHERE code_favorite = '" + code + "'",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a favorite com esse cod
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("Favorite with code: ", code, " was deleted");
      result(null, res);
    }
  );
};

module.exports = Favorite;
