
var express = require('express')
  , routes = require('routes/index.js')
  , http = require('http')  
  , syslog = require('node-syslog')
  , constants = require('constants/index.js')
  , util = require('util/index.js')  
  , managerApp = require('manager-app/index.js')
  , path = require('path');

var app = express(); 

syslog.init("[server]", syslog.LOG_PID | syslog.LOG_ODELAY, syslog.LOG_LOCAL0);

syslog.log(syslog.LOG_INFO, 'servidor SNODEJS ....');

app.configure(function(){
  app.set('port', process.env.PORT || constants.port);
  app.set('views', __dirname + '/webadmin/views/');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser({uploadDir:constants.tmp}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/webadmin/public/'));
  app.use(express.static(path.join(__dirname, '/webadmin/public')));
});

app.get('/', routes.index);
app.get('/upload', routes.upload);
app.post('/file-upload', managerApp.file_upload);
app.get('/json', routes.json);
app.get('/registerSpace', registerSpace);

function registerSpace() {
  managerApp.list_spaces(undefined, undefined, function (ret) {
      for (var i = 0; i < ret.list.length; i++) {
        syslog.log(syslog.LOG_INFO, 'registrando ('+ret.list[i].namespace+')');
        var index = require(ret.list[i].namespace+'/index.js');
        syslog.log(syslog.LOG_INFO, 'chamando construtor do diagrama ('+ret.list[i].namespace+')');
        index.construct({          
          register_path_get : function(path, callback) {
            app.get('/'+ret.list[i].namespace+path, callback);          
          },
          register_path_post : function(path, callback) {
            app.post('/'+ret.list[i].namespace+path, callback);
          }});        
      };
  });
}

registerSpace();

http.createServer(app).listen(app.get('port'), function(){
  syslog.log(syslog.LOG_INFO, "Server listening on port " + app.get('port'));
  syslog.log(syslog.LOG_INFO, 'servidor SNODEJS [ok]');
});