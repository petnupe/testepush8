// JavaScript Document
$(document).ready(function(e) {
    var data = $.localStorage.get('dados_usuario');
	for(i = 0; i < 11; i++){
		$('#meses').append('<li style="padding:10px;border-bottom:1px solid #ccc;">'+data[i].mes.nome+'<b style="float:right;">'+data[i].mes.valor+'</b></li>');
	}
});