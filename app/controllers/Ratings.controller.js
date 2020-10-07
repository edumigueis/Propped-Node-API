const Hasher = require("../data/Hasher.js");

const Rating = require("../models/Rating.model.js");
const UsersRating = require("../models/UsersRating.model.js");

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Empty params"
    });
  }

  const rating = new Rating({
    stars_rating: req.body.stars_rating
  });

  const usersrating = new UsersRating({
    id_user_usersrating: req.body.id_user_usersrating,
    id_store_usersrating: req.body.id_store_usersrating,
  });

  if (typeof rating.stars_rating === "undefined" || typeof usersrating.id_user_usersrating === "undefined" || typeof usersrating.id_store_usersrating === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do rating.code_rating = Hasher.generateCode();
    while (
      Rating.findByCode(rating.code_rating, (err, data) => {}) == -1
    );
    Rating.create(rating, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create rating."
        });
      else {
        do usersrating.code_usersrating = Hasher.generateCode();
        while (
          UsersRating.findByCode(usersrating.code_usersrating, (err, data) => {}) == -1
        );
        usersrating.id_rating_usersrating = data.recordset[0].id_rating;
        UsersRating.create(usersrating, (err, data) => {
          if (err)
            res.status(500).send({
              message: err.message || "Error while trying to create rating."
            });
          else {
            res.send(data.recordset);
          }
        })
      }
    });
  }
};

exports.findAll = (req, res) => {
  Rating.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for ratings."
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Rating.findByCode(req.params.code_rating, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Rating with the code ${req.params.code_rating} wasn't found.`
        });
      } else {
        res.status(500).send({
          message: "Error while searching for rating with the code " +
            req.params.code_rating
        });
      }
    } else {
      UsersRating.findByIdRating(data.recordset[0].id_rating, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Rating(user) with the code ${req.params.code_rating} wasn't found.`
            });
          } else {
            res.status(500).send({
              message: "Error while searching for rating(user) with the code " +
                req.params.code_rating
            });
          }
        } else {
          res.send(data.recordset);
        }
      });
    }
  });
};

exports.findAllByUser = (req, res) => {
  UsersRating.findByIdUser(req.params.id_user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Rating(user) with the user with the id ${req.params.id_user} wasn't found.`
        });
      } else {
        res.status(500).send({
          message: "Error while searching for rating(user) with the user with the id " +
            req.params.id_user
        });
      }
    } else
      res.send(data.recordset);
  });
};

exports.findAllByStore = (req, res) => {
  UsersRating.findByIdStore(req.params.id_store, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Rating(user) with the store with the id ${req.params.id_store} wasn't found.`
        });
      } else {
        res.status(500).send({
          message: "Error while searching for rating(user) with the store with the id " +
            req.params.id_user
        });
      }
    } else res.send(data.recordset);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Body of request can not be empty."
    });
  }

  var rating = new Rating(req.body);

  if (typeof rating.stars_rating === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Rating.updateByCode(
      req.params.code_rating,
      rating,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Rating with the code ${req.params.code_rating} wasn't found.`
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update rating with the following code: " +
                req.params.code_rating,
            });
          }
        } else res.send(data.recordset);
      }
    );
  }
};

exports.delete = (req, res) => {
  Rating.findByCode(req.params.code_rating, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Rating with the code ${req.params.code_rating} wasn't found.`
        });
      } else {
        res.status(500).send({
          message: "Error while searching for rating with the code " +
            req.params.code_rating
        });
      }
    } else {
      UsersRating.removeByIdRating(data.recordset[0].id_rating, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Rating(user) with the user with the id ${data.recordset[0].id_rating} wasn't found.`
            });
          } else {
            res.status(500).send({
              message: "Error when trying to delete rating(user) with the user with the following id: " +
                data.recordset[0].id_rating,
            });
          }
        } else {
          Rating.remove(req.params.code_rating, (err, data) => {
            if (err) {
              res.status(500).send({
                message: "Error when trying to delete rating with the following code: " +
                  req.params.code_rating,
              });
            } else res.send({
              message: `Rating has been deleted succesfully!`,
            });
          });
        }
      });
    }
  });
};