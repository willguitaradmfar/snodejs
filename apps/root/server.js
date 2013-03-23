
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , constants = require('./constants')
  , util = require('./util')
  , path = require('path');

var app = express();

util.log('local server ....');


app.configure(function(){
  app.set('port', process.env.PORT || constants.port);
  app.set('views', __dirname + '/webadmin/views/');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/webadmin/public/'));
  app.use(express.static(path.join(__dirname, '/webadmin/public')));
});

/*app.configure('development', function(){
  app.use(express.errorHandler());
    app.locals.pretty = true;
});*/

app.get('/', routes.index);
app.get('/json', routes.json);

http.createServer(app).listen(app.get('port'), function(){
  util.log("Server listening on port " + app.get('port'));
});

util.log('local server [ok]');