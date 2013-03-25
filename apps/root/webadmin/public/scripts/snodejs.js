var snodejs = {};

$(function() {
		$('#bt-create-space').on('click', function() {
		if ($('#txt-namespace').val() && $('#txt-namespace').val().length > 0) {
			snodejs.managerApp('create_space'
				+'&namespace='+$('#txt-namespace').val()
				+'&description='+$('#txt-description').val()
				+'&author='+$('#txt-author').val()
				, function(res) {
				snodejs.msg(res);
				$('#txt-namespace').val('');
				$('#txt-description').val('');
				$('#txt-author').val('');
				snodejs.listApp();
				snodejs.get('registerApp', '', undefined);
			});
		}else{
			snodejs.msg({msg : 'Existe Campo vazio'});
		}
	});

	//----------------------------------------------------

	snodejs.listApp();
	
});

snodejs.listApp = function() {
	snodejs.managerApp('list_spaces', function(res) {
		if (res && res.list) {						

			$('#spaces tbody').html('');			
			for (var i = 0; i < res.list.length; i++) {
				$('#spaces tbody').append($('<tr/>')
					 		.append($('<td/>').text(res.list[i].namespace))
					 		.append($('<td/>').text(res.list[i].description))
					 		.append($('<td/>').text(res.list[i].author))
					 		.append($('<td/>').html($('<button class="btn btn-primary btn-danger" type="button" onclick="snodejs.remove_space(\''+res.list[i].namespace+' \');">Remover</button>')))
					);				
			}			
		}
	});
};
snodejs.remove_space = function(namespace) {
	snodejs.managerApp('remove_space&namespace='+namespace, function(res) {
		snodejs.msg(res);
		snodejs.listApp();
	});	
};

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