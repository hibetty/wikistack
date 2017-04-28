var express = require('express');
var morgan = require('morgan');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var app = express();
var models = require('./models');
var routes = require('./routes');

//serve static files
app.use(express.static('public'));

//logging middleware
app.use(morgan('dev'));

// nunjucks templating setup
app.engine('html', nunjucks.render);
app.set('view engine', 'html');
nunjucks.configure('views', {noCache: true});

//sync databases
models.db.sync({force: true})
  .then(function(){
    app.listen(8080, function(){
       console.log('listening on port 8080');
    });
  })
  .catch(console.error);

app.get('/', function(req, res, next){
  res.render('index');
});
