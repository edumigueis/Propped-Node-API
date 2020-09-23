const sql = require("./db.js");

const Category = function (category) {
  this.code_category = category.code_category;
  this.name_category = category.name_category;
};

Category.create = (newCategory, result) => {
  sql.query(
    `INSERT INTO Category_Propped VALUES('${newCategory.code_category}','${newCategory.name_category}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newCategory,
      });
    }
  );
};

Category.findByCode = (categoryCODE, result) => {
  sql.query(
    `SELECT * FROM Category_Propped WHERE code_category = '${categoryCODE}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length > 0) {
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

Category.getAll = (result) => {
  sql.query("SELECT * FROM Category_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Category.updateByCode = (cod, category, result) => {
  category.code_category = cod;
  sql.query(
    `UPDATE Category_Propped SET name_category = '${category.name_category}' WHERE code_category = '${cod}'`,
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
        code_category: cod,
        ...category,
      });
    }
  );
};

Category.remove = (code, result) => {
  sql.query(
    "DELETE FROM Category_Propped WHERE code_category = '" + code + "'",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a category com esse cod
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

module.exports = Category;
