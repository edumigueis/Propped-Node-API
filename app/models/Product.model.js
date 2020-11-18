const sql = require("./db.js");

const Product = function (product) {
  this.code_product = product.code_product;
  this.id_store_product = product.id_store_product;
  this.id_category_product = product.id_category_product;
  this.id_subcategory_product = product.id_subcategory_product;
  this.name_product = product.name_product;
  this.description_product = product.description_product;
  this.weight_product = product.weight_product;
  this.price_product = product.price_product;
  this.stock_product = product.stock_product;
};

Product.create = (newProduct, result) => {
  sql.query(
    `INSERT INTO Product_Propped OUTPUT INSERTED.* VALUES(${newProduct.id_store_product},${newProduct.id_category_product},${newProduct.id_subcategory_product},'${newProduct.name_product}','${newProduct.description_product}',${newProduct.weight_product},${newProduct.price_product}, ${newProduct.stock_product},'${newProduct.code_product}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Product.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM Product_Propped WHERE code_product = '${code}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        result(null, res);
        return;
      }

      result({
          kind: "not_found",
        },
        null
      );

      return -1;
    }
  );
};

Product.getAll = (result) => {
  sql.query("SELECT * FROM Product_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};


Product.findByParams = (name, idCategory, idSubcategory, filters, result) => {
  sql.query(
    `SELECT DISTINCT p.*
    FROM 
    Product_Propped p, Attribute_Propped a, ProductAttribute_Propped pa 
    WHERE 
    (a.name_attribute like 'Color' or a.name_attribute like 'Size' or a.name_attribute like 'Occasion') and 
    (pa.value_productattribute like 'Yellow' or pa.value_productattribute like 'm' or pa.value_productattribute like 'Travel') and
    a.id_attribute = pa.id_attribute_productattribute and 
    pa.id_product_productattribute = p.id_product and 
    (p.price_product >= 0 and p.price_product <= 100000)`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        result(null, res);
        return;
      }

      result({
          kind: "not_found",
        },
        null
      );

      return -1;
    }
  );
}

Product.findByStore = (id_store_product, result) => {
  sql.query(
    `SELECT * FROM Product_Propped WHERE id_store_product = ${id_store_product}`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        result(null, res);
        return;
      }

      result({
          kind: "not_found",
        },
        null
      );

      return -1;
    }
  );
};

Product.findById = (id, result) => {
  sql.query(
    `SELECT * FROM Product_Propped WHERE id_product = ${id}`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        result(null, res);
        return;
      }

      result({
          kind: "not_found",
        },
        null
      );

      return -1;
    }
  );
};

Product.updateByCode = (code, product, result) => {
  product.code_product = code;
  sql.query(
    `UPDATE Product_Propped SET id_store_product = ${product.id_store_product}, id_category_product = ${product.id_category_product}, id_subcategory_product = ${product.id_subcategory_product}, name_product= '${product.name_product}', description_product= '${product.description_product}', weight_product= ${product.weight_product}, price_product= ${product.price_product}, stock_product = '${product.stock_product}'  WHERE code_product = '${code}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
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
        code_product: code,
        ...product,
      });
    }
  );
};

Product.remove = (code, result) => {
  sql.query(
    "DELETE FROM Product_Propped WHERE code_product = '" + code + "'",
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

module.exports = Product;