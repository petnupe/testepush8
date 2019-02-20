$(document).ready(function() {
    $('#cartao_email').val('6298 69').mask('0000 0000 0000 0000');
    $('#senha').mask('000000');

    $.localStorage.set('email_copia', '');
    $.localStorage.set('cartao_copia', '');
    
    if ($.localStorage.get('sd') == 1) {
        if ($.localStorage.get('login') == 'cartao') {
            $('#radio-choice-email').removeAttr('checked').checkboxradio('refresh');
            $('#radio-choice-cartao').attr('checked', 'checked').checkboxradio('refresh');
            $.localStorage.set('login', 'cartao');
        } else {
            $('#radio-choice-cartao').removeAttr('checked').checkboxradio('refresh');
            $('#radio-choice-email').attr('checked', 'checked').checkboxradio('refresh');
            $.localStorage.set('login', 'email');
        }

        $('#sd').prop('checked', true).checkboxradio('refresh');
        $('#cartao_email').val($.localStorage.get('cartao_email'));
        $('#senha').val($.localStorage.get('senha'));
    } else {
        $.localStorage.set('login', 'cartao');
    }
});

function login() {
    $.localStorage.set('cartao_email2', $('#cartao_email').val());
    $.localStorage.set('senha2', $('#senha').val());

    if ($('#sd').is(':checked')) {
        $.localStorage.set('sd', 1);
        $.localStorage.set('cartao_email', $('#cartao_email').val());
        $.localStorage.set('senha', $('#senha').val());
    } else {
        $.localStorage.set('sd', 0);
    }

    if ($.localStorage.get('sd')) {
        var login = $.localStorage.get('login');
        var cartao_email = $.localStorage.get('cartao_email');
        var senha = $.localStorage.get('senha');
    } else {
        var login = $.localStorage.get('login');
        var cartao_email = $('#cartao_email').val();
        var senha = $('#senha').val();
    }

    var cartao;
    var email;
    
    if (login == 'cartao') {
        cartao = cartao_email.replace(/[^0-9]/g, '');

        if (!cartao) {
            navigator.notification.alert('Digite seu cartão.', null, 'Atenção', 'Tentar novamente');
            return false;
        }

        if (cartao.length < 16 || cartao.length > 16) {
            navigator.notification.alert('O número do cartão deve ter 16 caracteres.', null, 'Atenção', 'Tentar novamente');
            return false;
        }

    } else {
        email = cartao_email;
        validado = validacaoEmail(email);
        
        if (!validado) {
            navigator.notification.alert('E-mail inválido.', null, 'Atenção', 'Tentar novamente');
            return false;
        }

        if (!email) {
            navigator.notification.alert('Digite seu e-mail.', null, 'Atenção', 'Tentar novamente');
            return false;
        }
    }

    if (!senha) {
        navigator.notification.alert('Digite sua senha!', null, 'Atenção', 'Tentar novamente');
        return false;
    }

    $.support.cors = true;
    
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
                    navigator.notification.alert('E-mail e/ou senha incorretos.',  null,  'Atenção', 'Tentar novamente');
                }
            } else {
                $.localStorage.set('dados_usuario', data);

                if (data[13].usuario.senhaPadrao == true) {
                    location.href = "alterSenha.html";
                } else {
                    location.href = "menu.html";
                }
                
            }
        }
    });
}

$("#radio-choice-cartao").click(function() {
    $.localStorage.set('login', 'cartao');
    $.localStorage.set('email_copia', $('#cartao_email').val());
    $('#cartao_email').val($.localStorage.get('cartao_copia'));
    $('#cartao_email').mask('0000 0000 0000 0000');
    $('#cartao_email').attr('type', 'tel');
    $('#cartao_email').attr('maxlength', '19');
});

$("#radio-choice-email").click(function() {
    $.localStorage.set('cartao_copia', $('#cartao_email').val());
    $.localStorage.set('login', 'email');
    $('#cartao_email').unmask().val($.localStorage.get('email_copia'));
    $('#cartao_email').attr('type', 'email');
    $('#cartao_email').removeAttr('maxlength');
});

function validacaoEmail(field) {
    usuario = field.substring(0, field.indexOf("@"));
    dominio = field.substring(field.indexOf("@") + 1, field.length);
    if ((usuario.length >= 1) && (dominio.length >= 3) && (usuario.search("@") == -1) && (dominio.search("@") == -1) && (usuario.search(" ") == -1) && (dominio.search(" ") == -1) && (dominio.search(".") != -1) && (dominio.indexOf(".") >= 1) && (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true;
    } else {
        return false;
    }
}