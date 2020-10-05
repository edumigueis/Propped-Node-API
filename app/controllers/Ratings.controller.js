const Hasher = require("../data/Hasher.js");

const Rating = require("../models/Rating.model.js");

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Empty params"
    });
  }

  const rating = new Rating({
    code_rating: req.body.code_rating,
    stars_rating: req.body.stars_rating,
  });

  Rating.create(rating, (err, data) => {
    do rating.code_rating = Hasher.generateCode();
    while (
      Rating.findByCode(favorite.code_rating, (err, data) => {}) == -1
    );

    if (err)
      res.status(500).send({
        message: err.message || "Error while trying to create rating."
      });
    else res.send(data.recordset);
  });
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
          message:
            "Error while searching for rating with the code " +
            req.params.code_rating
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

  Rating.updateByCode(
    req.params.code_rating,
    new Rating(req.body),
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
};

exports.delete = (req, res) => {
  Rating.remove(req.params.code_rating, (err, data) => {
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
    } else res.send({
      message: `Rating has been deleted succesfully!`,
    });
  });
};
