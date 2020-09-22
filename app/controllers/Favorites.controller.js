const Favorite = require("../models/Favorite.model.js");

// Cria e salva um novo favorite
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  // Cria um Favorite
  const favorite = new Favorite({
    code_favorite: req.body.code_favorite,
    id_user_favorite: req.body.id_user_favorite,
    id_product_favorite: req.body.id_product_favorite
  });

  // Salva Favorite no banco de dados
  Favorite.create(favorite, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create favorite.",
      });
    else res.send(data);
  });
};

// Pega todos os favorites do banco de dados
exports.findAll = (req, res) => {
  Favorite.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for favorites.",
      });
    else res.send(data);
  });
};

// Achar favorite com ra especifico
exports.findOne = (req, res) => {
  Favorite.findByCode(req.params.code_favorite, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Favorite with the code ${req.params.code_favorite} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for favorite with the code " + req.params.code_favorite,
        });
      }
    } else res.send(data.recordset);
  });
};

// Altera o favorite com ra específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  Favorite.updateByCode(req.params.code_favorite, new Favorite(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Favorite with the code ${req.params.code_favorite} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update favorite with the following code: " + req.params.code_favorite,
        });
      }
    } 
    else res.send(data);
  });
};

// Deleta favorite com ra especifico
exports.delete = (req, res) => {
  Favorite.remove(req.params.code_favorite, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Favorite with the code ${req.params.code_favorite} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update favorite with the following code: " + req.params.code_favorite,
        });
      }
    } else{
      res.send({
        message: `Favorite has been deleted succesfully!`,
      });
    }
  });
};
