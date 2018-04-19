$(document).ready(function() {
    var data = $.localStorage.get('dados_usuario');
    var codent = data[13].usuario.codent;
    var cidade = '';
    var uf = '';
    $('#segmento').prop('disabled', 'disabled');
    $('#cidade').prop('disabled', 'disabled');
    $('#uf').prop('disabled', 'disabled');
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        async: true,
        data: {
            a: 'a8d017',
            codent: codent,
            acs: '3',
            uf: uf,
            cid: cidade
        },
        error: function(xhr, status, error) {
            alert(status);
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
            $('#segmento').html('').selectmenu('refresh', true);

            $('#segmento').append('<option value="0" style="text-align:center;font-weight:bold;">Todos</option>');
            for (i = 0; i < data.length; i++) {
                $('#segmento').append('<option value=' + data[i].codseg + ' style="text-align:center;font-weight:bold;">' + data[i].desseg + '</option>');

            }
            $('#segmento').prop('disabled', false);
            $('#segmento').selectmenu('refresh', true);
        }
    });
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        async: true,
        data: {
            a: 'a8d017',
            codent: codent,
            acs: '1'
        },
        cache: false,
        error: function(xhr, status, error) {
            alert(status);
        },
        success: function(data) {
            $('#uf').html('').selectmenu('refresh', true);
            $('#uf').append('<option value="0" style="text-align:center;font-weight:bold;">Todos</option>');
            for (i = 0; i < data.length; i++) {
                $('#uf').append('<option value=' + data[i].uf + ' style="text-align:center;font-weight:bold;">' + data[i].uf + '</option>');
            }
            $('#uf').prop('disabled', false);
            $('#uf').selectmenu('refresh', true);
        }
    });
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        async: true,
        data: {
            a: 'a8d017',
            codent: codent,
            acs: '2',
            uf: uf
        },
        crossDomain: true,
        error: function(xhr, status, error) {
            alert(status);
        },
        success: function(data) {
            $('#cidade').html('').selectmenu('refresh', true);
            $('#cidade').append('<option value="0" style="text-align:center;font-weight:bold;">Todos</option>');
            for (i = 0; i < data.length; i++) {
                $('#cidade').append('<option value=' + data[i].codigo + ' style="text-align:center;font-weight:bold;">' + data[i].cidade + '</option>');

            }
            $('#cidade').prop('disabled', false);
            $('#cidade').selectmenu('refresh', true);
        }
    });


})

function getCidade() {
    var uf = $('#uf').val();
    var cidade = $('#cidade').val();
    if (uf == 0) {
        uf = null

    }
    if (cidade == 0) {
        getSegmento();
    }
    var data = $.localStorage.get('dados_usuario');
    var codent = data[13].usuario.codent;
    $('#cidade').html('');
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        async: true,
        data: {
            a: 'a8d017',
            codent: codent,
            acs: '2',
            uf: uf
        },
        crossDomain: true,
        error: function(xhr, status, error) {
            alert(status);
        },
        success: function(data) {

            $('#cidade').append('<option value="0" style="text-align:center;font-weight:bold;">Todas</option>');
            for (i = 0; i < data.length; i++) {
                $('#cidade').append('<option value=' + data[i].codigo + ' style="text-align:center;font-weight:bold;">' + data[i].cidade + '</option>');
                $('#cidade').selectmenu('refresh', true);
            }
        }
    });
}

function getSegmento() {
    var cidade = $('#cidade').val();
    var uf = $('#uf').val();
    if (cidade == 0) {
        cidade = null
    }
    if (uf == 0) {
        uf = null
    }

    var data = $.localStorage.get('dados_usuario');
    var codent = data[13].usuario.codent;
    $('#segmento').html('');

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: _HOST_,
        data: {
            a: 'a8d017',
            codent: codent,
            acs: '3',
            uf: uf,
            cid: cidade
        },
        error: function(xhr, status, error) {
            alert(status);
        },
        success: function(data) {
            $('#segmento').append('<option value="0" style="text-align:center;font-weight:bold;">Todos</option>');
            for (i = 0; i < data.length; i++) {
                $('#segmento').append('<option value=' + data[i].codseg + ' style="text-align:center;font-weight:bold;">' + data[i].desseg + '</option>');
                $('#segmento').selectmenu('refresh', true);
            }
        }
    });
}

function getEcs() {
    var cidade = $('#cidade').val();
    var uf = $('#uf').val();
    var segmento = $('#segmento').val();
    $.localStorage.set('cidade', cidade);
    $.localStorage.set('uf', uf);
    $.localStorage.set('segmento', segmento);
    location.href = "lojas.html";
}