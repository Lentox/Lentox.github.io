//region Festlegen der Werte
const canvas = document.getElementById("hexagonCanvas");
const context = canvas.getContext("2d");

const hexagonRadius = 30;
const hexagonWidth = Math.sqrt(3) * hexagonRadius;
const hexagonHeight = 2 * hexagonRadius;
const hexagonVerticalSpacing = hexagonHeight * 0.75;
const hexagonHorizontalSpacing = hexagonWidth;

const borderColor = "black";
//endregion

// Position und Größe des weißen Hexagons in der linken oberen Ecke
const whiteHexagonX = 130; // Anpassen Sie die X-Koordinate nach Bedarf
const whiteHexagonY = 135; // Anpassen Sie die Y-Koordinate nach Bedarf
var animationSpeed = 2000; // Ändern Sie die Geschwindigkeit der Randfarbänderung hier (in Millisekunden)

//Punkte an denen keine Hexagone spawnen dürfen
function createStaticHexagone(startX, startY) {
    var staticHexagone = [];
    staticHexagone.push(whiteHexagonX - 52, whiteHexagonY);
    staticHexagone.push(whiteHexagonX - 25, whiteHexagonY - 45);
    staticHexagone.push(whiteHexagonX, whiteHexagonY - 90);
    staticHexagone.push(whiteHexagonX + 52, whiteHexagonY - 90);
    staticHexagone.push(whiteHexagonX + 104, whiteHexagonY - 90);
    staticHexagone.push(whiteHexagonX + 156, whiteHexagonY - 90);
    staticHexagone.push(whiteHexagonX + 208, whiteHexagonY - 90);
    staticHexagone.push(whiteHexagonX + 260, whiteHexagonY - 90);
    staticHexagone.push(whiteHexagonX + 286, whiteHexagonY - 45);
    staticHexagone.push(whiteHexagonX + 312, whiteHexagonY);
    staticHexagone.push(whiteHexagonX + 286, whiteHexagonY + 45);
    staticHexagone.push(whiteHexagonX + 260, whiteHexagonY + 90);
    staticHexagone.push(whiteHexagonX + 208, whiteHexagonY + 90);
    staticHexagone.push(whiteHexagonX + 156, whiteHexagonY + 90);
    staticHexagone.push(whiteHexagonX + 104, whiteHexagonY + 90);
    staticHexagone.push(whiteHexagonX + 52, whiteHexagonY + 90);
    staticHexagone.push(whiteHexagonX, whiteHexagonY + 90);
    staticHexagone.push(whiteHexagonX - 25, whiteHexagonY + 45);

    function drawAndPushHexagon(startX,startY) {
        staticHexagone.push(startX, startY);
        startX += 52;
    }

    for (let a = 0; a < 6; a++) {
        drawAndPushHexagon();
    }

    startY += 45;
    startX = whiteHexagonX + 25;

    for (let a = 0; a < 5; a++) {
        drawAndPushHexagon();
    }

    startY -= 90;
    startX = whiteHexagonX + 25;

    for (let a = 0; a < 5; a++) {
        drawAndPushHexagon();
    }

    return staticHexagone;
}

// Zeichnen eines Hexagons
function drawHexagon(x, y, fillColor, borderColor) {
    context.beginPath();
    for (let i = 0; i < 6; i++) {
        const angle = (i * 60 + 30) * Math.PI / 180;
        const xPos = x + hexagonRadius * Math.cos(angle);
        const yPos = y + hexagonRadius * Math.sin(angle);
        if (i === 0) {
            context.moveTo(xPos, yPos);
        } else {
            context.lineTo(xPos, yPos);
        }
    }
    context.closePath();

    // Fülle das Hexagon mit der gewünschten Farbe
    context.fillStyle = fillColor;
    context.fill();

    // Zeichne den Hexagon-Rand in der angegebenen Farbe
    context.strokeStyle = borderColor;
    context.lineWidth = 2;
    context.stroke();

}

