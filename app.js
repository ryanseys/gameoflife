
/**
 * Module dependencies.
 */

const express = require('express');
const routes = require('./routes');
const user = require('./routes/user');
const http = require('http');
const path = require('path');

const favicon = require('serve-favicon')
const logger = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const bodyParser = require('body-parser')
const errorHandler = require('errorhandler')
const app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade');
app.use(logger('dev'))
app.use(methodOverride())
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})
