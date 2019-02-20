$(document).ready(function(e) {

    var cidade = $.localStorage.get('cidade');
    var uf = $.localStorage.get('uf');
    var segmento = $.localStorage.get('segmento');

    if (cidade == 0) {
        cidade = null
    }
    if (uf == 0) {
        uf = null
    }
    if (segmento == 0) {
        segmento = null
    }

    var data = $.localStorage.get('dados_usuario');
    var codent = data[13].usuario.codent;
    $('#segmento').empty();
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        async: true,
        data: {
            a: 'a8d017',
            codent: codent,
            acs: '4',
            uf: uf,
            cid: cidade,
            seg: segmento
        },
        crossDomain: true,
        error: function(xhr, status, error) {
            alert(status);
        },
        beforeSend: function() {
            $.mobile.loading( "show", {text: "Aguarde...", textVisible: true, theme: "a"});
        },
        complete: function () {
            $.mobile.loading('hide');
        },
        success: function(data) {
            for (i = 0; i < data.length; i++) {
                cor = data[i].cor;
                cor_texto = '#fff';
                var iconStar = '';

                if (data[i].destaque == '1') {
                     iconStar = '<icon style="float: right; color: gold;" class="glyphicon glyphicon-star"></icon>'; 
                } else {
                    iconStar = '';
                }

                $('#accordion').append('<a data-toggle="collapse" href="#collapse' + data[i].lojcodloj + '" onclick="mudaIcone(' + data[i].lojcodloj + ')" style="text-decoration:none; color:'+cor_texto+';"><div class="panel-heading" id="heading' + data[i].lojcodloj +'" style="background:'+cor+'; text-shadow: none; border-bottom: none; border-top-left-radius: 0px; border-top-right-radius: 0px;"><input type="hidden" id="exp_' + data[i].lojcodloj + '" value="0"/><icon class="glyphicon glyphicon-chevron-right" id="icon_' + data[i].lojcodloj + '"></icon> ' + data[i].nome + iconStar + '</div></a><div id="collapse' + data[i].lojcodloj + '" class="panel-collapse collapse"><div class="panel-body" id="text_' + data[i].lojcodloj + '"></div></div>');
            }
        }
    });
});

function mudaIcone(id) {
    $('#text_' + id).html('');
    if ($('#exp_' + id).val() == 0) {
        var cidade = $.localStorage.get('cidade');
        var uf = $.localStorage.get('uf');
        if (cidade == 0) {
            cidade = null
        }
        if (uf == 0) {
            uf = null
        }
        $('#exp_' + id).val(1)
        $('#icon_' + id).removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-down');
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: _HOST_,
            async: true,
            data: {
                a: 'a8d017',
                ecs: id,
                acs: '5',
                uf: uf,
                cid: cidade
            },
            crossDomain: true,
            error: function(xhr, status, error) {
                alert(status);
            },
            success: function(data) {
                for (i = 0; i < data.length; i++) {
                    if (data[i].fone === null) {
                        data[i].fone = '';
                    }
                 //   $('#text_' + id).append('<p>CIDADE:<strong>' + data[i].cidade + '</strong> UF:<strong>' + data[i].uf + '</strong> </p><p>ENDEREÇO:<strong>' + data[i].endereco + '</strong></p><p>TELEFONE:<strong>' + data[i].fone + '</strong></p><br/>');

                    $('#text_' + id).append('<p><b>' + data[i].endereco + ', ' + data[i].cidade +', '+ data[i].uf + '<br /></b>FONE: <b>' + data[i].fone + '</b></p>');

                }
            }
        });
    } else {
        $('#exp_' + id).val(0);
        $('#icon_' + id).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-right');
    }
}