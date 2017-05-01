var express = require('express');
var usersRoute = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


module.exports = usersRoute;
