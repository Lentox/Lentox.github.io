// canvas.js
let canvas;
let context;

function initCanvas() {
    canvas = document.getElementById("hexagonCanvas");
    context = canvas.getContext("2d");

    // Event-Listener für Klicks auf das Canvas
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("mouseenter", handleCanvasEnter);
    canvas.addEventListener("mouseleave", handleCanvasLeave);

    // Bei Änderungen der Fenstergröße, Canvas neu zeichnen
    window.addEventListener('resize', resizeCanvas);

    // Initial der Canvas erstellen
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Zeichne der Background Hexagone
    drawHexagons();
    // Zeichnen der SocialMediaFields
    drawSocialMediaFields();
    // Zeichnen der NavBarFields
    drawNavFields();
    // Zeichnen der Digital-Clock
    digitalClock();
    // Zeichnen des modeSliders
    modeSlider();
}

function handleCanvasClick(event) {
    // Code, der auf Klicks, auf die Canvas reagiert
    let x = 0;
    let y = 0;

    for (let i = 0; i < hexagoneArray.length; i++) {
        x = hexagoneArray[i].x;
        y = hexagoneArray[i].y;
        const dx = event.offsetX - x;
        const dy = event.offsetY - y;
        // Klick, auf DarkmodeButton
        if (hexagoneArray[i].row === 13 && hexagoneArray[i].col === 14){
            // Überprüfen, ob der Mausklick auf das Hexagon zeigt
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= 40) {
                // Der Klick war innerhalb des Hexagons
                darkmode = !darkmode;
                counter = 0;
                resizeCanvas();
            }
        }
        // Klick, auf Github Button
        if (hexagoneArray[i].row === 6 && hexagoneArray[i].col === 0){
            // Überprüfen, ob der Mausklick auf das Hexagon zeigt
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= 40) {
                // Der Klick war innerhalb des Hexagons
                window.open("https://github.com/Lentox", "_blank");
            }
        }
        // Klick, auf LinkedIn Button
        if (hexagoneArray[i].row === 5 && hexagoneArray[i].col === -2){
            // Überprüfen, ob der Mausklick auf das Hexagon zeigt
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= 40) {
                // Der Klick war innerhalb des Hexagons
                window.open("https://www.linkedin.com/in/tom-esser", "_blank");
            }
        }
        // Klick, auf Instagram Button
        if (hexagoneArray[i].row === 7 && hexagoneArray[i].col === 2){
            // Überprüfen, ob der Mausklick auf das Hexagon zeigt
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance <= 40) {
                // Der Klick war innerhalb des Hexagons
                window.open("https://www.instagram.com/t.esser_", "_blank");
            }
        }
    }
}

function handleCanvasEnter(event) {
    // Code, der auf das "mouseenter"-Event reagiert
}

function handleCanvasLeave(event) {
    // Code, der auf das "mouseleave"-Event reagiert
}

// Initialisieren der Canvas, wenn die Seite geladen wurde
window.addEventListener('load', initCanvas);
