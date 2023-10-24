// mode.js
function modeSlider(){
    const positions = [
        { sourceRow: 13, sourceCol: 14, targetRow: 9, targetCol: 10}
    ];

    positions.forEach(position => {
        const sourceHexagon = findHexagonByPosition(hexagoneArray, position.sourceRow, position.sourceCol);
        const targetHexagon = findHexagonByPosition(hexagoneArray, position.targetRow, position.targetCol);

        if (sourceHexagon && isHexagonVisible(sourceHexagon)) {
            sourceHexagon.fillColor = "rgb(194, 194, 163)";
            sourceHexagon.drawModeHexagon(0, 0, 40);
        } else if (targetHexagon && isHexagonVisible(targetHexagon)) {
            targetHexagon.fillColor = "rgb(194, 194, 163)";
            targetHexagon.drawModeHexagon(0, 0, 40);
        }
    });
}