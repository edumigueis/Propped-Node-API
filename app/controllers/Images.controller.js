const Hasher = require("../data/Hasher.js");

const Image = require("../models/Image.model.js");

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Empty params"
    });
  }

  const image = new Image({
    photo_image: req.body.photo_image,
  });

  if (typeof image.photo_image === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    do image.code_image = Hasher.generateCode();
    while (
      Image.findByCode(favorite.code_image, (err, data) => {}) == -1
    );
    Image.create(image, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Error while trying to create image."
        });
      else res.send(data.recordset);
    });
  }
};

exports.findAll = (req, res) => {
  Image.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for images."
      });
    else res.send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Image.findByCode(req.params.code_image, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Image with the code ${req.params.code_image} wasn't found.`
        });
      } else {
        res.status(500).send({
          message: "Error while searching for image with the code " +
            req.params.code_image
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

  var image = new Image(req.body);

  if (typeof image.photo_image === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Image.updateByCode(
      req.params.code_image,
      image,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Image with the code ${req.params.code_image} wasn't found.`
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update image with the following code: " +
                req.params.code_image,
            });
          }
        } else res.send(data.recordset);
      }
    );
  }
};

exports.delete = (req, res) => {
  Image.remove(req.params.code_image, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Image with the code ${req.params.code_image} wasn't found.`
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update image with the following code: " +
            req.params.code_image,
        });
      }
    } else res.send({
      message: `Image has been deleted succesfully!`,
    });
  });
};