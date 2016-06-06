// create the art canvas and show the brush in the center with a random color
displayBoard(0);
// current coordinates of the brush
var brush_row = 4;
var brush_col = 4;

// colors of the old and new cells
var oldC = 'blue';
var newC = 'blue';
try {
    var oldC = randomColor();
    var newC = randomColor();
    changeColor(brush_row, brush_col, oldC);
}
catch (err) {
    // ignore error
}

// when the user clicks on the left, right, up or down button, move the brush
// in the requested direction and display a square of random color
displayArrows("newC = randomColor(); "
              +"brush_row = moveUp(brush_row,brush_col,oldC,newC); "
              +"oldC = newC;",
              
              "newC = randomColor(); "
              +"brush_col = moveLeft(brush_row,brush_col,oldC,newC); "
              +"oldC = newC;",
              
              "newC = randomColor(); "
              +"brush_col = moveRight(brush_row,brush_col,oldC,newC); "
              +"oldC = newC;",
              
              "newC = randomColor(); "
              +"brush_row = moveDown(brush_row,brush_col,oldC,newC); "
              +"oldC = newC;");
