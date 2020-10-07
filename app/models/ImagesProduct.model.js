const sql = require("./db.js");

const ImagesProduct = function (imagesproduct) {
  this.code_imagesproduct = imagesproduct.code_imagesproduct;
  this.id_image_imagesproduct = imagesproduct.id_image_imagesproduct;
  this.id_product_imagesproduct = imagesproduct.id_product_imagesproduct;
};

ImagesProduct.create = (newImagesProduct, result) => {
  sql.query(
    `INSERT INTO ImagesProduct_Propped VALUES('${newImagesProduct.code_imagesproduct}',${newImagesProduct.id_image_imagesproduct},${newImagesProduct.id_product_imagesproduct})`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newImagesProduct,
      });
    }
  );
};

ImagesProduct.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM ImagesProduct_Propped WHERE code_imagesproduct = '${code}'`,
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

ImagesProduct.getAll = (result) => {
  sql.query("SELECT * FROM ImagesProduct_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

ImagesProduct.updateByCode = (code, imagesproduct, result) => {
  imagesproduct.code_imagesproduct = code;
  sql.query(
    `UPDATE ImagesProduct_Propped SET id_image_imagesproduct = ${imagesproduct.id_image_imagesproduct}, id_product_imagesproduct = ${imagesproduct.id_product_imagesproduct} WHERE code_imagesproduct = '${code}'`,
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
        code_imagesproduct: code,
        ...imagesproduct,
      });
    }
  );
};

ImagesProduct.remove = (code, result) => {
  sql.query(
    "DELETE FROM ImagesProduct_Propped WHERE code_imagesproduct = '" + code + "'",
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

module.exports = ImagesProduct;
