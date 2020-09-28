const bcrypt = require("bcrypt");
const saltRounds = 10;

const Hasher = function () {};

Hasher.generateCode = () => {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 30; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

Hasher.hashPassword = (pass, fn) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(pass, salt, function (err, hash) {
      if (err) {
        throw new Error("Error while hashing.");
      } else {
        fn(hash);
      }
    });
  });
};

Hasher.comparePassword = (pass, hash, fn) => {
  bcrypt.compare(pass, hash, function (err, result) {
    if (err) {
      throw new Error("Error when comparing hashes.");
    } else {
      fn(result);
    }
  });
};

module.exports = Hasher;
