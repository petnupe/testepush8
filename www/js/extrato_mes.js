$(document).ready(function(e) {

    var data = $.localStorage.get('dados_usuario');

$.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        data: {
            a: '751fc0',
            codent: data[13].usuario.codent,
            codass: data[13].usuario.codass
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
            $('#nomeMes').append(data.mesAtual);
			$('#tabelaExtrato').append('<tbody>');	
			
            if (data.extrato != null) {
                $.each(data.extrato, function (k, v) {
                    if (v.estornada != 1) {
                        $('#tabelaExtrato').append('<tr><td align="left">'+v.dataCompra + '</td><td align="center">'+v.parcelas+'</td><td>'+v.nomeEstabelecimento+'</td><td align="right">'+v.valorParcelaFormatado +'</td></tr>');     
                    }
    			});
            } else {
                $('#tabelaExtrato').append('<tr><td align="left"></td><td align="center"></td><td></td><td align="right"></td></tr>');
            }
            $('#totalExtrato').append('<tr><td colspan="3" align="right">Total</td><td align="right">'+data.total+'</td></tr>');    
        }
    });
});