const Hasher = require("../data/Hasher.js");

const User = require("../models/User.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  const user = new User({
    name_user: req.body.name_user,
    email_user: req.body.email_user,
    pass_user: req.body.pass_user,
    gender_user: req.body.gender_user,
    birth_date_user: req.body.birth_date_user,
    registry_user: req.body.registry_user,
    phone_user: req.body.phone_user,
    image_user: req.body.image_user,
    preference_user: req.body.preference_user,
  });

  if (typeof user.name_user === "undefined" || typeof user.email_user === "undefined" || typeof user.pass_user === "undefined" || typeof user.gender_user === "undefined" || typeof user.birth_date_user === "undefined" || typeof user.registry_user === "undefined" || typeof user.phone_user === "undefined" || typeof user.image_user === "undefined" || typeof user.preference_user === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do user.code_user = Hasher.generateCode();
    while (User.findByCode(user.code_user, (err, data) => {}) == -1);
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create user.",
        });
      else {
        res.status(201);
        res.send(data.recordset);
      }
    });
  }
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for users.",
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  User.findByCode(req.params.code_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with the code ${req.params.code_user} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for user with the code " +
            req.params.code_user,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty.",
    });
  }

  var user = new User(req.body);

  if (typeof user.name_user === "undefined" || typeof user.email_user === "undefined" || typeof user.pass_user === "undefined" || typeof user.gender_user === "undefined" || typeof user.birth_date_user === "undefined" || typeof user.registry_user === "undefined" || typeof user.phone_user === "undefined" || typeof user.image_user === "undefined" || typeof user.preference_user === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    User.updateByCode(req.params.code_user, user, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `User with the code ${req.params.code_user} wasn't found.`,
          });
        } else {
          res.status(500).send({
            message: "Error when trying to update user with the following code: " +
              req.params.code_user,
          });
        }
      } else res.send(data.recordset);
    });
  }
};

exports.delete = (req, res) => {
  User.remove(req.params.code_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with the code ${req.params.code_user} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update user with the following code: " +
            req.params.code_user,
        });
      }
    } else {
      res.send({
        message: `User has been deleted succesfully!`,
      });
    }
  });
};

exports.login = (req, res) => {
  User.findByLoginData(req.params.email_user, req.params.pass_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User with the email ${req.params.email_user} wasn't found.`,
        });
      } else if (err.kind === "wrong_password") {
        res.status(403).send({
          message: `User with the email ${req.params.email_user} doesn´t have this password.`
        });
      } else {
        res.status(500).send({
          message: "Error when trying to verify user with this email and password."
        });
      }
    } else {
      res.send({
        message: `All data is correct! User will be logged in.`,
      });
    }
  })
};