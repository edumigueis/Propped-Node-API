const sql = require("./db.js");

const UsersRating = function (usersrating) {
  this.code_usersrating = usersrating.code_usersrating;
  this.id_rating_usersrating = usersrating.id_rating_usersrating;
  this.id_user_usersrating = usersrating.id_user_usersrating;
  this.id_store_usersrating = usersrating.id_store_usersrating;
};

UsersRating.create = (newUsersRating, result) => {
  sql.query(
    `INSERT INTO UsersRating_Propped VALUES(${newUsersRating.id_rating_usersrating},${newUsersRating.id_user_usersrating},${newUsersRating.id_store_usersrating},'${newUsersRating.code_usersrating}')`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newUsersRating,
      });
    }
  );
};

UsersRating.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM UsersRating_Propped WHERE code_usersrating = '${code}'`,
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

UsersRating.findByIdRating = (id, result) => {
  sql.query(
    `SELECT * FROM UsersRating_Propped WHERE id_rating_usersrating = ${id}`,
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

UsersRating.findByIdUser = (id, result) => {
  sql.query(
    `SELECT * FROM UsersRating_Propped WHERE id_user_usersrating = ${id}`,
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

UsersRating.findByIdStore = (id, result) => {
  sql.query(
    `SELECT * FROM UsersRating_Propped WHERE id_store_usersrating = ${id}`,
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

UsersRating.getAll = (result) => {
  sql.query("SELECT * FROM UsersRating_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

UsersRating.updateByCode = (code, usersrating, result) => {
  usersrating.code_usersrating = code;
  sql.query(
    `UPDATE UsersRating_Propped SET id_rating_usersrating = ${usersrating.id_rating_usersrating}, id_user_usersrating = ${usersrating.id_user_usersrating}, id_store_usersrating = ${usersrating.id_store_usersrating} WHERE code_usersrating = '${code}'`,
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

      result(null, {
        code_usersrating: code,
        ...usersrating,
      });
    }
  );
};

UsersRating.remove = (code, result) => {
  sql.query(
    "DELETE FROM UsersRating_Propped WHERE code_usersrating = '" + code + "'",
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


UsersRating.removeByIdRating = (id, result) => {
  sql.query(
    "DELETE FROM UsersRating_Propped WHERE id_rating_usersrating = " + id,
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

module.exports = UsersRating;
