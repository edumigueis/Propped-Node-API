const sql = require("./db.js");

const Store = function (store) {
  this.code_store = store.code_store;
  this.name_store = store.name_store;
  this.registry_store = store.registry_store;
  this.website_store = store.website_store;
  this.phone_store = store.phone_store;
  this.postal_code_store = store.postal_code_store;
  this.address_store = store.address_store;
  this.city_store = store.city_store;
  this.state_store = store.state_store;
  this.country_store = store.country_store;
  this.image_store = store.image_store;
};

Store.create = (newStore, result) => {
  sql.query(
    `INSERT INTO Store_Propped VALUES('${newStore.code_store}','${newStore.name_store}','${newStore.registry_store}','${newStore.website_store}','${newStore.phone_store}','${newStore.postal_code_store}','${newStore.address_store}','${newStore.city_store}','${newStore.state_store}', '${newStore.country_store}', CAST('${newStore.image_store}' as varbinary(max)))`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newStore,
      });
    }
  );
};

Store.findByCode = (code, result) => {
  sql.query(
    `SELECT * FROM Store_Propped WHERE id_store = '${code}'`,
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

Store.getAll = (result) => {
  sql.query("SELECT * FROM Store_Propped", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Store.updateByCode = (code, store, result) => {
  store.code_store = code;
  sql.query(
    `UPDATE Store_Propped SET name_store = '${store.name_store}', registry_store = '${store.registry_store}', website_store = '${store.website_store}', phone_store= '${store.phone_store}', postal_code_store= '${store.postal_code_store}', address_store= '${store.address_store}', city_store= '${store.city_store}', state_store= '${store.state_store}', country_store= '${store.country_store}', image_store = CAST('${store.image_store}' as varbinary(max))  WHERE code_store = '${code}'`,
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
        code_store: code,
        ...store,
      });
    }
  );
};

Store.remove = (code, result) => {
  sql.query(
    "DELETE FROM Store_Propped WHERE code_store = '" + code + "'",
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

      console.log("Store with code: ", code, " was deleted");
      result(null, res);
    }
  );
};

module.exports = Store;
