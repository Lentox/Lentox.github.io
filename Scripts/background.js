let canvas = document.getElementById("hexagonCanvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Globale Variablen
let hexagone = [];
let hexagonSize = 40;
let maxDrawnHexagons = 10;

// Objekte
class hexagon {
    constructor(x, y, row, col, fillColor, borderColor) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.fillColor = fillColor;
        this.borderColor = borderColor;

    }

    drawHexagon(xOffset, yOffset, size){

        let centerX = (canvas.width / 2 + xOffset);
        let centerY = (canvas.height / 2 + yOffset);

        context.beginPath();
        context.moveTo(centerX + size * Math.cos(0), centerY + size * Math.sin(0));

        for (let i = 1; i <= 6; i++) {
            context.lineTo(centerX + size * Math.cos(i * 2 * Math.PI / 6), centerY + size * Math.sin(i * 2 * Math.PI / 6));
        }

        context.fillText("Row: "+ this.row + ", Col: " + this.col, centerX, centerY);

        context.closePath();
        context.lineWidth = 2;
        context.strokeStyle = "blue";
        context.stroke();

        //Hexagon zum Array hinzufügen
        hexagone.push(this);
    }
}

function drawBackground(hexagoneSize, maxDrawnHexagons){
    let xOffset = 0;
    let yOffset = 0;
    let col0Hexagons = new hexagon(1,1,0,0,"red", "blue");

    for (let i = 0; i < maxDrawnHexagons; i++){

        if (yOffset - hexagonSize * Math.sin(Math.PI / 3) > canvas.height) {
            break; // Wenn das Hexagon den Rand des Canvas berührt, die Schleife beenden
        }

        col0Hexagons.drawHexagon(xOffset, yOffset, hexagonSize);
        col0Hexagons.col += 1;
        yOffset -= 70;
    }

    yOffset = 70;
    col0Hexagons.col = -1;

    for (let i = 0; i < maxDrawnHexagons; i++){

        if (yOffset + hexagonSize * Math.sin(Math.PI / 3) > canvas.height) {
            break; // Wenn das Hexagon den Rand des Canvas berührt, die Schleife beenden
        }

        col0Hexagons.drawHexagon(xOffset, yOffset, hexagonSize);
        col0Hexagons.col -= 1;
        yOffset += 70;
    }
}

window.addEventListener('resize', function(event) {
    drawBackground(hexagonSize, maxDrawnHexagons);
}, true);

drawBackground(hexagonSize, maxDrawnHexagons);