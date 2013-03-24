exports.index = function(req, res){
  res.render('index', { title: 'SNODEJS' });
};

exports.json = function(req, res){
	res.setHeader('Content-Type', 'application/json');
	require(req.query.require)[req.query.method](req.query,res,function(ret) {
		res.end(JSON.stringify(ret));
	});
};
