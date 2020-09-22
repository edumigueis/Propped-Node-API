const sql = require("./db.js");

// Construtor
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
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        console.log("Category found: ", res);
        result(null, res);
        return;
      }

      // Não achou a category com o cod
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

Category.getAll = (result) => {
  sql.query("SELECT * FROM Category_Propped", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("categorys: ", res.recordset);
    result(null, res.recordset);
  });
};

Category.updateByCode = (cod, category, result) => {
  category.code_category = cod;
  sql.query(
    `UPDATE Category_Propped SET name_category = '${category.name_category}' WHERE code_category = '${cod}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
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

      console.log("updated category: ", {
        ...category,
      });
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
        console.log("error: ", err);
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

      console.log("Category with code: ", code, " was deleted");
      result(null, res);
    }
  );
};

module.exports = Category;
