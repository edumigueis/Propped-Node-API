const sql = require("./db.js");

const Image = function (image) {
  this.code_image = image.code_image;
  this.photo_image = image.photo_image;
};

Image.create = (newImage, result) => {
  sql.query(
    `INSERT INTO Image_Propped OUTPUT INSERTED.* VALUES('${newImage.photo_image}', '${newImage.code_image}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Image.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM Image_Propped WHERE code_image = '${code}'`,
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

Image.getAll = (result) => {
  sql.query("SELECT * FROM Image_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Image.findById = (id, result) => {
  sql.query(
    `SELECT * FROM Image_Propped WHERE id_image = ${id}`,
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

Image.updateByCode = (code, image, result) => {
  image.code_image = code;
  sql.query(
    `UPDATE Image_Propped SET photo_image = '${image.photo_image}' WHERE code_category = '${code}'`,
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
        code_image: code,
        ...image,
      });
    }
  );
};

Image.remove = (code, result) => {
  sql.query(
    "DELETE FROM Image_Propped WHERE code_image = '" + code + "'",
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

module.exports = Image;
