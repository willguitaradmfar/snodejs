var express = require('express');
var util = require('./util.js');
var app = express();

app.get('/hello.txt', function(req, res){	
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
  util.cadastrar();
});

app.get('/hello.json', function(req, res){	
  var body = {nome : 'william lima', idade : 16};
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
  util.cadastrar();
});

app.get('/hello.html', function(req, res){
  res.send('Hello World');
  util.excluir();
});

app.listen(8080);
console.log('Listening on port 8080');
//util.cadastrar();
