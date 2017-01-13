// create the playing board and set the target object and user at
// fixed initial positions, displayed with random colors
displayBoard(1);

// row and column of the chased object
var rObj = 2;
var cObj = 2;

// row and column of the player

var TheRow = 7;
var TheCol = 7;

// key colors: background, player and obj.  Note that these are computed
// once when the page loads and don't change during the game.
var backColor = 'blue';

var playColor = 'blue';
var objColor = 'blue';
var numTries = 0;

try {
    while (playColor == objColor && numTries < 10 ) {
        randomColor();
        var playColor = Color;
        randomColor();
        var objColor = Color;
        numTries++;
    }
    if( playColor == objColor ) {
        alert("Couldn't find two different random colors");
    }

    // Set the color of the chasee and the chaser
    changeColor(rObj,cObj,objColor);
    changeColor(TheRow,TheCol,playColor);
}
catch (err) {
}


// moves the target object one step in a random direction, and determines
// whether the target has been "caught"
function moveObj () {
    changeColor(rObj,cObj,backColor);
    var whichWay = randomInt(4);
    if (whichWay == 0) {
        rObj = (rObj+1)%10;
    } else if (whichWay == 1) {
        rObj = (rObj+9)%10;
    } else if (whichWay == 2) {
        cObj = (cObj+1)%10;
    } else {
        cObj = (cObj+9)%10;
    }
    changeColor(rObj,cObj,objColor);
    if ((rObj == TheRow) && (cObj == TheCol)) {
        alert("gotcha!");
    }
}

// when the user clicks on the up, down, left and right buttons, move the
// user on the grid as requested, and make a random move with the target
// object
displayArrows(
              function () { moveUp(backColor,playColor); moveObj(); },
              function () { moveLeft(backColor,playColor); moveObj(); },
              function () { moveRight(backColor,playColor); moveObj(); },
              function () { moveDown(backColor,playColor); moveObj(); }
              );
