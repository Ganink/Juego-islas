$(function () {
    let count = 0,
        counter = 0;
    let user;
    $(document).tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function (position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });
    $('form').hide();
    $('#opener').click(function () {
        reset();
    })

    $('button').click(function () {
        var exReg = new RegExp('^[a-zA-Z]');
        let a = $('#dg').val();
        console.log('NOMBRE: ' + a);
        var ok = exReg.exec(a);

        let b = $(this).val();
        console.log('NIVEL: ' + b);
        if (ok) {
            $('#gnt').remove();
            if (b == 'FACIL') { // 4 img
                count = 4;
            }
            if (b == 'MEDIO') { // 7 img
                count = 7;
            }
            if (b == 'DIFICIL') { // 9 img
                count = 9;
            }
            genImg();
            dlg.dialog('close');
            nameIsla();
            $('img').draggable({
                revert: 'invalid',
                helper: "clone",
                cursor: "move"
            });
        }
    });

    let nIsla = ['La Palma', 'El Hierro', 'La Gomera', 'Tenerife', 'Las Palmas', 'Lanzarote', 'Fuerteventura'];
    let cIsla = ['La-Palma', 'El-Hierro', 'La-Gomera', 'Tenerife', 'Las-Palmas', 'Lanzarote', 'Fuerteventura'];
    let island = [
        '<img src="images/la palma/lp1.jpg" title="El roque de los muchachos" class="La-Palma"/>',
        '<img src="images/la palma/lp2.jpg" title="El barco de la virgen" class="La-Palma"/>',
        '<img src="images/la palma/lp3.jpg" title="La caldera de Taburiente" class="La-Palma"/>',
        '<img src="images/la palma/lp4.jpg" title="Charco Azul" class="La-Palma"/>',
        /*------------------------*/
        '<img src="images/el hierro/eh1.jpg" title="Mirador de Isora" class="El-Hierro"/>',
        '<img src="images/el hierro/eh2.jpg" title="Mirador de La Peña" class="El-Hierro"/>',
        '<img src="images/el hierro/eh3.jpg" title="Playa del Tamaduste" class="El-Hierro"/>',
        '<img src="images/el hierro/eh4.jpg" title="Puerto de La Restinga" class="El-Hierro"/>',
        /*------------------------*/
        '<img src="images/tenerife/tf1.jpg" title="El Teide" class="Tenerife"/>',
        '<img src="images/tenerife/tf2.jpg" title="Playa de la Arena" class="Tenerife"/>',
        '<img src="images/tenerife/tf3.jpg" title="Auditorio de Tenerife" class="Tenerife"/>',
        '<img src="images/tenerife/tf4.jpg" title="Parque García Sanabria" class="Tenerife"/>',
        /*------------------------*/
        '<img src="images/la gomera/gm1.jpg" title="Roque del Agando" class="La-Gomera"/>',
        '<img src="images/la gomera/gm2.jpg" title="Valle Gran Rey" class="La-Gomera"/>',
        '<img src="images/la gomera/gm3.jpeg" title="Torre del Conde" class="La-Gomera"/>',
        '<img src="images/la gomera/gm4.jpg" title="Los chorros de Epina" class="La-Gomera"/>',
        /*------------------------*/
        '<img src="images/las palmas/lpg1.jpg" title="Playa de las Canteras" class="Las-Palmas"/>',
        '<img src="images/las palmas/lpg2.jpg" title="Castillo de la Luz" class="Las-Palmas"/>',
        '<img src="images/las palmas/lpg3.jpg" title="Parque Doramas" class="Las-Palmas"/>',
        '<img src="images/las palmas/lpg4.jpg" title="Parque Romano" class="Las-Palmas"/>',
        /*------------------------*/
        '<img src="images/lanzarote/lz1.png" title="Parque nacional Timanfaya" class="Lanzarote"/>',
        '<img src="images/lanzarote/lz2.jpg" title="Jardín de Cactus de Lanzarote" class="Lanzarote"/>',
        '<img src="images/lanzarote/lz3.jpg" title="Cueva de los Verdes" class="Lanzarote"/>',
        '<img src="images/lanzarote/lz4.jpg" title="Museo de la Piratería" class="Lanzarote"/>',
        /*------------------------*/
        '<img src="images/fuerteventura/fv1.jpg" title="Tindaya" class="Fuerteventura"/>',
        '<img src="images/fuerteventura/fv2.jpg" title="salinas del carmen" class="Fuerteventura"/>',
        '<img src="images/fuerteventura/fv3.jpg" title="Cueva Del Llano" class="Fuerteventura"/>',
        '<img src="images/fuerteventura/fv4.jpg" title="Playa de Sotavento" class="Fuerteventura"/>'
    ]

    function genImg() {
        let div = $('<div id="gnt"></div>');
        for (let i = 0; i < count; i++) {
            let rd = Math.floor((Math.random() * island.length));
            $(div).append(island[rd]);
        }
        $(div).insertBefore('#islas');
    }

    function nameIsla() {
        for (let i = 0; i < nIsla.length; i++) {
            let div = ('<div id="' + nIsla[i] + '" title="' + nIsla[i] + '" class="islas ' + cIsla[i] + ' ui-draggable ui-draggable-handle"><h4>' + nIsla[i] + '</h4></div>');
            $(div).appendTo('#islas');
        }

        let count = 0;
        $('.islas').droppable({
            //tolerance: 'fit',
            drop: function (event, ui) {
                for (i = 0; i < cIsla.length; i++) {
                    let x = 'islas ' + ui.draggable.attr('class') + ' ui-droppable';
                    console.log(x);
                    $(this).append(ui.draggable);
                    if ($(this).attr('class') == x) {
                        let z = $('#gnt').children().length - 1;
                        console.log(z);

                        notification('success', 'Correcto');
                        counter++;
                        score();
                        if (z == 0) {
                            endGame();
                        }
                        return;
                    }
                    if ($(this).attr('class') != x) {
                        let z = $('#gnt').children().length - 1;
                        console.log(z);

                        count++;
                        if (count == 7) {
                            if ($(this).attr('class') != x) {
                                notification('error', 'Isla incorrecta');
                                count = 0;
                                counter--;
                                score();
                                if (z == 0) {
                                    endGame();
                                }
                                return;
                            }
                        }

                    }
                }
            }
        });

    }

    function score() {
        user = $('form input').val();
        $('#score').text('Jugador: ' + user + ' Puntuacion: ' + counter);
    }

    function reset() {
        counter = 0;
        $('#gtn').remove();
        $('.islas').remove();
        dlg = $('#wd').dialog({
            height: 250,
            width: 250,
            modal: true
        });
        $('form').show('fade');
        $('#endGame').find('p').text('');
    }

    function endGame() {
        $('#endGame').find('p').text('Fin del juego. Puntuación: ' + counter + ' ¿Quieres seguir jugando?');
        $('#endGame').dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Continuar": function () {
                    $(this).dialog("close");
                    reset();
                },
                Cancelar: function () {
                    $(this).dialog("close");
                }
            }
        })
    }
})