
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('routes/index.js')
  , http = require('http')
  , constants = require('constants/index.js')
  , util = require('util/index.js')
  , managerApp = require('manager-app/index.js')
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

app.get('/', routes.index);
app.get('/json', routes.json);
app.get('/registerApp', registerApp);

function registerApp() {
  managerApp.list_spaces(undefined, undefined, function (ret) {
      for (var i = 0; i < ret.list.length; i++) {
        util.log('registrando '+ret.list[i].namespace);
        app.get('/'+ret.list[i].namespace, require(ret.list[i].namespace+'/index.js').init);
      };
  });
}

registerApp();

http.createServer(app).listen(app.get('port'), function(){
  util.log("Server listening on port " + app.get('port'));
});

util.log('local server [ok]');