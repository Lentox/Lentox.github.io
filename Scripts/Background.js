// Festlegen der Werte
var canvas = document.getElementById("hexagonCanvas");
var context = canvas.getContext("2d");

var hexagonRadius = 30;
var hexagonWidth = Math.sqrt(3) * hexagonRadius;
var hexagonHeight = 2 * hexagonRadius;
var hexagonVerticalSpacing = hexagonHeight * 0.75;
var hexagonHorizontalSpacing = hexagonWidth;

var borderColor = "black";

var placedHexagons = []; // Alle platzierten Hexagons und ihre Nachbarn (x,y,Nachbarn(x,y))
// ...

function drawHexagon(x, y, fillColor, borderColor) {
    context.beginPath();
    for (var i = 0; i < 6; i++) {
        var angle = (i * 60 + 30) * Math.PI / 180;
        var xPos = x + hexagonRadius * Math.cos(angle);
        var yPos = y + hexagonRadius * Math.sin(angle);
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

function placeHexagonsAfterwards(placedHexagons) {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var numRows = Math.ceil(canvasHeight / hexagonVerticalSpacing);
    var numCols = Math.ceil(canvasWidth / hexagonHorizontalSpacing);

    // Um einen weißen rand zu vermeiden
    numRows += 2;
    numCols += 2;

    // Zeichnen von Hexagons
    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {

            var x = col * hexagonHorizontalSpacing + (row % 2) * (hexagonWidth / 2);
            var y = row * hexagonVerticalSpacing;

            var fillColor = "rgb(13, 51, 85)";
            drawHexagon(x, y, fillColor, borderColor);
            //placedHexagons.push({x: x,y: y},{neighbours: findNeighbors(x,y)},{isAnimated: false});
        }
    }
    // Position und Größe des weißen Hexagons in der linken oberen Ecke
    var whiteHexagonX = 0; // Anpassen Sie die X-Koordinate nach Bedarf
    var whiteHexagonY = 0; // Anpassen Sie die Y-Koordinate nach Bedarf
    var whiteHexagonRadius = 30; // Anpassen Sie den Radius nach Bedarf

// Zeichnen Sie das weiße Hexagon
    //drawWhiteHexagon(whiteHexagonX, whiteHexagonY, whiteHexagonRadius);
}

function placeHexagonsOnStart(placedHexagons) {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    var numRows = Math.ceil(canvasHeight / hexagonVerticalSpacing);
    var numCols = Math.ceil(canvasWidth / hexagonHorizontalSpacing);

    // Erhöhen Sie die Anzahl der Hexagons an den Rändern, um den weißen Rand zu verbergen
    numRows += 2;
    numCols += 2;

    var animatedHexagons = [];

    for (var row = 0; row < numRows; row++) {
        for (var col = 0; col < numCols; col++) {
            var x = col * hexagonHorizontalSpacing + (row % 2) * (hexagonWidth / 2);
            var y = row * hexagonVerticalSpacing;

            // Überprüfen Sie, ob in der Nähe animierte Hexagons vorhanden sind
            var hasNearbyAnimation = false;
            for (var i = 0; i < animatedHexagons.length; i++) {
                var animatedHexagon = animatedHexagons[i];
                var distance = Math.sqrt(Math.pow(x - animatedHexagon.x, 2) + Math.pow(y - animatedHexagon.y, 2));
                if (distance < hexagonWidth) {
                    hasNearbyAnimation = true;
                    break;
                }
            }

            // Zufällig auswählen, welches Hexagon den Farbwechseleffekt haben soll, wenn keine Animation in der Nähe ist
            var shouldAnimate = !hasNearbyAnimation && Math.random() < 0.02; // Zum Beispiel 2% der Hexagons animieren

            if (shouldAnimate) {
                animateHexagonColor(x, y, animatedHexagons);
            } else {
                drawHexagon(x, y, "rgb(13, 51, 85)", borderColor);
                //placedHexagons.push({x: x,y: y},{neighbours: findNeighbors(x,y)},{isAnimated: false});
            }

            if (shouldAnimate) {
                animatedHexagons.push({x: x, y: y});
            }
        }
    }
}

window.addEventListener("resize", function () {
    placeHexagonsAfterwards();
    drawNavbar(whiteHexagonX, whiteHexagonY);
});

placeHexagonsOnStart();
drawNavbar(whiteHexagonX, whiteHexagonY);

var animationSpeed = 2000; // Ändern Sie die Geschwindigkeit der Randfarbänderung hier (in Millisekunden)

function animateHexagonColor(x, y, animatedHexagons) {
    var currentTime = new Date().getTime();
    var color = "rgb(" + Math.sin(currentTime / animationSpeed) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 2) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 4) * 128 + 128 + ")";

    requestAnimationFrame(function () {
        drawHexagon(x, y, "rgb(13, 51, 85)", color); // Zeichnen Sie das Hexagon mit aktualisierter Randfarbe
        changeColors(x, y, 2);
    });

    setTimeout(function () {
        // Finden Sie die Nachbarn und filtern Sie die, die nicht bereits animiert sind
        var neighbors = findNeighbors(x, y).filter(function (neighbor) {
            return !animatedHexagons.some(function (animatedHexagon) {
                return animatedHexagon.x === neighbor.x && animatedHexagon.y === neighbor.y;
            });
        });

        // Wählen Sie einen zufälligen Nachbarn aus, um ihn zu animieren
        if (neighbors.length > 0) {
            var randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
            animateHexagonColor(randomNeighbor.x, randomNeighbor.y, animatedHexagons);
            animatedHexagons.push(randomNeighbor); // Markieren Sie den ausgewählten Nachbarn als animiert
        }
    }, 5000);
}