// Platzieren weiterer Hexagone, wenn WindowResize
function placeHexagonsAfterwards() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let numRows = Math.ceil(canvasHeight / hexagonVerticalSpacing);
    let numCols = Math.ceil(canvasWidth / hexagonHorizontalSpacing);

    // Um einen weißen rand zu vermeiden
    numRows += 2;
    numCols += 2;

    // Zeichnen von Hexagons
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {

            const x = col * hexagonHorizontalSpacing + (row % 2) * (hexagonWidth / 2);
            const y = row * hexagonVerticalSpacing;

            const fillColor = "rgb(13, 51, 85)";
            drawHexagon(x, y, fillColor, borderColor);
        }
    }
}

// Platzieren der Hexagone für Hintergrund beim Aufruf der Website
function placeHexagonsOnStart() {
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let numRows = Math.ceil(canvasHeight / hexagonVerticalSpacing);
    let numCols = Math.ceil(canvasWidth / hexagonHorizontalSpacing);

    // Erhöhen von Anzahl Hexagons um einen weißen Rand zu vermeiden
    numRows += 2;
    numCols += 2;

    const animatedHexagons = [];

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const x = col * hexagonHorizontalSpacing + (row % 2) * (hexagonWidth / 2);
            const y = row * hexagonVerticalSpacing;

            // Überprüfen Sie, ob in der Nähe animierte Hexagons vorhanden sind
            let hasNearbyAnimation = false;
            for (let i = 0; i < animatedHexagons.length; i++) {
                const animatedHexagon = animatedHexagons[i];
                const distance = Math.sqrt(Math.pow(x - animatedHexagon.x, 2) + Math.pow(y - animatedHexagon.y, 2));
                if (distance < hexagonWidth) {
                    hasNearbyAnimation = true;
                    break;
                }
            }

            // Zufällig auswählen, welches Hexagon den Farbwechseleffekt haben soll, wenn keine Animation in der Nähe ist
            const shouldAnimate = !hasNearbyAnimation && Math.random() < 0.02; // 2 % der Fläsche bzw. Hexagons animieren

            if (shouldAnimate) {
                if (shouldAnimateCheck(x,y)){
                    animateHexagonColor(x, y, animatedHexagons);
                }else{
                    drawHexagon(x, y, "rgb(13, 51, 85)", borderColor);
                }
            } else {
                drawHexagon(x, y, "rgb(13, 51, 85)", borderColor);
            }

            if (shouldAnimate) {
                animatedHexagons.push({x: x, y: y});
            }
        }
    }
}

// Für Fade-Effekt
function animateHexagonColor(x, y, animatedHexagons) {

    const currentTime = new Date().getTime();
    const color = "rgb(" + Math.sin(currentTime / animationSpeed) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 2) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 4) * 128 + 128 + ")";

    requestAnimationFrame(function () {
        drawHexagon(x, y, "rgb(13, 51, 85)", color); // Immer wieder erneutes Zeichnen der Ränder um Fade-Effekt zu erzielen
        changeColors(x, y, 2);
    });

    setTimeout(function () {
        // FNachbarn finden und filtern welche Animiert sind
        const neighbors = findNeighbors(x, y).filter(function (neighbor) {
            return !animatedHexagons.some(function (animatedHexagon) {
                return animatedHexagon.x === neighbor.x && animatedHexagon.y === neighbor.y;
            });
        });

        // zufälligen Nachbarn auswählen, um ihn zu animieren
        if (neighbors.length > 0) {
            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            animateHexagonColor(randomNeighbor.x, randomNeighbor.y, animatedHexagons);
            animatedHexagons.push(randomNeighbor); // Ausgewählten nachbarn als animiert markieren
        }
    }, 5000);
}

// Wechselt die Farbe für den Fade-Effekt
function changeColors(x, y, opacity) {
    const currentTime = new Date().getTime();

    const color = "rgba(" + Math.sin(currentTime / animationSpeed) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 2) * 128 + 128 +
        ", " + Math.sin(currentTime / animationSpeed + 4) * 128 + 128 + ", " + opacity + ")";

    requestAnimationFrame(function () {
        drawHexagon(x, y, "rgb(13, 51, 85)", color); // Immer wieder erneutes Zeichnen der Ränder um Fade-Effekt zu erzielen
        if (opacity > 0.2) {
            changeColors(x, y, opacity - 0.006);
        } else {
            changeColorBlack(x, y, opacity)
        }
    });
}

