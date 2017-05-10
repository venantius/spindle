var express = require('express');
var router = express.Router();

var db = require('../db');
app = express();

var User = require('../models/users');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.findOne({}).then(function(user) {
    res.send(user)
  });
  // res.send('respond with a resource');
});

module.exports = router;
