const sql = require("./db.js");

const FormofPayment = function (formofpayment) {
  this.code_formofpayment = formofpayment.code_formofpayment;
  this.name_formofpayment = formofpayment.name_formofpayment;
  this.time_formofpayment = formofpayment.time_formofpayment;
};

FormofPayment.create = (newFormofPayment, result) => {
  sql.query(
    `INSERT INTO FormofPayment_Propped VALUES('${newFormofPayment.code_formofpayment}','${newFormofPayment.name_formofpayment}', ${newFormofPayment.time_formofpayment} )`,
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, {
        ...newFormofPayment,
      });
    }
  );
};

FormofPayment.findByCode = (formofpaymentCODE, result) => {
  sql.query(
    `SELECT * FROM FormofPayment_Propped WHERE code_formofpayment = '${formofpaymentCODE}'`,
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
    }
  );
};

FormofPayment.getAll = (result) => {
  sql.query("SELECT * FROM FormofPayment_Propped", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("formsofpayment: ", res);
    result(null, res.recordset);
  });
};

FormofPayment.updateByCode = (cod, formofpayment, result) => {
  formofpayment.code_formofpayment = cod;
  sql.query(
    `UPDATE FormofPayment_Propped SET name_formofpayment = ${formofpayment.name_formofpayment} WHERE code_formofpayment = '${cod}'`,
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
        code_formofpayment: cod,
        ...formofpayment,
      });
    }
  );
};

FormofPayment.remove = (code, result) => {
  sql.query(
    "DELETE FROM FormofPayment_Propped WHERE code_formofpayment = '" + code + "'",
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

module.exports = FormofPayment;
