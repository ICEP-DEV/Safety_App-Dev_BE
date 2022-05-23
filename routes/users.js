var express = require('express');
const routerUsers = express.Router();

/* GET users listing. */
routerUsers.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = routerUsers;
