var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

const saltRounds = 10;

var db = require('../db');

var generateHash = function(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(saltRounds).then(function(salt) {
      return bcrypt.hash(password, salt);
    }).then(function(hash) {
      resolve(hash);
    }).catch(function(err) {
      console.error(err);
      reject(err);
    });
  });
};

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  instanceMethods: {
    generateHash: generateHash,
    checkPassword: function(password) {
      user = this;
      return new Promise(function(resolve, reject) {
        bcrypt.compare(password, user.password).then(function(result) {
          resolve(result);
        }).catch(function(err) {
          console.err(err);
          reject(err);
        });
      });
    }
  }
});

User.beforeCreate(function(user, options, cb) {
  user.generateHash(user.password).then(function(result) {
    user.password = result;
    return cb(null, options);
  }).catch(function(err) {
    return cb(err, options);
  });
});

module.exports = User;
