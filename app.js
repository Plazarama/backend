var express = require('express');
var path = require('path');
var app = express();

var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

var config = require('./config/config');
var secret = require('./config/secret');

var mongoose = require('mongoose');
var configDb = require('./config/database')(mongoose);


// Run the server and socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;
server.listen(port, function() {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

// view engine setup & static folder

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


// Config Express
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({secret: secret.sessionSecret}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Authentication routes
require('./config/passport')(passport);



// development error handler
// Change for deploy
var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  
  app.use(morgan('dev'));
  app.locals.pretty = true;

  //seed the db
  var seed = require('./config/seed');
  seed.seedUser();
  seed.seedQuestions();

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// route middleware to add config variables to our response locals
app.use(function(req, res, next) {
    res.locals.title = 'Some title';


    next(); 
});

require('./routes/routes.js')(app, passport);
