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
  this.color_product = product.color_product;
  this.size_product = product.size_product;
  this.occasion_product = product.occasion_product;
};

Product.create = (newProduct, result) => {
  sql.query(
    `INSERT INTO Product_Propped OUTPUT INSERTED.* VALUES(${newProduct.id_store_product},${newProduct.id_category_product},${newProduct.id_subcategory_product},'${newProduct.name_product}','${newProduct.description_product}',${newProduct.weight_product},${newProduct.price_product}, ${newProduct.stock_product},'${newProduct.code_product}','${newProduct.color_product}','${newProduct.size_product}','${newProduct.occasion_product}')`,
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
  if (name == "")
    name = "%";

  if (idCategory != -1)
    idCategory = `p.id_category_product = ${idCategory}`;
  else
    idCategory = "(p.id_category_product >= 0 and p.id_category_product <= 2147483647)";

  if (idSubcategory != -1)
    idSubcategory = `p.id_subcategory_product = ${idSubcategory}`;
  else
    idSubcategory = "(p.id_subcategory_product >= 0 and p.id_subcategory_product <= 2147483647)";

  if (filters[0] == "")
    filters[0] = "%";

  if (filters[1] == -1)
    filters[1] = "(p.price_product >= 0 and p.price_product <= 2147483647)";
  else if (filters[1].toString().includes(' '))
    filters[1] = `(p.price_product >= ${filters[1].toString().split(' ')[0]} and p.price_product <= ${filters[1].toString().split(' ')[1]})`;
  else
    filters[1] = `(p.price_product >= ${filters[1]} and p.price_product <= ${filters[1]})`;

  if (filters[2] == "")
    filters[2] = "%";

  if (filters[3] == "")
    filters[3] = "%";

  let query = `SELECT DISTINCT p.* FROM Product_Propped p, Attribute_Propped a, ProductAttribute_Propped pa WHERE 
    (p.color_product like '%${filters[0]}%') and (p.size_product like '%${filters[3]}%') and (p.occasion_product like '${filters[2]}') and a.id_attribute = pa.id_attribute_productattribute and pa.id_product_productattribute = p.id_product and ${filters[1]} and p.name_product like '%${name}%' and ${idCategory} and ${idSubcategory}`;

  sql.query(
    query,
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
    `UPDATE Product_Propped SET id_store_product = ${product.id_store_product}, id_category_product = ${product.id_category_product}, id_subcategory_product = ${product.id_subcategory_product}, name_product= '${product.name_product}', description_product= '${product.description_product}', weight_product= ${product.weight_product}, price_product= ${product.price_product}, stock_product = '${product.stock_product}', color_product = '${product.color_product}', size_product = '${product.size_product}', occasion_product = '${product.occasion_product}'  WHERE code_product = '${code}'`,
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