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
}

function submit() {
    home();

    var minuti = document.getElementById('studio').value;
    var secondi = 0;

    document.getElementById('timer').textContent = formatTime(minuti, secondi);
}

var seconds = 0;
var minutes;
var pausa = false;
var timerInterval

function start() {

    var div = document.getElementById('inizio');
    var div2 = document.getElementById('pausa');

    div.style.display = 'none';
    div2.style.display = 'flex';

    if (pausa == false) {
        if (isNaN(parseInt(document.getElementById('studio').value))) {
            minutes = 25;
        } else {
            minutes = parseInt(document.getElementById('studio').value);
        }
    }
    pausa = false;

    if (isNaN(minutes) || minutes <= 0) {
        return;
    }

    timerInterval = setInterval(function () {

        document.getElementById('timer').textContent = formatTime(minutes, seconds);

        if (pausa == true) {
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
                    if (isNaN(parseInt(document.getElementById('studio').value))) {
                        minutes = 25;
                        seconds = 0;
                        document.getElementById('timer').textContent = formatTime(minutes, seconds);
                    } else {
                        document.getElementById('timer').textContent = formatTime(document.getElementById('studio').value, 0);
                    }
                div.style.display = 'flex';
                div2.style.display = 'none';
            }
        
        }
    }, 1000);

}

function formatTime(minutes, seconds) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function pause() {
    var div = document.getElementById('inizio');
    var div2 = document.getElementById('pausa');

    div.style.display = 'flex';
    div2.style.display = 'none';
    pausa = true;
    document.getElementById('timer').textContent = formatTime(minutes, seconds);
}

function stop() {
    var div = document.getElementById('inizio');
    var div2 = document.getElementById('pausa');
    pausa = true;
    clearInterval(timerInterval);
    if (isNaN(parseInt(document.getElementById('studio').value))) {
        minutes = 25;
        seconds = 0;
        document.getElementById('timer').textContent = formatTime(minutes, seconds);
    } else {
        document.getElementById('timer').textContent = formatTime(document.getElementById('studio').value, 0);
    }
    div.style.display = 'flex';
    div2.style.display = 'none';
}