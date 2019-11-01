if ($.localStorage.get('dados_usuario')[13].usuario.senhaPadrao == false) {
    $('#textoSenhaInicial').empty();
}

function alterSenha() {
	var nova_senha   = $('#nova_senha').val();
	var nova_senha2  = $('#nova_senha2').val();
    var mail         = $('#mail').val();
	var notification = null;
    
    if (typeof $('#chk').val() != 'undefined') {
        notification = $('#chk').is(':checked');
    }

    var erro         = '';


    var e = new RegExp('[0-9]', 'g');

    if(!e.test(nova_senha)) {
        erro += 'A senhas devem conter somente números!\n';
    }

	if (nova_senha.length < 6 || nova_senha2.length < 6) {
		erro += 'A senhas devem possuir 6 dígitos!\n';
	}

	if(nova_senha != nova_senha2) {
		erro += 'As senhas informadas são diferentes!\n';
	}

    if($('#chk').is(':checked') && !mail) {
        erro += 'Para receber as notificações informe seu e-mail!\n';
    }

    reEmail = /^[\w-]+(\.[\w-]+)*@(([A-Za-z\d][A-Za-z\d-]{0,61}[A-Za-z\d]\.)+[A-Za-z]{2,6}|\[\d{1,3}(\.\d{1,3}){3}\])$/;
    if(mail && reEmail.test(mail) == false) {
        erro += 'Informe um e-mail válido!\n';
    }

	if (erro.length > 0) {
      navigator.notification.alert(erro, null, 'Atenção', 'Tentar novamente');
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
                newsen: nova_senha,
                mail  : mail,
                notification : notification
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
                    navigator.notification.alert(data.descricao);
                }
            }
        });
	}
}