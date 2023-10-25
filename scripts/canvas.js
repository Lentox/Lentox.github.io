// canvas.js
let canvas;
let context;
let offScreenCanvas;
let offScreenContext;

function initCanvas() {
    canvas = document.getElementById("hexagonCanvas");
    context = canvas.getContext("2d");

    // Create an off-screen canvas
    offScreenCanvas = document.createElement("canvas");
    offScreenContext = offScreenCanvas.getContext("2d");

    // Event listeners for clicks and window resize
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("mouseenter", handleCanvasEnter);
    canvas.addEventListener("mouseleave", handleCanvasLeave);
    window.addEventListener('resize', resizeCanvas);

    // Initialize the canvas
    resizeCanvas();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw on the off-screen canvas
    offScreenCanvas.width = canvas.width;
    offScreenCanvas.height = canvas.height;
    drawOnOffScreenCanvas();

    // Copy the off-screen canvas to the visible canvas
    context.drawImage(offScreenCanvas, 0, 0);
}

// Zeichnen der offScreenCanvas um flackern beim resize zu vermeiden
function drawOnOffScreenCanvas() {
    // Draw the background Hexagons on the off-screen canvas
    drawHexagons();
    // Draw the SocialMediaFields on the off-screen canvas
    drawSocialMediaFields();
    // Draw the NavBarFields on the off-screen canvas
    drawNavFields();
    // Draw the Digital-Clock on the off-screen canvas
    digitalClock();
    // Draw the modeSlider on the off-screen canvas
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
        if (hexagoneArray[i].row === modeHexagonPosition.row && hexagoneArray[i].col === modeHexagonPosition.col){
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
