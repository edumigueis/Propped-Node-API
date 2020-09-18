const sql = require("./db.js");

// Construtor
const User = function (user) {
  this.code_user = user.code_user;
  this.name_user = user.name_user;
  this.email_user = user.email_user;
  this.pass_user = user.pass_user;
  this.gender_user = user.gender_user;
  this.birth_date_user = user.birth_date_user;
  this.registry_user = user.registry_user;
  this.phone_user = user.phone_user;
  this.image_user = user.image_user;
  this.preference_user = user.preference_user;
};

User.create = (newUser, result) => {
  sql.query(
    `INSERT INTO User_Propped VALUES('${newUser.code_user}','${newUser.name_user}','${newUser.email_user}','${newUser.pass_user}','${newUser.gender_user}','${newUser.birth_date_user}','${newUser.registry_user}','${newUser.phone_user}','${newUser.image_user}', '${newUser.preference_user}')`,
    newUser,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newUser,
      });
    }
  );
};

User.findByCode = (userCODE, result) => {
  sql.query(
    `SELECT * FROM User_Propped WHERE code_user = ${userCODE}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        console.log("User found: ", res);
        result(null, res);
        return;
      }

      // Não achou a user com o cod
      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

User.getAll = (result) => {
  sql.query("SELECT * FROM User_Propped", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res.recordset);
  });
};

User.updateByCode = (cod, user, result) => {
  sql.query(
    "UPDATE Users_Propped SET name_user = ?, email_user= ?, pass_user = ?, gender_user= ?, birth_date_user= ?, registry_user= ?, phone_user= ?, image_user= ?, preference_user= ?,  WHERE code_user = ?",
    [
      user.name_user,
      user.email_user,
      user.pass_user,
      user.gender_user,
      user.birth_date_user,
      user.registry_user,
      user.phone_user,
      user.image_user,
      user.preference_user,
      cod,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // não achou a user com esse cod
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      console.log("updated user: ", {
        code_user: cod,
        ...user,
      });
      result(null, {
        code_user: cod,
        ...user,
      });
    }
  );
};

User.remove = (code, result) => {
  sql.query("DELETE FROM User_Propped WHERE code_user = ?", code, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // não achou a user com esse cod
      result(
        {
          kind: "not_found",
        },
        null
      );
      return;
    }

    console.log("User with code: ", code, " was deleted");
    result(null, res);
  });
};

module.exports = User;
