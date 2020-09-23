import Hasher from "../data/Hasher.js";

const Image = require("../models/Favorite.model.js");

exports.create = (req, res) => {

  if (!req.body) {
    res.status(400).send({
      message: "Empty params"
    });
  }

  const image = new Image({
    code_image: req.body.code_image,
    photo_image: req.body.photo_image,
  });

  Image.create(image, (err, data) => {
    do image.code_image = Hasher.generateCode();
    while (
      Favorite.findByCode(favorite.code_image, (err, data) => {}) == -1
    );

    if (err)
      res.status(500).send({
        message: err.message || "Erro ao criar aluno."
      });
    else res.send(data.recordset);
  });
};

// Pega todos os alunos do banco de dados
exports.findAll = (req, res) => {
  Aluno.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Erro ao buscar alunos."
      });
    else res.send(data.recordset);
  });
};

// Achar aluno com ra especifico
exports.findOne = (req, res) => {
  Aluno.findByRA(req.params.ra, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontar o aluno com ra ${req.params.ra}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao busar o aluno com ra " + req.params.ra
        });
      }
    } else res.send(data);
  });
};

// Altera o aluno com ra específico
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode estar vazio!"
    });
  }

  Aluno.updateByRA(
    req.params.ra,
    new Aluno(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Não foi possível encontrar aluno com ra ${req.params.ra}.`
          });
        } else {
          res.status(500).send({
            message: "Erro ao atualizar aluno com ra " + req.params.ra
          });
        }
      } else res.send(data.recordset);
    }
  );
};

// Deleta aluno com ra especifico
exports.delete = (req, res) => {
  Aluno.remove(req.params.ra, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Não foi possível encontrar aluno com ra ${req.params.alunoId}.`
        });
      } else {
        res.status(500).send({
          message: "Erro ao deletar aluno com ra " + req.params.alunoId
        });
      }
    } else res.send({
      message: `Aluno foi deletado com sucesso!`
    });
  });
};

// Delete todos os alunos do banco
exports.deleteAll = (req, res) => {
  Aluno.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Algum erro ocorreu ao deletar os alunos"
      });
    else res.send({
      message: `Todos os alunos deletados com sucesso!`
    });
  });
};*/