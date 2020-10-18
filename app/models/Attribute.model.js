const sql = require("./db.js");

const Attribute = function (attribute) {
  this.code_attribute = attribute.code_attribute;
  this.name_attribute = attribute.name_attribute;
};

Attribute.create = (newAttribute, result) => {
  sql.query(
    `INSERT INTO Attribute_Propped VALUES('${newAttribute.code_attribute}','${newAttribute.name_attribute}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newAttribute,
      });
    }
  );
};

Attribute.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM Attribute_Propped WHERE code_attribute = '${code}'`,
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

Attribute.getAll = (result) => {
  sql.query("SELECT * FROM Attribute_Propped", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("attributes: ", res);
    result(null, res);
  });
};

Attribute.updateByCode = (code, attribute, result) => {
  attribute.code_attribute = code;
  sql.query(
    `UPDATE Attribute_Propped SET name_attribute = '${attribute.name_attribute}' WHERE code_attribute = '${code}'`,
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
        code_attribute: code,
        ...attribute,
      });
    }
  );
};

Attribute.remove = (code, result) => {
  sql.query(
    "DELETE FROM Attribute_Propped WHERE code_attribute = '" + code + "'",
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

Attribute.findByName = (name, result) => {
  sql.query(
    `SELECT * FROM Attribute_Propped WHERE name_attribute = '${name}'`,
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

module.exports = Attribute;
