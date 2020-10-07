const Hasher = require("../data/Hasher.js");

const sql = require("./db.js");

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
    `INSERT INTO User_Propped VALUES('${newUser.code_user}','${newUser.name_user}','${newUser.email_user}','${newUser.pass_user}','${newUser.gender_user}','${newUser.birth_date_user}','${newUser.registry_user}','${newUser.phone_user}', CAST('${newUser.image_user}' as varbinary(max)), '${newUser.preference_user}')`,
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

User.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM User_Propped WHERE code_user = '${code}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        result(null, res);
        return;
      }

      result(
        {
          kind: "not_found",
        },
        null
      );

      return -1;
    }
  );
};

User.getAll = (result) => {
  sql.query("SELECT * FROM User_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

User.updateByCode = (code, user, result) => {
  user.code_user = code;
  sql.query(
    `UPDATE User_Propped SET name_user = '${user.name_user}', email_user = '${user.email_user}', pass_user = '${user.pass_user}', gender_user= '${user.gender_user}', birth_date_user= '${user.birth_date_user}', registry_user= '${user.registry_user}', phone_user= '${user.phone_user}', image_user= CAST('${user.image_user}' as varbinary(max)), preference_user = '${user.preference_user}'  WHERE code_user = '${code}'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      result(null, {
        code_user: code,
        ...user,
      });
    }
  );
};

User.remove = (code, result) => {
  sql.query(
    "DELETE FROM User_Propped WHERE code_user = '" + code + "'",
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result(
          {
            kind: "not_found",
          },
          null
        );
        return;
      }

      result(null, res);
    }
  );
};

User.findByLoginData = (email, senha, result) => {
  sql.query(
    `SELECT * FROM User_Propped WHERE email_user = '${email}'`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.recordset.length > 0) {
        Hasher.comparePassword(senha, res.pass_user, function (res) {
          if (res) {
            result(null, res);
            return;
          }
          else {
            result(
              {
                kind: "wrong_password",
              },
              null
            );
            return;
          }
        });
      }

      result(
        {
          kind: "not_found",
        },
        null
      );
    }
  );
};

module.exports = User;
