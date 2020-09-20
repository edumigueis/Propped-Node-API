const User = require("../models/User.model.js");

// Cria e salva um novo user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  // Cria um User
  const user = new User({
    code_user: req.body.code_user,
    name_user: req.body.name_user,
    email_user: req.body.email_user,
    pass_user: req.body.pass_user,
    gender_user: req.body.gender_user,
    birth_date_user: req.body.birth_date_user,
    registry_user: req.body.registry_user,
    phone_user: req.body.phone_user,
    image_user: req.body.image_user,
    preference_user: req.body.preference_user
  });

  // Salva User no banco de dados
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create user.",
      });
    else res.send(data.recordset);
  });
};

// Pega todos os users do banco de dados
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for users.",
      });
    else res.send(data.recordset);
  });
};

// Achar user com ra especifico
exports.findOne = (req, res) => {
  User.findByCode(req.params.code_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with the code ${req.params.code_user} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for user with the code " + req.params.code_user,
        });
      }
    } else res.send(data);
  });
};

// Altera o user com ra específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  User.updateByCode(req.params.code_user, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with the code ${req.params.code_user} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update user with the following code: " + req.params.code_user,
        });
      }
    } else res.send(data.recordset);
  });
};

// Deleta user com ra especifico
exports.delete = (req, res) => {
  User.remove(req.params.code_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with the code ${req.params.code_user} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update user with the following code: " + req.params.code_user,
        });
      }
    } else{
      res.send({
        message: `User has been deleted succesfully!`,
      });
    }
  });
};