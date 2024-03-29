const Hasher = require("../data/Hasher.js");

const Product = require("../models/Product.model.js");
const ProductAttribute = require("../models/ProductAttribute.model.js");
const ImagesProduct = require("../models/ImagesProduct.model.js");
const Image = require("../models/Image.model.js");
const Attribute = require("../models/Attribute.model.js");

exports.create = (req, res) => {

  var erro = null;
  var passou = false;

  if (!req.body) {
    res.status(400).send({
      message: "Empty params",
    });
  }

  if (req.body.attributes.name_attribute.length != req.body.attributes.attribute.length) {
    erro = '400';
  } else {
    const product = new Product({
      id_store_product: req.body.id_store_product,
      id_category_product: req.body.id_category_product,
      id_subcategory_product: req.body.id_subcategory_product,
      name_product: req.body.name_product,
      description_product: req.body.description_product,
      weight_product: req.body.weight_product,
      price_product: req.body.price_product,
      stock_product: req.body.stock_product,
      color_product: req.body.color_product,
      size_product: req.body.size_product,
      occasion_product: req.body.occasion_product
    });

    if (typeof product.id_store_product === "undefined" || typeof product.id_category_product === "undefined" || typeof product.id_subcategory_product === "undefined" || typeof product.name_product === "undefined" || typeof product.description_product === "undefined" || typeof product.weight_product === "undefined" || typeof product.price_product === "undefined" || typeof product.stock_product === "undefined" || typeof product.size_product === "undefined" || typeof product.color_product === "undefined" || typeof product.occasion_product === "undefined") {
      erro = '400';
    } else {
      do product.code_product = Hasher.generateCode();
      while (Product.findByCode(product.code_product, (err, data) => {}) == -1);

      Product.create(product, (err, data0) => {
        if (err) {
          res.status(500).send({
            message: err.message || "Error while trying to create product."
          });
        } else {
         /* if (req.body.attributes.name_attribute.length < req.body.images.length) {
            var i = -1;*/
            for (var i2 = 0; i2 < req.body.images.length; i2++) {
             /* if (i < req.body.attributes.name_attribute.length - 1)
                i++;

              let productAttribute = new ProductAttribute({
                value_productattribute: req.body.attributes.attribute[i].value_productattribute,
                available_productattribute: req.body.attributes.attribute[i].available_productattribute
              });

              let image;
              if (i2 <= req.body.images.length) {*/
                image = new Image({
                  photo_image: req.body.images[i2]
                });
              //}

              if (/*typeof productAttribute.value_productattribute === "undefined" || typeof productAttribute.available_productattribute === "undefined" || typeof req.body.attributes.name_attribute[i] === "undefined" || */typeof req.body.images[i2] === "undefined") {
                erro = '400';
              } else {

                /*Attribute.findByName(req.body.attributes.name_attribute[i], (err, data1) => {

                  if (err)
                    erro = err;
                  else {

                    do productAttribute.code_productattribute = Hasher.generateCode();
                    while (ProductAttribute.findByCode(productAttribute.code_productattribute, (err, data2) => {}) == -1);

                    productAttribute.id_product_productattribute = data0.recordset[0].id_product;
                    productAttribute.id_attribute_productattribute = data1.recordset[0].id_attribute;

                    ProductAttribute.create(productAttribute, (err, data3) => {
                      if (err) {
                        erro = err;
                      } else {
                        if (i2 <= req.body.images.length) {*/
                          do image.code_image = Hasher.generateCode();
                          while (Image.findByCode(image.code_image, (err, data4) => {}) == -1);

                          Image.create(image, (err, data5) => {
                            if (err) {
                              erro = err;
                            } else {

                              let imageProduct = new ImagesProduct({
                                id_image_imagesproduct: data5.recordset[0].id_image,
                                id_product_imagesproduct: data0.recordset[0].id_product
                              });
                              do imageProduct.code_imagesproduct = Hasher.generateCode();
                              while (ImagesProduct.findByCode(imageProduct.code_imagesproduct, (err, data6) => {}) == -1);

                              ImagesProduct.create(imageProduct, (err, data7) => {
                                if (err) {
                                  erro = err;
                                }
                                if (!passou) {
                                  passou = true;
                                  if (erro != null) {
                                    if (erro == '400') {
                                      res.status(400).send({
                                        message: "Parts of the data weren't given correctly.",
                                      });
                                    } else if (erro.kind === "not_found") {
                                      res.status(404).send({
                                        message: `Attribute with the name ${req.body.attributes.name_attribute[i]} wasn't found.`
                                      });
                                    } else {
                                      res.status(500).send({
                                        message: err.message || "Error while trying to create product."
                                      });
                                    }
                                  } else
                                    res.status(201).send(data0.recordset);
                                }
                              })
                            }
                          })
                        /*}
                      }
                    })
                  }
                })*/
              }
            }
          } /*else {
            var i2 = -1;
            for (var i = 0; i < req.body.attributes.name_attribute.length; i++) {
              if (i2 < req.body.images.length - 1)
                i2++;

              let productAttribute = new ProductAttribute({
                value_productattribute: req.body.attributes.attribute[i].value_productattribute,
                available_productattribute: req.body.attributes.attribute[i].available_productattribute
              });

              let image;
              if (i2 <= req.body.images.length) {
                image = new Image({
                  photo_image: req.body.images[i2]
                });
              }

              if (typeof productAttribute.value_productattribute === "undefined" || typeof productAttribute.available_productattribute === "undefined" || typeof req.body.attributes.name_attribute[i] === "undefined" || typeof req.body.images[i2] === "undefined") {
                erro = '400';
              } else {

                Attribute.findByName(req.body.attributes.name_attribute[i], (err, data1) => {

                  if (err)
                    erro = err;
                  else {

                    do productAttribute.code_productattribute = Hasher.generateCode();
                    while (ProductAttribute.findByCode(productAttribute.code_productattribute, (err, data2) => {}) == -1);

                    productAttribute.id_product_productattribute = data0.recordset[0].id_product;
                    productAttribute.id_attribute_productattribute = data1.recordset[0].id_attribute;

                    ProductAttribute.create(productAttribute, (err, data3) => {
                      if (err) {
                        erro = err;
                      } else {
                        if (i2 <= req.body.images.length) {
                          do image.code_image = Hasher.generateCode();
                          while (Image.findByCode(image.code_image, (err, data4) => {}) == -1);

                          Image.create(image, (err, data5) => {
                            if (err) {
                              erro = err;
                            } else {

                              let imageProduct = new ImagesProduct({
                                id_image_imagesproduct: data5.recordset[0].id_image,
                                id_product_imagesproduct: data0.recordset[0].id_product
                              });
                              do imageProduct.code_imagesproduct = Hasher.generateCode();
                              while (ImagesProduct.findByCode(imageProduct.code_imagesproduct, (err, data6) => {}) == -1);

                              ImagesProduct.create(imageProduct, (err, data7) => {
                                if (err) {
                                  erro = err;
                                }
                                if (!passou) {
                                  passou = true;
                                  if (erro != null) {
                                    if (erro == '400') {
                                      res.status(400).send({
                                        message: "Parts of the data weren't given correctly.",
                                      });
                                    } else if (erro.kind === "not_found") {
                                      res.status(404).send({
                                        message: `Attribute with the name ${req.body.attributes.name_attribute[i]} wasn't found.`
                                      });
                                    } else {
                                      res.status(500).send({
                                        message: err.message || "Error while trying to create product."
                                      });
                                    }
                                  } else
                                    res.status(201).send(data0.recordset);
                                }
                              })
                            }
                          })
                        }
                      }
                    })
                  }
                })
              }
            }
          }
        }*/
      })
    }
  }
}

exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Error while searching for products.",
      });
    else res.status(200).send(data.recordset);
  });
};

exports.findOne = (req, res) => {
  Product.findByCode(req.params.code_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the code ${req.params.code_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for product with the code " +
            req.params.code_product,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.findById = (req, res) => {
  Product.findById(req.params.id_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the id ${req.params.id_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for product with the id " +
            req.params.id_product,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.findByName = (req, res) => {
  Product.findByName(req.params.name_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the name ${req.params.name_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for product with the name " +
            req.params.name_product,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.findByStore = (req, res) => {
  Product.findByStore(req.params.id_store_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the store ${req.params.id_store_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for product with the store " +
            req.params.id_store_product,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.findByParams = (req, res) => {

  if (typeof req.body.name_product === "undefined" || typeof req.body.id_category_product === "undefined" || typeof req.body.id_subcategory_product === "undefined" || typeof req.body.filters_product === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Product.findByParams(req.body.name_product, req.body.id_category_product, req.body.id_subcategory_product,
      req.body.filters_product, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Product with these attributes wasn't found.`,
            });
          } else if (err.kind === "bad_request") {
            res.status(400).send({
              message: `Invalid parameters were entered to search a product.`,
            });
          } else {
            res.status(500).send({
              message: "Error while searching for product with these attributes",
            });
          }
        } else res.status(200).send(data.recordset);
      });
  }
};

exports.findAllImages = (req, res) => {
  ImagesProduct.findAllImagesByProduct(req.params.id_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the id ${req.params.id_product} do not have images.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for images of product with the id " +
            req.params.id_product,
        });
      }
    } else res.status(200).send(data.recordset);
  });
};

exports.findFirstImage = (req, res) => {
  ImagesProduct.findFirstImageByProduct(req.params.id_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the id ${req.params.id_product} do not have images.`,
        });
      } else {
        res.status(500).send({
          message: "Error while searching for image of product with the id " +
            req.params.id_product,
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

  var product = new Product(req.body);

  if (typeof product.id_store_product === "undefined" || typeof product.id_category_product === "undefined" || typeof product.id_subcategory_product === "undefined" || typeof product.name_product === "undefined" || typeof product.description_product === "undefined" || typeof product.weight_product === "undefined" || typeof product.price_product === "undefined" || typeof product.stock_product === "undefined") {
    res.status(400).send({
      message: "Parts of the data weren't given correctly.",
    });
  } else {
    Product.updateByCode(
      req.params.code_product,
      product,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Product with the code ${req.params.code_product} wasn't found.`,
            });
          } else {
            res.status(500).send({
              message: "Error when trying to update product with the following code: " +
                req.params.code_product,
            });
          }
        } else res.status(200).send(data.recordset);
      }
    );
  }
};

exports.delete = (req, res) => {
  Product.remove(req.params.code_product, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Product with the code ${req.params.code_product} wasn't found.`,
        });
      } else {
        res.status(500).send({
          message: "Error when trying to update product with the following code: " +
            req.params.code_product,
        });
      }
    } else {
      res.status(200).send({
        message: `Product has been deleted succesfully!`,
      });
    }
  });
};