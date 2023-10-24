// hexagons.js
class Hexagon {
    constructor(x, y, row, col, fillColor, borderColor) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
    }

    drawHexagon(xOffset, yOffset, size) {
        let centerX = this.x + xOffset;
        let centerY = this.y + yOffset;

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

    drawHexagonClock(xOffset, yOffset, size, value) {
        let centerX = this.x + xOffset;
        let centerY = this.y + yOffset;

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
            context.strokeStyle = "rgb(38, 38, 38)";
            context.fillStyle = "rgb(194, 194, 163)";
            context.fill();
            context.stroke();

            // Text innerhalb des Hexagons
            context.fillStyle = "rgb(38, 38, 38)";
        } else {
            context.closePath();
            context.lineWidth = 5;
            context.strokeStyle = "rgb(194, 194, 163)";
            context.fillStyle = "rgb(38, 38, 38)";
            context.fill();
            context.stroke();

            // Text innerhalb des Hexagons
            context.fillStyle = "rgb(194, 194, 163)";
        }

        context.font = "30px 'Ubuntu', sans-serif";
        context.fillText(value, centerX - textWidth / 2, centerY + 10);
    }

    drawHoursHexagon(xOffset, yOffset, size) {
        this.drawHexagonClock.call(this, xOffset, yOffset, size, clock.hours);
    }

    drawMinutesHexagon(xOffset, yOffset, size) {
        this.drawHexagonClock.call(this, xOffset, yOffset, size, clock.minutes);
    }

    drawSecondsHexagon(xOffset, yOffset, size) {
        this.drawHexagonClock.call(this, xOffset, yOffset, size, clock.seconds);
    }


    drawModeHexagon(xOffset, yOffset, size) {
        let centerX = this.x + xOffset;
        let centerY = this.y + yOffset;

        context.beginPath();
        context.moveTo(centerX + size * Math.cos(0), centerY + size * Math.sin(0));

        for (let i = 1; i <= 6; i++) {
            context.lineTo(centerX + size * Math.cos(i * 2 * Math.PI / 6), centerY + size * Math.sin(i * 2 * Math.PI / 6));
        }

        if (darkmode){
            context.closePath();
            context.lineWidth = 2;
            context.fillStyle = hexagonFillColorDark;
            context.strokeStyle = this.borderColor;
            context.fill();
            context.stroke();

            // Text innerhalb des Hexagons
            context.fillStyle = hexagonFillColorLight;
            context.font = "40px 'Ubuntu', sans-serif";
            context.fillText("☯", centerX - 17, centerY + 15);
        }else{
            context.closePath();
            context.lineWidth = 2;
            context.fillStyle = this.fillColor;
            context.strokeStyle = this.borderColor;
            context.fill();
            context.stroke();

            // Text innerhalb des Hexagons
            context.fillStyle = "rgb(38, 38, 38)";
            context.font = "40px 'Ubuntu', sans-serif";
            context.fillText("☯", centerX - 17, centerY + 15);
        }

    }

    drawNavHexagon(xOffset, yOffset, size) {
        let centerX = this.x + xOffset;
        let centerY = this.y + yOffset;

        context.beginPath();
        context.moveTo(centerX + size * Math.cos(0), centerY + size * Math.sin(0));

        for (let i = 1; i <= 6; i++) {
            context.lineTo(centerX + size * Math.cos(i * 2 * Math.PI / 6), centerY + size * Math.sin(i * 2 * Math.PI / 6));
        }
        if (darkmode){
            context.closePath();
            context.lineWidth = 5;
            context.fillStyle = hexagonFillColorDark;
            context.strokeStyle = this.borderColor;
            context.fill();
            context.stroke();

            // Text innerhalb des Hexagons
            context.fillStyle = hexagonFillColorLight;
            context.font = "50px 'Ubuntu', sans-serif";
            context.fillText(iconsNavArray[counter], centerX - 15, centerY + 15);
        }else{
            context.closePath();
            context.lineWidth = 5;
            context.fillStyle = this.fillColor;
            context.strokeStyle = this.borderColor;
            context.fill();
            context.stroke();

            // Text innerhalb des Hexagons
            context.fillStyle = hexagonFillColorDark;
            context.font = "50px 'Ubuntu', sans-serif";
            context.fillText(iconsNavArray[counter], centerX - 15, centerY + 15);
        }
        counter++;

    }

}