// Ende des Fade-Effekts, Fade-Effekt zurück zur Standardfarbe
function changeColorBlack(x, y) {

    const FADE_DURATION = 2.0 * 1000; // 2 seconds
    let startTime = -1.0;
    let opacity = 0; // Initial opacity

    // Function to render the current frame
    function render(currTime) {
        if (startTime < 0) {
            startTime = currTime;
        }

        // Calculate the time that animation has been running (in ms)
        const timeRunning = currTime - startTime;

        // Calculate opacity based on time
        if (timeRunning < FADE_DURATION) {
            opacity = timeRunning / FADE_DURATION;
        } else {
            opacity = 1;
        }

        // Draw the hexagon with the updated border color
        drawHexagon(x, y, "rgb(13, 51, 85)", "rgba(0, 0, 0, " + opacity + ")");

        if (opacity < 0.8) {
            // Continue animating
            requestAnimationFrame(render);
        }
    }

    // Start the animation
    requestAnimationFrame(render);

}

// Funktion zum Finden von benachbarten Hexagons
function findNeighbors(x, y) {
    const neighbors = [];

    const dx = hexagonWidth; // Anpassen Sie diesen Wert, um den horizontalen Abstand zu ändern
    const dy = hexagonHeight * 0.75; // Anpassen Sie diesen Wert, um den vertikalen Abstand zu ändern

    // Rechts
    neighbors.push({x: x + dx, y: y});

    // Links
    neighbors.push({x: x - dx, y: y});

    // Oben rechts
    neighbors.push({x: x + dx / 2, y: y - dy});

    // Oben links
    neighbors.push({x: x - dx / 2, y: y - dy});

    // Unten rechts
    neighbors.push({x: x + dx / 2, y: y + dy});

    // Unten links
    neighbors.push({x: x - dx / 2, y: y + dy});

    return neighbors;
}

// Funktion zum Zeichnen eines weißen Hexagons (Navbar)
function drawWhiteHexagon(x, y, borderSides) {
    const radius = 30; // Radius des Hexagons
    context.beginPath();

    // Berechnung der sechs Eckpunkte des Hexagons
    for (let i = 0; i < 6; i++) {

        context.strokeStyle = "rgb(0, 51, 102)";
        context.lineWidth = 2;
        context.stroke();

        context.lineJoin = "round";

        drawHexagon(x, y, "rgb(0, 51, 102)");

        // Zeichnen der Ränder basierend auf den borderSides
        if (borderSides.left) {
            context.beginPath();
            context.strokeStyle = "blue";

            // Zeichnen der Linie
            context.lineWidth = 4;
            context.moveTo(x - 26, y + 16);
            context.lineTo(x - 26, y - 16);
            context.stroke();
        }

        if (borderSides.right) {
            context.beginPath();
            context.strokeStyle = "blue";

            // Zeichnen der Linie
            context.lineWidth = 4;
            context.moveTo(x + 26, y - 16);
            context.lineTo(x + 26, y + 16);
            context.stroke();
        }

        if (borderSides.topLeft) {
            context.beginPath();
            context.strokeStyle = "blue";

            //Zeichnen der Linie
            context.lineWidth = 4;
            context.moveTo(x, y - radius);
            context.lineTo(x - radius * 0.87, y - radius / 2);
            context.stroke();

            //Zeichnen von Punkten um Linien abzurunden
            context.fillStyle = "blue";
            context.lineWidth = 0;
            context.arc(x, y - radius, 1.7, 0, 2 * Math.PI);
            context.arc(x - radius * 0.87, y - radius / 2, 1.7, 0, 2 * Math.PI);
            context.fill();
        }

        if (borderSides.topRight) {
            context.beginPath();
            context.moveTo(x, y - radius);
            context.lineTo(x + radius * 0.87, y - radius / 2);
            context.lineWidth = 4;
            context.strokeStyle = "blue";
            context.stroke();
        }

        if (borderSides.bottomLeft) {
            context.beginPath();

            // Zeichnen der Linie
            context.moveTo(x, y + radius);
            context.lineTo(x - radius * 0.87, y + radius / 2);
            context.lineWidth = 4;
            context.strokeStyle = "blue";
            context.stroke();

            // Zeichnen von Punkten um Linien abzurunden
            context.fillStyle = "blue";
            context.lineWidth = 0;
            context.arc(x, y + radius, 1.7, 0, 2 * Math.PI);
            context.arc(x - radius * 0.87, y + radius / 2, 1.7, 0, 2 * Math.PI);
            context.fill();
        }

        if (borderSides.bottomRight) {
            context.beginPath();

            // Zeichnen der Linie
            context.moveTo(x, y + radius);
            context.lineTo(x + radius * 0.87, y + radius / 2);
            context.lineWidth = 4;
            context.strokeStyle = "blue";
            context.stroke();
            // Zeichnen von Punkten um Linien abzurunden
            context.fillStyle = "blue";
            context.lineWidth = 0;
            context.arc(x, y + radius, 1.7, 0, 2 * Math.PI);
            context.arc(x + radius * 0.87, y + radius / 2, 1.7, 0, 2 * Math.PI);
            context.fill();
        }
    }

    context.closePath();

}

