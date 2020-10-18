const sql = require("./db.js");

const ProductAttribute = function (productattribute) {
  this.code_productattribute = productattribute.code_productattribute;
  this.id_attribute_productattribute = productattribute.id_attribute_productattribute;
  this.id_product_productattribute = productattribute.id_product_productattribute;
  this.value_productattribute = productattribute.value_productattribute;
  this.available_productattribute = productattribute.available_productattribute;
};

ProductAttribute.create = (newProductAttribute, result) => {
  sql.query(
    `INSERT INTO ProductAttribute_Propped VALUES('${newProductAttribute.code_productattribute}',${newProductAttribute.id_attribute_productattribute},${newProductAttribute.id_product_productattribute},'${newProductAttribute.value_productattribute}',${newProductAttribute.available_productattribute})`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newProductAttribute,
      });
    }
  );
};

ProductAttribute.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM ProductAttribute_Propped WHERE code_productattribute = '${code}'`,
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

ProductAttribute.getAll = (result) => {
  sql.query("SELECT * FROM ProductAttribute_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

ProductAttribute.updateByCode = (code, productattribute, result) => {
  productattribute.code_productattribute = code;
  sql.query(
    `UPDATE ProductAttribute_Propped SET id_attribute_productattribute = ${productattribute.id_attribute_productattribute}, id_product_productattribute = ${productattribute.id_product_productattribute}, value_productattribute = '${productattribute.value_productattribute}', available_productattribute= ${productattribute.available_productattribute}  WHERE code_productattribute = '${code}'`,
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
        code_productattribute: code,
        ...productattribute,
      });
    }
  );
};

ProductAttribute.remove = (code, result) => {
  sql.query(
    "DELETE FROM ProductAttribute_Propped WHERE code_productattribute = '" + code + "'",
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

module.exports = ProductAttribute;
