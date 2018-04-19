if ($.localStorage.get('dados_usuario')[13].usuario.senhaPadrao == false) {
    $('#textoSenhaInicial').empty();
}

function alterSenha() {
	var nova_senha = $('#nova_senha').val();
	var nova_senha2 = $('#nova_senha2').val();
	var erro = '';

	if (nova_senha.length < 6 || nova_senha2.length < 6) {
		erro += 'A senhas devem possuir 6 dígitos!\n';
	}

	if(nova_senha != nova_senha2) {
		erro += 'As senhas informadas são diferentes!\n';
	}

	if (erro.length > 0) {
		navigator.notification.alert(erro, null, 'Atenção', 'Tentar novamente');;
	} else {
	var data = $.localStorage.get('dados_usuario')[13]['usuario'];
    
	$.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        data: {
            a: '05cadd',
            codass: data.codass,
            codent: data.codent,
            newsen: nova_senha
        },
        crossDomain: true,
        error: function(xhr, status, error) {
            navigator.notification.alert('Verifique a conexão com a internet!', null, 'Atenção', 'Tentar novamente');
        },
        beforeSend: function() {
            $.mobile.loading( "show", {
                      text: "Aguarde...",
                      textVisible: true,
                      theme: "a"
            });
        },
        complete: function () {
            $.mobile.loading('hide');
        },
        success: function(data) {
            if(data.retorno == '0') {
            	$.localStorage.set('senha', nova_senha);
                $.localStorage.set('senha2', nova_senha);
				navigator.notification.alert('Senha alterada com sucesso!');
            	location.href = "menu.html";
            } else {
            	navigator.notification.alert('Problemas na alteração da senha, favor verificar!');
            }
        }
    });
	}
}