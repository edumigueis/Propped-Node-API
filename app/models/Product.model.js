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

Product.findByParams = (name, idCategory, idSubcategory, filters, result) => {
  if (
    name != "" &&
    idCategory == -1 &&
    idSubcategory == -1 &&
    filters.length == 0
  ) {
    sql.query(
      `SELECT * FROM Product_Propped WHERE name_product like '%${name}%'`,
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
  } else if (
    name != "" &&
    idCategory > -1 &&
    idSubcategory == -1 &&
    filters.length == 0
  ) {
    sql.query(
      `SELECT * FROM Product_Propped WHERE name_product like '%${name}%' and id_category_product = ${id}`,
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
  } else if (
    name != "" &&
    idCategory > -1 &&
    idSubcategory > -1 &&
    filters.length == 0
  ) {
    sql.query(
      `SELECT * FROM Product_Propped WHERE name_product like '%${name}%' and id_category_product = ${idCategory} and id_subcategory_product = ${idSubcategory}`,
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
  } else if (
    name == "" &&
    idCategory > -1 &&
    idSubcategory == -1 &&
    filters.length == 0
  ) {
    sql.query(
      `SELECT * FROM Product_Propped WHERE id_category_product = ${id}`,
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
  } else if (
    name == "" &&
    idCategory > -1 &&
    idSubcategory > -1 &&
    filters.length == 0
  ) {
    sql.query(
      `SELECT * FROM Product_Propped WHERE id_category_product = ${idCategory} and id_subcategory_product = ${idSubcategory}`,
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
    )
  } else if (
    name != "" &&
    idCategory == -1 &&
    idSubcategory == -1 &&
    filters.length > 0
  ) {
    sql.query(
      `DECLARE @list_of_attributes AS Attribute_Values_List`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        } else {
          for (var i in filters) {
            sql.query(
              `INSERT INTO @list_of_attributes VALUES (${filters[i][0]}, '${filters[i][1]}')`,
              (err, res) => {
                if (err) {
                  result(err, null);
                  return;
                }
              }
            )

            if (i == filters.length) {
              sql.query(
                `EXEC sp_Propped_Search_by_Name_and_Filters @name='${name}', @list=@list_of_attributes`,
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
              )
            }
          }
        }
      }
    )
  } else if (
    name != "" &&
    idCategory > -1 &&
    idSubcategory == -1 &&
    filters.length > 0
  ) {
    sql.query(
      `DECLARE @list_of_attributes AS Attribute_Values_List`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        } else {
          for (var i in filters) {
            sql.query(
              `INSERT INTO @list_of_attributes VALUES (${filters[i][0]}, '${filters[i][1]}')`,
              (err, res) => {
                if (err) {
                  result(err, null);
                  return;
                }
              }
            )

            if (i == filters.length) {
              sql.query(
                `EXEC sp_Search_by_Name_and_Category_and_Filters @name='${name}', @category=${idCategory}, @list=@list_of_attributes`,
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
              )
            }
          }
        }
      }
    )
  } else if (
    name != "" &&
    idCategory > -1 &&
    idSubcategory > -1 &&
    filters.length > 0
  ) {
    sql.query(
      `DECLARE @list_of_attributes AS Attribute_Values_List`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        } else {
          for (var i in filters) {
            sql.query(
              `INSERT INTO @list_of_attributes VALUES (${filters[i][0]}, '${filters[i][1]}')`,
              (err, res) => {
                if (err) {
                  result(err, null);
                  return;
                }
              }
            )

            if (i == filters.length) {
              sql.query(
                `EXEC sp_Propped_Search_by_Name_and_Category_and_Subcategory_and_Filters @name='${name}', @category=${idCategory}, @subcategory=${idSubcategory}, @list=@list_of_attributes`,
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
              )
            }
          }
        }
      }
    )
  } else if (
    name == "" &&
    idCategory > -1 &&
    idSubcategory == -1 &&
    filters.length > 0
  ) {
    sql.query(
      `DECLARE @list_of_attributes AS Attribute_Values_List`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        } else {
          for (var i in filters) {
            sql.query(
              `INSERT INTO @list_of_attributes VALUES (${filters[i][0]}, '${filters[i][1]}')`,
              (err, res) => {
                if (err) {
                  result(err, null);
                  return;
                }
              }
            )

            if (i == filters.length) {
              sql.query(
                `EXEC sp_Propped_Search_by_Category_and_Filters @category=${idCategory}, @list=@list_of_attributes`,
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
              )
            }
          }
        }
      }
    )
  } else if (
    name == "" &&
    idCategory > -1 &&
    idSubcategory > -1 &&
    filters.length > 0
  ) {
    sql.query(
      `DECLARE @list_of_attributes AS Attribute_Values_List`,
      (err, res) => {
        if (err) {
          result(err, null);
          return;
        } else {
          for (var i in filters) {
            sql.query(
              `INSERT INTO @list_of_attributes VALUES (${filters[i][0]}, '${filters[i][1]}')`,
              (err, res) => {
                if (err) {
                  result(err, null);
                  return;
                }
              }
            );

            if (i == filters.length) {
              sql.query(
                `EXEC sp_Propped_Search_by_Category_and_Subcategory_and_Filters @category=${idCategory}, @subcategory=${idSubcategory}, @list=@list_of_attributes`,
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
              )
            }
          }
        }
      }
    )
  } else {
    result({
        kind: "bad_request",
      },
      null
    );

    return;
  }
}

Product.findByStore = (id, result) => {
  sql.query(
    `SELECT * FROM Product_Propped WHERE id_store_product = ${id}`,
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
  )
}

module.exports = Product;