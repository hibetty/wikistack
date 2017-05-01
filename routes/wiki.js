var express = require('express');
var wikiRoutes = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

wikiRoutes.get('/', function(req, res, next){
  res.redirect('/');
});

wikiRoutes.post('/', function(req, res, next){
  var formTitle = req.body.title;
  var formContent = req.body.content;
  var formAuthor = req.body.name;
  var formEmail = req.body.email;

  var page = Page.build({
    title: formTitle,
    content: formContent
  });

  User.findOrCreate({where: {name: formAuthor, email: formEmail}})
    .spread(function(user){
      page.setAuthor(user);
    });

  page.save()
  .then(function(savedPage){
    res.redirect(savedPage.route);
  }).catch(next);
});

wikiRoutes.get('/add', function(req, res, next){
  res.render('addpage');
});

wikiRoutes.get('/:urlTitle', function(req, res, next){
  Page.findOne({
    where: {urlTitle: req.params.urlTitle},
    include: [ {
      model: User, as: 'author'
    }]
  })
  .then(function(foundPage){
    console.log(foundPage);
    res.render('wikipage', { urlTitle: foundPage.urlTitle, title: foundPage.title, content: foundPage.content, author: foundPage.author });
  })
  .catch(next);
});


module.exports = wikiRoutes;
