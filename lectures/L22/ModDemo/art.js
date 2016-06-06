// create the art canvas and show the brush in the center with a random color
displayBoard(0);

// current coordinates of the brush
var TheRow = 4;
var TheCol = 4;

// initialize color of first cell
var oldC = 'blue';
var Color = 'blue';
try {
    randomColor();
    changeColor(TheRow,TheCol,Color);
    var oldC = Color;
}
catch (err) {
    // ignore error
}

// when the user clicks on the left, right, up or down button, move the brush
// in the requested direction and display a square of random color
displayArrows( function () { randomColor(); moveUp(oldC,Color); oldC = Color; },
               function () { randomColor(); moveLeft(oldC,Color); oldC = Color; },
               function () { randomColor(); moveRight(oldC,Color); oldC = Color; },
               function () { randomColor(); moveDown(oldC,Color); oldC = Color; }
               );
