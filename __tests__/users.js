const User = require('../models/users.js');
const Sequelize = require('sequelize');
const db = require('../db');

beforeAll(() => {
  return User.sync({force: true})
});

afterAll(() => {
   return db.close();
});

// Integration test
test('Created user has hashed password', done => {
  let pw = "bar"
  x = User.build({username: "foo", password: pw})
  x.save().then(() => {
    return x.checkPassword(pw);
  }).then(function(result) {
    expect(result).toBe(true);
    return x.checkPassword("baz");
  }).then(function(result) {
    expect(result).toBe(false);
    done();
  }).catch(function(err) {
    done.fail();
  });
});
