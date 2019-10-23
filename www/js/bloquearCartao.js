
function bloquearCartao () {
	var senha         = $('#senha').val();
    var justificativa = $('#justificativa').val();
    var erro         = '';

	if (senha.length < 6 || senha.length < 6) {
		erro += 'Senha incorreta!\n';
	}

    if(justificativa.length < 5) {
        erro += 'Informe uma justificativa coerente com a situação!\n';
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
                a: 'c06dd5',
                senha: senha,
                cartao  : data.carass,
                justificativa : justificativa,
                origem : 1
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
                    navigator.notification.alert('Cartão bloqueado com sucesso!');
                	location.href = "menu.html";
                } else {
                    navigator.notification.alert(data[1]);
                }
            }
        });
	}
}

if ($.localStorage.get('dados_usuario')[13].usuario.sitcar != 'L') {
    if ($.localStorage.get('dados_usuario')[13].usuario.sitcar == 'B') {
        $('#formBlqCartao').html('<b>Cartão:</b> <b style="color:red;">Bloqueado</b>');
    } else {
        $('#formBlqCartao').html('<b>Cartão:</b> <b style="color:red;">Cancelado</b>');
    }

    
    //$('#formBlqCartao').hide();



} else  {
    $('#formBlqCartao').prepend('<div style="font-weight: bold;">Cartão: <c style="color: green;">Liberado</c></div><br />');
}