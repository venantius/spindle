var Sequelize = require('sequelize');

var db = require('../db');

var User = db.define('user', {
  username: {
    type: Sequelize.STRING
  }
});

User.sync();

module.exports = User;