// Funktion zum Zeichnen der ganzen Navbar
function drawNavbar(startX, startY) {

    let i;
    let borderSides;
    const rangeNavBar = 6;

    // Draws Horizontal Hexagons
    for (let a = 0; a < 6; a++) {
        if (a === 0) { // Erstes Hexagon

            borderSides = {
                left: true,
                right: false,
                bottomLeft: true,
                bottomRight: false,
                topLeft: true,
                topRight: false
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        } else if (a === 5) { // Letztes Hexagon

            borderSides = {
                left: false,
                right: true,
                bottomLeft: false,
                bottomRight: true,
                topLeft: false,
                topRight: true
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        } else {
            // Hexagons in der Mitte
            borderSides = {
                left: false,
                right: false,
                bottomLeft: false,
                bottomRight: false,
                false: false,
                topRight: false
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        }
    }

    //Untere Reihe
    startX = whiteHexagonX;
    startY += 45;
    startX += 25;
    for (i = 0; i < rangeNavBar - 1; i++) {

        if (i === 0) { // Erstes Hexagon

            borderSides = {
                left: true,
                right: false,
                bottomLeft: true,
                bottomRight: true,
                topLeft: false,
                topRight: false
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        } else if (i === 4) { // Letztes Hexagon

            borderSides = {
                left: false,
                right: true,
                bottomLeft: true,
                bottomRight: true,
                topLeft: false,
                topRight: false
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        } else {
            // Hexagons in der Mitte
            borderSides = {
                left: false,
                right: false,
                bottomLeft: true,
                bottomRight: true,
                topLeft: false,
                topRight: false
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        }

    }

    //Obere Reihe
    startX = whiteHexagonX;
    startY -= 90;
    startX += 25;
    for (i = 0; i < rangeNavBar - 1; i++) {

        if (i === 0) { // Erstes Hexagon

            borderSides = {
                left: true,
                right: false,
                bottomLeft: false,
                bottomRight: false,
                topLeft: true,
                topRight: true
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        } else if (i === 4) { // Letztes Hexagon

            borderSides = {
                left: false,
                right: true,
                bottomLeft: false,
                bottomRight: false,
                topLeft: true,
                topRight: true
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        } else {
            // Hexagons in der Mitte
            borderSides = {
                left: false,
                right: false,
                bottomLeft: false,
                bottomRight: false,
                topLeft: true,
                topRight: true
            };
            staticHexagone.push(startX,startY);
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        }

    }

}

// Wird beim Resize vom Window aufgerufen
window.addEventListener("resize", function () {
    placeHexagonsAfterwards();
    drawNavbar(whiteHexagonX, whiteHexagonY);
});

function shouldAnimateCheck(x, y){
    for (var i = 0; i < staticHexagone.length; i++){
        //Könnte falsch sein
        if (x >= staticHexagone.x + 5 && x <= staticHexagone.x - 5 && y >= staticHexagone.y + 5 && y <= staticHexagone.y - 5){
            return false;
        }else{
            return true;
        }
    }
    // Wenn true wird Hexagon animiert
    //return true;
}

var staticHexagone = createStaticHexagone(whiteHexagonX,whiteHexagonY);
placeHexagonsOnStart();
drawNavbar(whiteHexagonX, whiteHexagonY);
