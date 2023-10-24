// mode.js
function modeSlider(){
    const positions = [
        { sourceRow: 13, sourceCol: 14, targetRow: 9, targetCol: 10}
    ];

    positions.forEach(position => {
        const sourceHexagon = findHexagonByPosition(hexagoneArray, position.sourceRow, position.sourceCol);
        const targetHexagon = findHexagonByPosition(hexagoneArray, position.targetRow, position.targetCol);

        if (sourceHexagon && isHexagonVisible(sourceHexagon)) {
            if (darkmode){
                sourceHexagon.fillColor = "rgb(38, 38, 38)";
                sourceHexagon.drawHexagon(0, 0, 40);

                const image = new Image();
                image.src = iconsDarkModeArray[0]; // Geben Sie den Pfad zu Ihrem Bild an.

                // 3. Stellen Sie sicher, dass das Bild geladen ist, bevor Sie es auf die Canvas zeichnen.
                image.onload = function() {
                    // 4. Zeichnen Sie das Bild auf die Canvas.
                    context.drawImage(image, sourceHexagon.x - 20, sourceHexagon.y - 20, 40, 40); // (Bild, x-Koordinate, y-Koordinate)
                };
            }else{
                sourceHexagon.fillColor = "rgb(194, 194, 163)";
                sourceHexagon.drawHexagon(0, 0, 40);

                const image = new Image();
                image.src = iconsDarkModeArray[1]; // Geben Sie den Pfad zu Ihrem Bild an.

                // 3. Stellen Sie sicher, dass das Bild geladen ist, bevor Sie es auf die Canvas zeichnen.
                image.onload = function() {
                    // 4. Zeichnen Sie das Bild auf die Canvas.
                    context.drawImage(image, sourceHexagon.x - 20, sourceHexagon.y - 20, 40, 40); // (Bild, x-Koordinate, y-Koordinate)
                };
            }

        } else if (targetHexagon && isHexagonVisible(targetHexagon)) {
            targetHexagon.fillColor = "rgb(194, 194, 163)";
            targetHexagon.drawHexagon(0, 0, 40);
        }
    });
}