// clock.js
let counter = 0;
let clock;
class Clock {
    constructor() {
        this._hours = 0;
        this._minutes = 0;
        this._seconds = 0;
    }

    // Getter für Stunden
    get hours() {
        return this._hours;
    }

    // Setter für Stunden mit Event-Auslösung
    set hours(value) {
        if (this._hours !== value) {
            this._hours = value;
            this.onHoursChange(); // Hier wird das Event ausgelöst
        }
    }

    // Getter für Minuten
    get minutes() {
        return this._minutes;
    }

    // Setter für Minuten mit Event-Auslösung
    set minutes(value) {
        if (this._minutes !== value) {
            this._minutes = value;
            this.onMinutesChange(); // Hier wird das Event ausgelöst
        }
    }

    // Getter für Sekunden
    get seconds() {
        return this._seconds;
    }

    // Setter für Sekunden mit Event-Auslösung
    set seconds(value) {
        if (this._seconds !== value) {
            this._seconds = value;
            this.onSecondsChange(); // Hier wird das Event ausgelöst
        }
    }

    // Event-Handler für Stundenänderungen
    onHoursChange() {
        // Code, der ausgeführt wird, wenn sich die Stunde ändert
        for (let i = 0; i < hexagoneArray.length; i++) {
            if (hexagoneArray[i].row === -2 && hexagoneArray[i].col === -4){
                hexagoneArray[i].drawHoursHexagon(0,0,40);
            }
        }
    }

    // Event-Handler für Minutenänderungen
    onMinutesChange() {
        // Code, der ausgeführt wird, wenn sich die Minute ändert
        for (let i = 0; i < hexagoneArray.length; i++) {
            if (hexagoneArray[i].row === 0 && hexagoneArray[i].col === 0){
                hexagoneArray[i].drawMinutesHexagon(0,0,40);
            }
        }
    }

    // Event-Handler für Sekundenänderungen
    onSecondsChange() {
        // Code, der ausgeführt wird, wenn sich die Sekunde ändert
        for (let i = 0; i < hexagoneArray.length; i++) {
            if (hexagoneArray[i].row === 2 && hexagoneArray[i].col === 4){
                hexagoneArray[i].drawSecondsHexagon(0,0,40);
            }
        }
    }
}

function digitalClock(){

    // Digital Clock
    setInterval(() => {
        let time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();

        // Sicherstellen, dass Stunden, Minuten und Sekunden zweistellig dargestellt werden,
        // indem führende Nullen hinzufügt werden, wenn kleiner als 10.
        hours = hours > 9 ? hours : "0" + hours;
        minutes = minutes > 9 ? minutes : "0" + minutes;
        seconds = seconds > 9 ? seconds : "0" + seconds;


        // Clock-Instanz erstellen
        clock = new Clock();

        // Setzen von Stunden, Minuten und Sekunden
        clock.hours = hours;
        clock.minutes = minutes;
        clock.seconds = seconds;
    }, 1000);

}