// hexagons.js
let centerX;
let centerY;

let count;
class Hexagon {
    constructor(x, y, row, col, fillColor, borderColor) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
    }

    drawHexagon() {
        centerX = this.x;
        centerY = this.y;

        context.beginPath();
        context.moveTo(centerX + size * Math.cos(0), centerY + size * Math.sin(0));

        for (let i = 1; i <= 6; i++) {
            context.lineTo(centerX + size * Math.cos(i * 2 * Math.PI / 6), centerY + size * Math.sin(i * 2 * Math.PI / 6));
        }

        context.closePath();
        context.lineWidth = 2;
        context.fillStyle = this.fillColor;
        context.strokeStyle = this.borderColor;
        context.fill();
        context.stroke();

    }

    drawClock(value) {
        centerX = this.x;
        centerY = this.y;

        context.beginPath();
        context.moveTo(centerX + size * Math.cos(0), centerY + size * Math.sin(0));

        for (let i = 1; i <= 6; i++) {
            context.lineTo(centerX + size * Math.cos(i * 2 * Math.PI / 6), centerY + size * Math.sin(i * 2 * Math.PI / 6));
        }

        const textMetrics = context.measureText(value);
        const textWidth = textMetrics.width;

        if (darkmode) {
            context.closePath();
            context.lineWidth = 5;
            context.strokeStyle = hexagonFillColorDark;
            context.fillStyle = hexagonFillColorLight;
            context.fill();
            context.stroke();

            // Text innerhalb des Hexagons
            context.fillStyle = hexagonFillColorDark;
        } else {
            context.closePath();
            context.lineWidth = 5;
            context.strokeStyle = hexagonFillColorLight;
            context.fillStyle = hexagonFillColorDark;
            context.fill();
            context.stroke();

            // Text innerhalb des Hexagons
            context.fillStyle = hexagonFillColorLight;
        }

        context.font = "30px 'Ubuntu', sans-serif";
        context.fillText(value, centerX - (textWidth / 2), centerY + 10);
    }

    drawHoursHexagon() {
        this.drawClock.call(this, clock.hours);
    }

    drawMinutesHexagon() {
        this.drawClock.call(this, clock.minutes);
    }

    drawSecondsHexagon() {
        this.drawClock.call(this, clock.seconds);
    }

}

function drawNavFields() {
    const positions = [
        { sourceRow: -6, sourceCol: -1, targetRow: -4, targetCol: -1 },
        { sourceRow: -5, sourceCol: 1, targetRow: -3, targetCol: 1 },
        { sourceRow: -7, sourceCol: -3, targetRow: -5, targetCol: -3 },
        { sourceRow: -4, sourceCol: 3, targetRow: -2, targetCol: 3 }
    ];
    count = 0;
    positions.forEach(position => {
        const sourceHexagon = findHexagonByPosition(hexagoneArray, position.sourceRow, position.sourceCol);
        const targetHexagon = findHexagonByPosition(hexagoneArray, position.targetRow, position.targetCol);

        if (sourceHexagon && isHexagonVisible(sourceHexagon)) {
            if (!darkmode){
                sourceHexagon.fillColor = hexagonFillColorLight;
                sourceHexagon.borderColor = hexagonFillColorDark;
                sourceHexagon.drawHexagon();

                const image = new Image();
                image.src = iconsNavArrayDark[count]; // Geben Sie den Pfad zu Ihrem Bild an.

                // 3. Stellen Sie sicher, dass das Bild geladen ist, bevor Sie es auf die Canvas zeichnen.
                image.onload = function() {
                    // 4. Zeichnen Sie das Bild auf die Canvas.
                    context.drawImage(image, sourceHexagon.x - 20, sourceHexagon.y - 20, 40, 40); // (Bild, x-Koordinate, y-Koordinate)
                };
            }else{
                sourceHexagon.fillColor = hexagonFillColorDark;
                sourceHexagon.borderColor = hexagonBorderColorDark;
                sourceHexagon.drawHexagon();

                const image = new Image();
                image.src = iconsNavArrayLight[count]; // Geben Sie den Pfad zu Ihrem Bild an.

                // 3. Stellen Sie sicher, dass das Bild geladen ist, bevor Sie es auf die Canvas zeichnen.
                image.onload = function() {
                    // 4. Zeichnen Sie das Bild auf die Canvas.
                    context.drawImage(image, sourceHexagon.x - 20, sourceHexagon.y - 20, 40, 40); // (Bild, x-Koordinate, y-Koordinate)
                };
            }

        } else if (targetHexagon && isHexagonVisible(targetHexagon)) {
            targetHexagon.fillColor = "rgb(194, 194, 163)";
            targetHexagon.drawHexagon();
        }
        count++;
    });
}

