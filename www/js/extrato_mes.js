$(document).ready(function(e) {

    var data = $.localStorage.get('dados_usuario');
    carregarExtrato();

    function carregarExtrato(mes, ano) {
        $.ajax({
                type: 'GET',
                dataType: 'json',
                url: _HOST_,
                data: {
                    a      : '751fc0',
                    codent : data[13].usuario.codent,
                    codass : data[13].usuario.codass,
                    mesform: mes,
                    anoform: ano
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
                    var selectMeses  = geraSelectMeses(data.mes, data.ano);
                    $('#selectMeses').html('');
                    $('#tabelaExtrato').html('');
                    $('#totalExtrato').html('');
                    
                    nomeMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

                    // Linhas usadas apenas para exibir no label do select o mes atual no primiro acesso ao extrato
                    if(mes && ano) {
                        $('#selectMeses-button').children('span').text(nomeMeses[mes-1]+'/'+ano);
                    } else {
                        $('#selectMeses-button').children('span').text(nomeMeses[data.mes-1]+'/'+data.ano);
                    }

                    $('#selectMeses').append(selectMeses);

                    if (data.extrato != null) {
                        $.each(data.extrato, function (k, v) {
                            let valorAjustado = 0;
                            if(v.valorParcela < 0) {
                                valorAjustado = v.valorParcelaFormatado.replace('-', '');
                            } else {
                                valorAjustado = '-' + v.valorParcelaFormatado;
                            }

                            if (v.estornada != 1) {
                                $('#tabelaExtrato').append('<tr><td align="left">'+v.dataCompra + '</td><td align="center">'+v.parcelas+'</td><td>'+v.nomeEstabelecimento+'</td><td align="right">'+valorAjustado + '</td></tr>');     
                            }
                        });
                    } else {
                        $('#tabelaExtrato').append('<tr><td align="left"></td><td align="center"></td><td></td><td align="right"></td></tr>');
                    }


                    let totalAjustado = 0;

                    if(data.total.indexOf('-') != -1) {
                        totalAjustado = data.total.replace('-', '');
                    } else {
                        totalAjustado = '-' + data.total;
                    }

                    if(totalAjustado == '-0,00') {
                        totalAjustado = '0.00';
                    }
                    $('#totalExtrato').append('<tr><td colspan="3" align="right">Total</td><td align="right">'+totalAjustado+'</td></tr>');    
                }
            });
        }
       
        function geraSelectMeses(mesAtual, anoAtual) {
            var select = '';
            var nomeMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
            select += '<option> --- </option>';
            for(i = 12; i > 0; i--) {
                select += '<option value="'+mesAtual+'/'+anoAtual+'">'+ nomeMeses[mesAtual-1]+'/'+anoAtual+'</option>';
                mesAtual--;
                if(mesAtual == 0) {
                    mesAtual = 12;
                    anoAtual--;
                }
            }
            return select;
        }

       $('#selectMeses').on('change', function () {
           let mesano = $(this).children('option:selected').val().split('/');
            carregarExtrato(mesano[0], mesano[1]);
        });
    }
);