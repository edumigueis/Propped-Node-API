const Hasher = require("../data/Hasher.js");

const Favorite = require("../models/Favorite.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const favorite = new Favorite({
    id_user_favorite: req.body.id_user_favorite,
    id_product_favorite: req.body.id_product_favorite,
  });

  if (typeof favorite.id_user_favorite === "undefined" || typeof favorite.id_product_favorite === "undefined") {
    res.status(400).send({
      message: err.message || "Parts of the data weren't given correctly.",
    });
  } else {
    do favorite.code_favorite = Hasher.generateCode();
    while (
      Favorite.findByCode(favorite.code_favorite, (err, data) => {}) == -1
    );
    Favorite.create(favorite, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create favorite.",
        });
      else res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  Favorite.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for favorites.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Favorite.findByCode(req.params.code_favorite, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Favorite with the code ${req.params.code_favorite} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for favorite with the code " +
            req.params.code_favorite,
        });
      }
    } else res.send(data.recordset);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  var favorite = new Favorite(req.body);

  if (typeof favorite.id_user_favorite === "undefined" || typeof favorite.id_product_favorite === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Favorite.updateByCode(
      req.params.code_favorite,
      favorite,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Favorite with the code ${req.params.code_favorite} wasn't found.`,
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update favorite with the following code: " +
                req.params.code_favorite,
            });
          }
        } else res.send(data.recordset);
      }
    );
  }
};

exports.delete = (req, res) => {
  Favorite.remove(req.params.code_favorite, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Favorite with the code ${req.params.code_favorite} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update favorite with the following code: " +
            req.params.code_favorite,
        });
      }
    } else {
      res.send({
        message: `Favorite has been deleted succesfully!`,
      });
    }
  });
};

exports.findByUser = (req, res) => {
  Favorite.findByUser(req.params.id_user_favorite, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Favorite with the user ${req.params.id_user_favorite} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for favorite with the user " +
            req.params.id_user_favorite,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};