function aperturaMenuTimer() {
    var div = document.getElementById('body');
    var div2 = document.getElementById('start');
    var impostazioni = document.getElementById('impostazioni');
    var conferma = document.getElementById('conferma');


    div.style.display = 'none';
    div2.style.display = 'none';
    impostazioni.style.display = 'flex';
    conferma.style.display = 'flex';
}

function home() {
    var div = document.getElementById('body');
    var div2 = document.getElementById('start');

    div.style.display = 'flex';
    div2.style.display = 'flex';
    var impostazioni = document.getElementById('impostazioni');
    impostazioni.style.display = 'none';
    var conferma = document.getElementById('conferma');
    conferma.style.display = 'none';

    document.getElementById('timer').textContent = formatTime(minutes, seconds);
    document.getElementById('turni').textContent = turno + '/' + turni;
}

var seconds = 0;
var minutes = 25;
var turno = 1;
var turni = 4;
var tempopausa = 5;
var pausalunga = 10;
var round = 2;
var inpausa = false;
var timerInterval;
var deciso = false;

function submit() {
    deciso = true;
    if (document.getElementById('studio').value != "") {
        minutes = document.getElementById('studio').value;
    }
    if (document.getElementById('numeroround').value != "") {
        turni = document.getElementById('numeroround').value;
    }
    if (document.getElementById('tempopausa').value != "") {
        tempopausa = document.getElementById('tempopausa').value;
    }
    if (document.getElementById('pausalunga').value != "") {
        pausalunga = document.getElementById('pausalunga').value;
    }
    if (document.getElementById('round').value != "") {
        round = document.getElementById('round').value;
    }

    home();
}

function start() {

    var div = document.getElementById('inizio');
    var div2 = document.getElementById('pausa');

    document.getElementById('tomato').style.borderTopColor = 'tomato';
    document.getElementById('tomato').style.borderBottomColor = 'tomato';

    div.style.display = 'none';
    div2.style.display = 'flex';

    document.getElementById('turni').textContent = turno + '/' + turni;

    inpausa = false;

    if (turno === turni+1) {
        div.style.display = 'flex';
        div2.style.display = 'none';
        turno = 0;
        document.getElementById('turni').textContent = turno + '/' + turni;
        return;
    }

    timerInterval = setInterval(function () {

        document.getElementById('timer').textContent = formatTime(minutes, seconds);

        if (inpausa == true) {
            return;
        }

        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                clearInterval(timerInterval);

                if (turno != round) {
                    minutes = tempopausa;
                    seconds = 0;
                    document.getElementById('timer').textContent = formatTime(minutes, seconds);
                }
                if (turno == round) {
                    minutes = pausalunga;
                    seconds = 0;
                    document.getElementById('timer').textContent = formatTime(minutes, seconds);
                }

                div.style.display = 'flex';
                div2.style.display = 'none';
                relax();
                turno++;
            }
        }
    }, 10);
}

function relax() {
    var div = document.getElementById('tomato');
    div.style.borderTopColor = '#54d16f';
    div.style.borderBottomColor = '#54d16f';
    document.getElementById('inizio').disabled = true;
    document.getElementById('stop').disabled = true;

    timerInterval = setInterval(function () {
        document.getElementById('timer').textContent = formatTime(minutes, seconds);

        if (seconds > 0) {
            seconds--;
        } else {
            if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                clearInterval(timerInterval);
                if (document.getElementById('studio').value != "") {
                    minutes = document.getElementById('studio').value;
                } else {
                    minutes = 25;
                }
                if (document.getElementById('numeroround').value != "") {
                    turni = document.getElementById('numeroround').value;
                } else {
                    turni = 4;
                }
                if (document.getElementById('tempopausa').value != "") {
                    tempopausa = document.getElementById('tempopausa').value;
                } else {
                    tempopausa = 5;
                }
                if (document.getElementById('pausalunga').value != "") {
                    pausalunga = document.getElementById('pausalunga').value;
                } else {
                    pausalunga = 10;
                }
                if (document.getElementById('round').value != "") {
                    round = document.getElementById('round').value;
                } else {
                    round = 2;
                }
                document.getElementById('inizio').disabled = false;
                document.getElementById('stop').disabled = false;
                start();
            }
        }
    }, 10);
}


function formatTime(minutes, seconds) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function pause() {
    var div = document.getElementById('inizio');
    var div2 = document.getElementById('pausa');

    div.style.display = 'flex';
    div2.style.display = 'none';
    inpausa = true;
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = formatTime(minutes, seconds);
}

function stop() {
    var div = document.getElementById('inizio');
    var div2 = document.getElementById('pausa');
    inpausa = true;
    clearInterval(timerInterval);
    if (deciso == false) {
        minutes = 25;
        seconds = 0;
        document.getElementById('timer').textContent = formatTime(minutes, seconds);
    } else {
        document.getElementById('timer').textContent = formatTime(document.getElementById('studio').value, 0);
        minutes = document.getElementById('studio').value;
        seconds = 0;
    }
    div.style.display = 'flex';
    div2.style.display = 'none';
}