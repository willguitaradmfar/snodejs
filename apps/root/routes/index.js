exports.index = function(req, res){
  res.render('index', { title: 'SNODEJS' });
};

exports.json = function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(require(req.query.require)[req.query.method](req.query,res)));
};
