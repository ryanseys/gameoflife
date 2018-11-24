
/**
 * Module dependencies.
 */

const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('http');
const path = require('path');

var favicon = require('serve-favicon')
var logger = require('morgan')
var methodOverride = require('method-override')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade');
app.use(logger('dev'))
app.use(methodOverride())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))
// app.use(multer())
app.use(express.static(path.join(__dirname, 'public')));

// app.configure('development', function() {
//   app.use(express.errorHandler());
// });

app.get('/', routes.index);

// router.get('/users', user.list);

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
