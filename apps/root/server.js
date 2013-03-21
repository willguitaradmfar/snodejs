var express = require('express');
var fs = require('fs');
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
  var body = {nome : 'william lima', idade : req.query.idade};
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
  util[req.query.met]();
});

app.get('/dynamic.json', function(req, res){
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(require("./"+req.query.require)[req.query.met]()));
});


app.get('/*', function(req, res){  
  res.writeHead(200, {'Content-Type' : 'text-plain'});  
  res.end(fs.readFileSync('./apps/root/webadmin'+(req.url == '/'?'/index.html':req.url)));
});

app.listen(8080);
console.log('Listening on port 8080');
//util.cadastrar();
