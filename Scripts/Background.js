const canvas = document.getElementById("hexagonCanvas");
const context = canvas.getContext("2d");

// Properties
const hexagonRadius = 30;
const hexagonWidth = Math.sqrt(3) * hexagonRadius;
const hexagonHeight = 2 * hexagonRadius;
const hexagonVerticalSpacing = hexagonHeight * 0.75;
const hexagonHorizontalSpacing = hexagonWidth;

const borderColor = "black";
const fillColor = "rgb(13, 51, 85)";

let hexagoneArray = [];

const navBarSize = 7;

const animationSpeed = 2000; // Ändern der Geschwindigkeit der Randfarbänderung hier (in Millisekunden)

// Klassen
class Hexagon {
    constructor(x, y, row, col, radius, fillColor, borderColor, isStatic, hasAnimation, neighbours) {
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.isStatic = isStatic;
        this.hasAnimation = hasAnimation;
        this.radius = radius;
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.neighbours = neighbours;
        this.borderSegments = [];
    }
    draw(){
        context.beginPath();
        for (let i = 0; i < 7; i++) {
            const angle = (i * 60 + 30) * Math.PI / 180;
            const xPos = this.x + this.radius * Math.cos(angle);
            const yPos = this.y + this.radius * Math.sin(angle);
            if (i === 0) {
                context.moveTo(xPos, yPos);
            } else {
                context.lineTo(xPos, yPos);
            }
            this.borderSegments.push({xPos: xPos, yPos: yPos});
        }

        // Fülle das Hexagon mit der gewünschten Farbe
        context.fillStyle = this.fillColor;
        context.fill();

        // Zeichne den Hexagon-Rand in der angegebenen Farbe
        context.strokeStyle = this.borderColor;
        context.lineWidth = 2;
        context.stroke();

        context.closePath();
    }
    animateHexagonBorder() {

        const currentTime = new Date().getTime();
        const color = "rgb(" + Math.sin(currentTime / animationSpeed) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 2) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 4) * 128 + 128 + ")";

        requestAnimationFrame(() => {
            this.borderColor = color;
            this.draw();
            this.changeColors(2);
        });

        const self = this;

        setTimeout(function () {

            // Sammelt Nachbarn die weder animiert noch Static sind
            const checkedNeighbours = checkNeighbours(self);
            if (checkedNeighbours.length > 0) {
                let randomNeighbor = checkedNeighbours[Math.floor(Math.random() * (checkedNeighbours.length - 0) + 0)];
                for (let i = 0; i < hexagoneArray.length; i++){
                    if (hexagoneArray[i].col === randomNeighbor.col && hexagoneArray[i].row == randomNeighbor.row){
                        hexagoneArray[i].animateHexagonBorder();
                        hexagoneArray[i].hasAnimation = true; // Ausgewählten nachbarn als animiert markieren
                    }
                }
            }
        }, 5000);
    }
    changeColors(opacity) {
        const currentTime = new Date().getTime();
        const color = "rgba(" + Math.sin(currentTime / animationSpeed) * 128 + 128 + ", " + Math.sin(currentTime / animationSpeed + 2) * 128 + 128 +
            ", " + Math.sin(currentTime / animationSpeed + 4) * 128 + 128 + ", " + opacity + ")";

        requestAnimationFrame(() => {
            this.borderColor = color;
            this.draw();
            if (opacity > 0.2) {
                this.changeColors(opacity - 0.006);
            } else {
                this.endAnimation();
            }
        });
    }
    endAnimation(callback) {

        const fadeDuration = 2.0 * 1000; // 2 seconds
        let startTime = -1.0;
        let opacity = 0; // Initial opacity

        // Function to render the current frame
        // Referenz auf das aktuelle Objekt
        const self = this;

        // Function to render the current frame
        function render(currTime) {
            if (startTime < 0) {
                startTime = currTime;
            }

            // Calculate the time that animation has been running (in ms)
            const timeRunning = currTime - startTime;

            // Calculate opacity based on time
            if (timeRunning < fadeDuration) {
                opacity = timeRunning / fadeDuration;
            } else {
                opacity = 1;
            }

            // Draw the hexagon with the updated border color
            self.borderColor = "rgba(0, 0, 0, " + opacity + ")";
            self.draw();

            if (opacity < 0.8) {
                // Continue animating
                requestAnimationFrame(render);
            } else {
                // Animation abgeschlossen
                if (typeof callback === "function") {
                    callback();
                }
            }
        }

        // Start the animation
        requestAnimationFrame(render);

    }
}

// Sammelt Nachbarn die keine Animation und nicht Static sind
function checkNeighbours(hexagon) {
    const checkedNeighbours = [];
    for (let i = 0; i < hexagon.neighbours.length; i++) {
        const neighbour = hexagon.neighbours[i];
        for (let j = 0; j < hexagoneArray.length; j++) {
            const hex = hexagoneArray[j];
            if (neighbour.row === hex.row && neighbour.col === hex.col) {
                if (!hex.isStatic && !hex.hasAnimation) {
                    checkedNeighbours.push(hex);
                }
            }
        }
    }
    return checkedNeighbours;
}

