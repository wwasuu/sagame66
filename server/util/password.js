const bcrypt = require("bcrypt");

const saltRounds = 10;

function encrypt(plainText) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if (err) reject(err);
      bcrypt.hash(plainText, salt, function(err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
}

function compare(plainText, hash) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(plainText, hash, function(err, result) {
        if (err) reject(err);
        resolve(result);
    });
  });
}

module.exports = {
    encrypt,
    compare
}