function drawSocialMediaFields() {
    const positions = [
        { sourceRow: 6, sourceCol: 0, targetRow: 4, targetCol: 0 },
        { sourceRow: 5, sourceCol: -2, targetRow: 3, targetCol: -2 },
        { sourceRow: 7, sourceCol: 2, targetRow: 5, targetCol: 2 }
    ];
    count = 0;
    positions.forEach(position => {
        const sourceHexagon = findHexagonByPosition(hexagoneArray, position.sourceRow, position.sourceCol);
        const targetHexagon = findHexagonByPosition(hexagoneArray, position.targetRow, position.targetCol);

        if (!darkmode){
            sourceHexagon.fillColor = hexagonFillColorLight;
            sourceHexagon.borderColor = hexagonBorderColorLight;
            sourceHexagon.drawHexagon();

            const image = new Image();
            image.src = iconsMediaArrayDark[count]; // Geben Sie den Pfad zu Ihrem Bild an.

            // 3. Stellen Sie sicher, dass das Bild geladen ist, bevor Sie es auf die Canvas zeichnen.
            image.onload = function() {
                // 4. Zeichnen Sie das Bild auf die Canvas.
                context.drawImage(image, sourceHexagon.x - 20, sourceHexagon.y - 20, 40, 40); // (Bild, x-Koordinate, y-Koordinate)
            };
        }else{
            sourceHexagon.fillColor = hexagonFillColorDark;
            sourceHexagon.borderColor = hexagonBorderColorDark;
            sourceHexagon.drawHexagon();

            const image = new Image();
            image.src = iconsMediaArrayLight[count]; // Geben Sie den Pfad zu Ihrem Bild an.

            // 3. Stellen Sie sicher, dass das Bild geladen ist, bevor Sie es auf die Canvas zeichnen.
            image.onload = function() {
                // 4. Zeichnen Sie das Bild auf die Canvas.
                context.drawImage(image, sourceHexagon.x - 20, sourceHexagon.y - 20, 40, 40); // (Bild, x-Koordinate, y-Koordinate)
            };
        }
        count++;
    });
}

function drawHexagons() {

    let hexagonRadius = 40;
    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    let fillColor;
    let borderColor;
    let textColor = "white";

    if (darkmode){
        fillColor = hexagonFillColorLight;
        borderColor = hexagonBorderColorLight;
    }else{
        fillColor = hexagonFillColorDark;
        borderColor = hexagonBorderColorDark;
    }

    let numRows = Math.floor((canvas.height - hexagonRadius) / (hexagonRadius * 1.5));
    let numCols = Math.floor((canvas.width - hexagonRadius) / (hexagonRadius * 1.5));

    // Anpassung des Versatzes in Y-Richtung, um Hexagone sowohl unter als auch über dem mittleren Hexagon zu zeichnen
    let yOffset = hexagonRadius * 1.75;
    // Anpassung des Versatzes in X-Richtung, um Hexagone sowohl rechts als auch links neben dem mittleren Hexagon zu zeichnen
    let xOffset = hexagonRadius * 1.5;

    // Anpassung des Y-Offsets für die Reihen links und rechts daneben
    let yRowOffset = hexagonRadius * 0.85;

    // Wählen Sie die Verschiebungsrichtung (1 für nach unten, -1 für nach oben)
    let direction = 1;

    // Löschen, der bestehenden Hexagon Elemente
    hexagoneArray = [];

    for (let col = -numCols; col <= numCols; col++) {
        for (let row = 0; row <= numRows; row++) {
            let yAbove = centerY - row * yOffset - direction * col * yRowOffset; // Y-Position des Hexagons über dem mittleren
            let yBelow = centerY + row * yOffset - direction * col * yRowOffset; // Y-Position des Hexagons unter dem mittleren

            let x = centerX + col * xOffset; // Hier verwenden wir den Spaltenindex für die Verschiebung

            let hexAbove = new Hexagon(x, yAbove, -row, col, fillColor, borderColor, textColor);
            hexAbove.drawHexagon();

            let hexBelow = new Hexagon(x, yBelow, row, col, fillColor, borderColor, textColor);
            hexBelow.drawHexagon();

            hexagoneArray.push(hexAbove);
            hexagoneArray.push(hexBelow);
        }
    }
}

function findHexagonByPosition(hexagoneArray, row, col) {
    return hexagoneArray.find(hexagon => hexagon.row === row && hexagon.col === col);
}

function isHexagonVisible(hexagon) {
    // Überprüfen, ob das Hexagon innerhalb der sichtbaren Canvas-Fläche ist
    return (
        hexagon.x + size >= 0 &&
        hexagon.x - size <= canvas.width &&
        hexagon.y + size >= 0 &&
        hexagon.y - size <= canvas.height
    );
}