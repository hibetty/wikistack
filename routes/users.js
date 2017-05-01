var express = require('express');
var usersRoute = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;
var Promise = require('bluebird');

usersRoute.get('/', function(req, res, next){
  User.findAll({
    attributes: ['name', 'id']
  })
  .then(function(users){
    res.render('users', {users: users});
  })
  .catch(next);
});

usersRoute.get('/:id', function(req, res, next){
  var userPromise = User.findById(req.params.id);
  var pagesPromise = Page.findAll({
    where: { authorId: req.params.id }
  });

  Promise.all([userPromise, pagesPromise])
    .then(function(values){
      var user = values[0];
      var pages = values[1];
      res.render('user', { user: user, pages: pages });
    })
    .catch(next);

});


module.exports = usersRoute;
