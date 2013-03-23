var snodejs = {};

$(function() {
	$('#bt-create-space').on('click', function() {		
		snodejs.managerApp('create_space&namespace='+$('#txt-create-space').val(), function(res) {
			snodejs.msg(res);
		});
	});

});

snodejs.managerApp = function(method, fun) {
	snodejs.get('json', 'require=manager-app&method='+method, fun);
};

snodejs.get = function(url, query, fun) {
	$.ajax({
	  url: url+'?'+query,	  
	  type: 'GET',
	  success: function(res){
	    fun(res);
	  }
	});
};

snodejs.msg = function(res) {
	alert(res.msg);
};

snodejs.teste = function(res) {
	alert(res.teste);
};

