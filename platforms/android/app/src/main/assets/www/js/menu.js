$(document).ready(function() {
    recarregar();
    preencheCampos();

});

function sair() {
    $.localStorage.remove('dados_usuario');
    location.href = "index.html";
}

function recarregar() {
    usuario = $.localStorage.get('cartao_email2');
    senha = $.localStorage.get('senha2');
    login = $.localStorage.get('login');

    var cartao = '';
    var email = '';

    if (login == 'cartao') {
        cartao = usuario;
    } else {
        email = usuario;
    }
    
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        data: {
            a: '2547a0',
            carass: cartao,
            senass: senha,
            emaass: email
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
            if (data[0].erro) {

                if (login == 'cartao') {
                    navigator.notification.alert('Cartão e/ou senha incorretos.', null, 'Atenção', 'Tentar novamente');
                } else {
                    navigator.notification.alert('E-mail e/ou senha incorretos.', null, 'Atenção', 'Tentar novamente');
                }
            } else {
                $.localStorage.remove('dados_usuario');
                $.localStorage.set('dados_usuario', data);
                preencheCampos();
            }
        } 
    });
}

function preencheCampos() {
    var data = $.localStorage.get('dados_usuario');
    var nome_usuario = $.localStorage.get('nome_usuario');
    var entidade_usuario = $.localStorage.get('entidade_usuario');
    var saldo_usuario = $.localStorage.get('saldo_mensal');
    $('#portador_menu').text(data[13].usuario.portador);
    $('#entidade_menu').text(data[13].usuario.etd);
    $('#saldo_mensal').text('R$ ' + data[12].sintetico.saldo_mensal);
   
    saldoTotal = data[12].sintetico.saldo_total;

    if (saldoTotal) {
        $('#saldo_total').text(saldoTotal);
    } else {
        $('#linhaSaldoTotal').text('');
    }
   
    var situacao = data[13].usuario.situacao;
    if (situacao == 'L') {
        situacao = 'Liberado';
        cor = 'green';
    }
    if (situacao == 'B') {
        situacao = 'Bloqueado';
        cor = 'red';
    }
    if (situacao == 'C') {
        situacao = 'Cancelado';
        cor = 'red';
    }
    $('#situacao_portador').text(situacao);
    $('#situacao_portador').css('color', cor);
}