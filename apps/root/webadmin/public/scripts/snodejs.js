var snodejs = {};
$(function() {
	$('.alert').hide();
});




snodejs.managerApp = function(method, fun) {
	snodejs.get('json', 'require=manager-app&method='+method, fun);	
};

snodejs.get = function(url, query, fun) {
	$.ajax({
	  url: url+'?'+query,	  
	  type: 'GET',
	  success: function(res){
	  	if(fun)fun(res);
	  }
	});
};

snodejs.msg = function(res) {
	$('.alert').hide();

	if(res.type == 'success')
		$('.alert').attr('class', 'alert alert-success');
	if(res.type == 'error')
		$('.alert').attr('class', 'alert alert-error');
	if(res.type == 'info')
		$('.alert').attr('class', 'alert alert-info');
	if(res.type == 'warn')
		$('.alert').attr('class', 'alert alert-block');

	$('.alert .text-alert').text(res.msg);
	$('.alert').show();
};


