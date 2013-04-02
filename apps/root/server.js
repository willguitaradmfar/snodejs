
var express = require('express')
  , routes = require('routes/index.js')
  , http = require('http')
  , Class = require('wesley').classT
  , constants = require('constants/index.js')
  , util = require('util/index.js')  
  , managerApp = require('manager-app/index.js')
  , path = require('path');

var app = express(); 
var server = http.createServer(app);

util.init('server');

util.log('servidor SNODEJS ....');

app.configure(function(){
  app.set('port', constants.port);  
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
app.get('/apps', routes.apps);
app.get('/manager-spaces', routes.manager_spaces);
app.get('/manager-apps', routes.manager_apps);
app.get('/json', routes.json);
app.get('/registerSpace', registerSpace);
app.post('/file-upload', managerApp.file_upload);

function registerSpace() {
  managerApp.list_spaces(undefined, undefined, function (ret) {
      for (var i = 0; i < ret.list.length; i++) {
          util.log('registrando ('+ret.list[i].namespace+')');
          var index = require(ret.list[i].namespace+'/index.js');
          util.log('chamando construtor do diagrama ('+ret.list[i].namespace+')');
          if(index.construct){
            index.construct({
              register_path_get : function(path, callback) {
                app.get('/'+ret.list[i].namespace+path, callback);          
              },
              register_path_post : function(path, callback) {
                app.post('/'+ret.list[i].namespace+path, callback);
              },
              'server' : server,
              'path' : ret.list[i].namespace+'/'
            });
          }else{util.log('O Space '+ret.list[i].namespace+' não tem o metodo [construct]');}
      };
  });
}

registerSpace();

server.listen(app.get('port'), function(){
  util.log("Server listening on port " + app.get('port'));
  util.log('servidor SNODEJS [ok]');
});