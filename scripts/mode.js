// mode.js
function modeSlider(){
    const positions = [
        { sourceRow: 13, sourceCol: 14, targetRow: 9, targetCol: 10}
    ];

    positions.forEach(position => {
        const sourceHexagon = findHexagonByPosition(hexagoneArray, position.sourceRow, position.sourceCol);
        const targetHexagon = findHexagonByPosition(hexagoneArray, position.targetRow, position.targetCol);

        if (sourceHexagon && isHexagonVisible(sourceHexagon)) {
            drawModeHexagon(sourceHexagon);
            modeHexagonPosition.row = position.sourceRow;
            modeHexagonPosition.col = position.sourceCol;

        } else if (targetHexagon && isHexagonVisible(targetHexagon)) {
            drawModeHexagon(targetHexagon);
            modeHexagonPosition.row = position.targetRow;
            modeHexagonPosition.col = position.targetCol;
        }
    });
}

function drawModeHexagon(hexagonToBeDrawn){
    if (darkmode){
        hexagonToBeDrawn.fillColor = hexagonFillColorDark;
        hexagonToBeDrawn.drawHexagon();

        const image = new Image();
        image.src = iconsDarkModeArray[0]; // Geben Sie den Pfad zu Ihrem Bild an.

        // 3. Stellen Sie sicher, dass das Bild geladen ist, bevor Sie es auf die Canvas zeichnen.
        image.onload = function() {
            // 4. Zeichnen Sie das Bild auf die Canvas.
            context.drawImage(image, hexagonToBeDrawn.x - 20, hexagonToBeDrawn.y - 20, 40, 40); // (Bild, x-Koordinate, y-Koordinate)
        };
    }else{
        hexagonToBeDrawn.fillColor = hexagonFillColorLight;
        hexagonToBeDrawn.drawHexagon();

        const image = new Image();
        image.src = iconsDarkModeArray[1]; // Geben Sie den Pfad zu Ihrem Bild an.

        // 3. Stellen Sie sicher, dass das Bild geladen ist, bevor Sie es auf die Canvas zeichnen.
        image.onload = function() {
            // 4. Zeichnen Sie das Bild auf die Canvas.
            context.drawImage(image, hexagonToBeDrawn.x - 20, hexagonToBeDrawn.y - 20, 40, 40); // (Bild, x-Koordinate, y-Koordinate)
        };
    }
}