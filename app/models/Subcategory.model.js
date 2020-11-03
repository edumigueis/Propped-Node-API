const sql = require("./db.js");

const Subcategory = function (subcategory) {
  this.code_category = subcategory.code_category;
  this.id_category_subcategory = subcategory.id_category_subcategory;
  this.name_subcategory = subcategory.name_subcategory;
};

Subcategory.create = (newSubcategory, result) => {
  sql.query(
    `INSERT INTO Subcategory_Propped VALUES('${newSubcategory.code_subcategory}',${newSubcategory.id_category_subcategory},'${newSubcategory.name_subcategory}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newSubcategory,
      });
    }
  );
};

Subcategory.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM Subcategory_Propped WHERE code_subcategory = '${code}'`,
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

Subcategory.findByCategory = (id_category_subcategory, result) => {
  sql.query(
    `SELECT * FROM Subcategory_Propped WHERE id_category_subcategory = ${id_category_subcategory}`,
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

Subcategory.getAll = (result) => {
  sql.query("SELECT * FROM Subcategory_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Subcategory.updateByCode = (code, subcategory, result) => {
  subcategory.code_subcategory = code;
  sql.query(
    `UPDATE Subcategory_Propped SET id_category_subcategory = ${newSubcategory.id_category_subcategory}, name_category = '${subcategory.name_category}' WHERE code_category = '${code}'`,
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
        code_subcategory: code,
        ...subcategory,
      });
    }
  );
};

Subcategory.remove = (code, result) => {
  sql.query(
    "DELETE FROM Subcategory_Propped WHERE code_subcategory = '" + code + "'",
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

module.exports = Subcategory;