function drawNavFields() {
    const positions = [
        { sourceRow: -6, sourceCol: -1, targetRow: -4, targetCol: -1 },
        { sourceRow: -5, sourceCol: 1, targetRow: -3, targetCol: 1 },
        { sourceRow: -7, sourceCol: -3, targetRow: -5, targetCol: -3 },
        { sourceRow: -4, sourceCol: 3, targetRow: -2, targetCol: 3 }
    ];

    positions.forEach(position => {
        const sourceHexagon = findHexagonByPosition(hexagoneArray, position.sourceRow, position.sourceCol);
        const targetHexagon = findHexagonByPosition(hexagoneArray, position.targetRow, position.targetCol);

        if (sourceHexagon && isHexagonVisible(sourceHexagon)) {
            if (!darkmode){
                sourceHexagon.fillColor = hexagonFillColorLight;
                sourceHexagon.borderColor = hexagonFillColorDark;
                sourceHexagon.drawNavHexagon(0, 0, 40);
            }else{
                sourceHexagon.fillColor = hexagonFillColorDark;
                sourceHexagon.borderColor = hexagonBorderColorDark;
                sourceHexagon.drawNavHexagon(0, 0, 40);
            }

        } else if (targetHexagon && isHexagonVisible(targetHexagon)) {
            targetHexagon.fillColor = "rgb(194, 194, 163)";
            targetHexagon.drawNavHexagon(0, 0, 40);
        }
    });
}

function drawSocialMediaFields() {
    const positions = [
        { sourceRow: 6, sourceCol: 0, targetRow: 4, targetCol: 0 },
        { sourceRow: 5, sourceCol: -2, targetRow: 3, targetCol: -2 },
        { sourceRow: 7, sourceCol: 2, targetRow: 5, targetCol: 2 }
    ];

    positions.forEach(position => {
        const sourceHexagon = findHexagonByPosition(hexagoneArray, position.sourceRow, position.sourceCol);
        const targetHexagon = findHexagonByPosition(hexagoneArray, position.targetRow, position.targetCol);

        if (!darkmode){
            sourceHexagon.fillColor = hexagonFillColorLight;
            sourceHexagon.borderColor = hexagonBorderColorLight;
            sourceHexagon.drawHexagon(0, 0, 40);
        }else{
            sourceHexagon.fillColor = hexagonFillColorDark;
            sourceHexagon.borderColor = hexagonBorderColorDark;
            sourceHexagon.drawHexagon(0, 0, 40);
        }
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

    // Löschen der bestehenden Hexagon Elemente
    hexagoneArray = [];

    for (let col = -numCols; col <= numCols; col++) {
        for (let row = 0; row <= numRows; row++) {
            let yAbove = centerY - row * yOffset - direction * col * yRowOffset; // Y-Position des Hexagons über dem mittleren
            let yBelow = centerY + row * yOffset - direction * col * yRowOffset; // Y-Position des Hexagons unter dem mittleren

            let x = centerX + col * xOffset; // Hier verwenden wir den Spaltenindex für die Verschiebung

            let hexAbove = new Hexagon(x, yAbove, -row, col, fillColor, borderColor, textColor);
            hexAbove.drawHexagon(0, 0, hexagonRadius);

            let hexBelow = new Hexagon(x, yBelow, row, col, fillColor, borderColor, textColor);
            hexBelow.drawHexagon(0, 0, hexagonRadius);

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
        hexagon.x + 40 >= 0 &&
        hexagon.x - 40 <= canvas.width &&
        hexagon.y + 40 >= 0 &&
        hexagon.y - 40 <= canvas.height
    );
}