var express = require('express');
var routes = express.Router();
var wikiRoute = require('./wiki');
var usersRoute = require('./users');
var models = require('../models');
var Page = models.Page;
var User = models.User;

routes.use('/wiki', wikiRoute);
routes.use('/users', usersRoute);

Page.belongsTo(User, { as: 'author' });

routes.get('/', function(req, res, next){
  Page.findAll({
    attributes: ['urlTitle', 'title']
  })
  .then(function(pages){
    res.render('index', {pages: pages});
  })
  .catch(next);
});

module.exports = routes;