// Wird beim Laden der Website abgerufen
function onStart(){
    drawBackground();
}

// Zeichnet denn Background auf die Canvas
function drawBackground(){

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let numRows = Math.ceil(canvasHeight / hexagonVerticalSpacing);
    let numCols = Math.ceil(canvasWidth / hexagonHorizontalSpacing);

    // Erhöhe Anzahl Hexagone, um Rand zu vermeiden
    numRows += 2;
    numCols += 2;

    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {

            let x = Math.floor(col * hexagonHorizontalSpacing + (row % 2) * (hexagonWidth / 2));
            const y = Math.floor(row * hexagonVerticalSpacing);

            // Überprüfen Sie, ob in der Nähe animierte Hexagons vorhanden sind
            let hasNearbyAnimation = false;
            for (let i = 0; i < hexagoneArray.length; i++) {
                for (let j = 0; j < hexagoneArray[i].neighbours.length; j++) {
                    if (hexagoneArray[i].neighbours) {
                        if (hexagoneArray[i].neighbours[j].hasAnimation) {
                            hasNearbyAnimation = true;
                            break;
                        }
                    }
                }
            }
            // Hinzufügen der restlichen Static Felder

            let isStaticHexagon = false;


            // Zufällig auswählen, welches Hexagon den Farbwechseleffekt haben soll, wenn keine Animation in der Nähe ist
            let shouldAnimate= Math.random() < 0.1;//0.02; // 2 % der Fläsche bzw. Hexagons animieren

            if(row === 20 && col === 18 || row === 20 && col === 20 || row === 20 && col === 16){
                // codePen Icon
                if(row === 20 && col === 18){

                    var pattern1,pattern2;

                    var img1=new Image();
                    img1.src="/Users/t.esser/Lentox.github.io/Images/github.png";
                    img1.onload = function() {
                        // Erstelle ein Muster (Pattern) aus dem Bild
                        pattern1 = context.createPattern(img1, 'repeat'); // Du kannst 'repeat' durch 'no-repeat' oder andere Werte ersetzen, um das Verhalten des Musters anzupassen

                    }
                    
                    shouldAnimate = false;

                    const hexagon = new Hexagon(x, y, row, col, hexagonRadius, pattern1, borderColor, true, false);

                    hexagon.draw();
                    hexagoneArray.push(hexagon);
                }else if(row === 20 && col === 20){
                    shouldAnimate = false;
                    const hexagon = new Hexagon(x, y, row, col, hexagonRadius,"blue", borderColor, true, false);

                    hexagon.draw();
                    hexagoneArray.push(hexagon);
                }else{
                    shouldAnimate = false;
                    const hexagon = new Hexagon(x, y, row, col, hexagonRadius,"#527fa6", borderColor, true, false);

                    hexagon.draw();
                    hexagoneArray.push(hexagon);
                }

            }else if (shouldAnimate && !hasNearbyAnimation  && !isStaticHexagon) {

                const hexagon = new Hexagon(x, y, row, col, hexagonRadius, fillColor, borderColor, false, true);

                hexagon.animateHexagonBorder();
                hexagoneArray.push(hexagon);

            }else if(isStaticHexagon){

                shouldAnimate = false;

                const hexagon = new Hexagon(x, y, row, col, hexagonRadius, fillColor, borderColor, isStaticHexagon, false);

                hexagon.draw();
                hexagoneArray.push(hexagon);

            }else{
                shouldAnimate = false;

                const hexagon = new Hexagon(x, y, row, col, hexagonRadius, fillColor, borderColor, isStaticHexagon, false);

                hexagon.draw();
                hexagoneArray.push(hexagon);
            }
            setHexagonNeighbours();
        }
    }
}

// Nachbarn aller Hexagone festlegen
function setHexagonNeighbours(){
    for (let i = 0; i < hexagoneArray.length; i++){
        hexagoneArray[i].neighbours = findNeighbours(hexagoneArray[i].row, hexagoneArray[i].col);
    }
}

// Nachbarn des Hexagons auslesen
function findNeighbours(row, col){
    let neighbours = [];
    neighbours.push({position: "topRight", row: row + 1, col: col})
    neighbours.push({position: "topLeft", row: row - 1, col: col})
    neighbours.push({position: "bottomRight", row: row + 1, col: col + 1})
    neighbours.push({position: "bottomLeft", row: row + 1, col: col})
    neighbours.push({position: "left", row: row, col: col - 1})
    neighbours.push({position: "right", row: row, col: col + 1})
    return neighbours;
}

// Wird beim Resize vom Window aufgerufen
window.addEventListener("resize", function () {
    drawBackground();
});

onStart();