function changeColors(x,y,opacity){
    var currentTime = new Date().getTime();

    var color = "rgba(" + Math.sin(currentTime / animationSpeed) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 2) * 128 + 128 +
        ", " + Math.sin(currentTime / animationSpeed + 4) * 128 + 128 + ", " + opacity + ")";

    requestAnimationFrame(function () {
        drawHexagon(x, y, "rgb(13, 51, 85)", color); // Zeichnen Sie das Hexagon mit aktualisierter Randfarbe
        if (opacity > 0.2){
            changeColors(x, y, opacity - 0.006);
        }else{
            changeColorBlack(x,y,opacity)
        }
    });
}

function changeColorBlack(x,y,opacity){

    var FADE_DURATION = 2.0 * 1000; // 2 seconds
    var startTime = -1.0;
    var opacity = 0; // Initial opacity

    // Function to render the current frame
    function render(currTime) {
        if (startTime < 0) {
            startTime = currTime;
        }

        // Calculate the time that animation has been running (in ms)
        var timeRunning = currTime - startTime;

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

// Funktion zum Finden der benachbarten Hexagons
function findNeighbors(x, y) {
    var neighbors = [];

    var dx = hexagonWidth * 1.0; // Anpassen Sie diesen Wert, um den horizontalen Abstand zu ändern
    var dy = hexagonHeight * 0.75; // Anpassen Sie diesen Wert, um den vertikalen Abstand zu ändern

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

// ... (Ihr bestehender Code)

// Funktion zum Zeichnen eines weißen Hexagons
function drawWhiteHexagon(x, y, borderSides) {
    var radius = 30; // Radius des Hexagons
    context.beginPath();

    // Berechnung der sechs Eckpunkte des Hexagons
    for (var i = 0; i < 6; i++) {
        var angle = (i * 60 + 30) * Math.PI / 180;
        var xPos = x + radius * Math.cos(angle);
        var yPos = y + radius * Math.sin(angle);

        context.strokeStyle = "rgb(0, 51, 102)";
        context.lineWidth = 2;
        context.stroke();

        context.lineJoin = "round";

        drawHexagon(x,y,"rgb(0, 51, 102)");

// Zeichnen der Ränder basierend auf den borderSides
        if (borderSides.left) {
            context.lineJoin = "round";
            context.beginPath();
            context.lineWidth = 4;
            context.lineHeight += 2;
            context.lineJoin = 'round';
            context.strokeStyle = "blue";
            context.moveTo(x - 26, y + 16);
            context.lineTo(x - 26, y - 16);
            context.stroke();
        }

        if (borderSides.right) {
            context.beginPath();
            context.moveTo(x + 26, y - 16);
            context.lineTo(x + 26, y + 16);
            context.lineWidth = 4;
            context.lineHeight += 2;
            context.lineJoin = 'round';
            context.strokeStyle = "blue";
            context.stroke();
        }

        if (borderSides.topLeft) {
            context.lineJoin = "round";
            context.beginPath();
            context.lineHeight = 200;
            context.lineWidth = 4;
            context.lineJoin = 'round';
            context.strokeStyle = "blue";
            context.moveTo(x, y - radius);
            context.lineTo(x - radius * 0.87, y - radius / 2);
            context.stroke();
        }

        if (borderSides.topRight) {
            context.lineJoin = "round";
            context.beginPath();
            context.moveTo(x, y - radius);
            context.lineTo(x + radius * 0.87, y - radius / 2);
            context.lineWidth = 4;
            context.lineHeight += 2;
            context.lineJoin = 'round';
            context.strokeStyle = "blue";
            context.stroke();
        }

        if (borderSides.bottomLeft) {
            context.beginPath();
            context.moveTo(x, y + radius);
            context.lineTo(x - radius * 0.87, y + radius / 2);
            context.lineWidth = 4;
            context.lineHeight += 2;
            context.lineJoin = 'round';
            context.strokeStyle = "blue";
            context.stroke();
        }

        if (borderSides.bottomRight) {
            context.beginPath();
            context.moveTo(x, y + radius);
            context.lineTo(x + radius * 0.87, y + radius / 2);
            context.lineWidth = 4;
            context.lineHeight += 2;
            context.lineJoin = 'round';
            context.strokeStyle = "blue";
            context.stroke();
        }
    }

    context.closePath();

}



// Position und Größe des weißen Hexagons in der linken oberen Ecke
var whiteHexagonX = 130; // Anpassen Sie die X-Koordinate nach Bedarf
var whiteHexagonY = 135; // Anpassen Sie die Y-Koordinate nach Bedarf
function drawNavbar(startX, startY) {

    var rangeNavBar = 6;

    // Draws Horizontal Hexagons
    for (var a = 0; a < 6; a++) {
        if (a == 0){ // Erstes Hexagon

            var borderSides = { left: true, right: false, bottomLeft: true, bottomRight: false, topLeft: true, topRight: false };
            drawWhiteHexagon(startX,startY, borderSides);
            startX += 52;

        }else if (a == 5){ // Letztes Hexagon

            var borderSides = { left: false, right: true, bottomLeft: false, bottomRight: true, topLeft: false, topRight: true };
            drawWhiteHexagon(startX,startY, borderSides);
            startX += 52;

        }else{
            // Hexagons in der Mitte
            var borderSides = { left: false, right: false, bottomLeft: false, bottomRight: false, false: false, topRight: false };
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        }
    }

    //Untere Reihe
    startX = whiteHexagonX;
    startY += 45;
    startX += 25;
    for (var i = 0; i < rangeNavBar - 1; i++) {

        if (i == 0){ // Erstes Hexagon

            var borderSides = { left: true, right: false, bottomLeft: true, bottomRight: true, topLeft: false, topRight: false };
            drawWhiteHexagon(startX,startY, borderSides);
            startX += 52;

        }else if (i == 4){ // Letztes Hexagon

            var borderSides = { left: false, right: true, bottomLeft: true, bottomRight: true, topLeft: false, topRight: false };
            drawWhiteHexagon(startX,startY, borderSides);
            startX += 52;

        }else{
            // Hexagons in der Mitte
            var borderSides = { left: false, right: false, bottomLeft: true, bottomRight: true, topLeft: false, topRight: false };
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        }

    }

    //Obere Reihe
    startX = whiteHexagonX;
    startY -= 90;
    startX += 25;
    for (var i = 0; i < rangeNavBar - 1; i++) {

        if (i === 0){ // Erstes Hexagon

            var borderSides = { left: true, right: false, bottomLeft: false, bottomRight: false, topLeft: true, topRight: true };
            drawWhiteHexagon(startX,startY, borderSides);
            startX += 52;

        }else if (i === 4){ // Letztes Hexagon

            var borderSides = { left: false, right: true, bottomLeft: false, bottomRight: false, topLeft: true, topRight: true };
            drawWhiteHexagon(startX,startY, borderSides);
            startX += 52;

        }else{
            // Hexagons in der Mitte
            var borderSides = { left: false, right: false, bottomLeft: false, bottomRight: false, topLeft: true, topRight: true };
            drawWhiteHexagon(startX, startY, borderSides);
            startX += 52;

        }

    }

}

drawNavbar(whiteHexagonX, whiteHexagonY);


