const sql = require("./db.js");

const Rating = function (rating) {
  this.code_rating = rating.code_rating;
  this.stars_rating = rating.stars_rating;
};

Rating.create = (newRating, result) => {
  sql.query(
    `INSERT INTO Rating_Propped OUTPUT INSERTED.* VALUES(${newRating.stars_rating}, '${newRating.code_rating}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Rating.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM Rating_Propped WHERE code_rating = '${code}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        result(null, res);
        return;
      } else {
        result({
            kind: "not_found",
          },
          null
        );

        return -1;
      }
    }
  );
};

Rating.getAll = (result) => {
  sql.query("SELECT * FROM Rating_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Rating.updateByCode = (code, rating, result) => {
  rating.code_rating = code;
  sql.query(
    `UPDATE Rating_Propped SET stars_rating = ${newRating.name_rating} WHERE code_category = '${code}'`,
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({
            kind: "not_found",
          },
          null
        );
        return;
      }

      result(null, {
        code_rating: code,
        ...rating,
      });
    }
  );
};

Rating.remove = (code, result) => {
  sql.query(
    "DELETE FROM Rating_Propped WHERE code_rating = '" + code + "'",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({
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

module.exports = Rating;