// JavaScript for game representation and tile movement

// Null marks the blank.
var tileArray = [["a", "b", "c"], 
                 ["d", "e", "f"], 
                 ["g", "h", null]];

var blankTileRow = 2;
var blankTileCol = 2;

// returns element above the blank; returns null if no such tile.
function getAboveTile(){
    if(blankTileRow == 0)
        return null;
    else
        return tileArray[blankTileRow - 1][blankTileCol];
}

function getBelowTile(){
    if(blankTileRow == 2)
        return null;
    else
        return tileArray[blankTileRow + 1][blankTileCol];
}

function getRightTile(){
    if(blankTileCol == 2)
        return null;
    else
        return tileArray[blankTileRow][blankTileCol + 1];
}

function getLeftTile(){
    if(blankTileCol == 0)
        return null;
    else
        return tileArray[blankTileRow][blankTileCol - 1];
}

// updates global variables tileArray, blankTileRow, blankTileCol
// direction is a string: "right" "left" etc.
// tile is the id of an img, like "a", "b" etc.
function updateData(direction, tile) {

    // generic function to update the represention. 
    // one of the args will be zero; the other will be +/- 1
    // they represent the location of the moving tile relative to the blank

    function update(rowDiff, colDiff) {
        // move the tile
        tileArray[blankTileRow][blankTileCol] = tile;
        // set the location of the blank
        tileArray[blankTileRow + rowDiff][blankTileCol + colDiff] = null;
        blankTileRow += rowDiff;
        blankTileCol += colDiff;
    }

    if (direction === "left") {
        update(0,+1);
    } else if (direction === "right") {
        update(0,-1);
    } else if (direction === "up") {
        update(+1,0);
    } else if (direction == "down") {
        update(-1,0);
    } else {
        console.log("no such direction:"+direction);
    }
    console.log("blankTileRow: " + blankTileRow + "\n" +
                "blankTileCol: " + blankTileCol);
}

/* global $ */

var duration = 500;  // half a second to slide a tile

//animate the selected tile in the direction specified by input
// direction and tile args are as for updateData
function movePicture(direction, tile) {
    if( tile == null) return;
    console.log("movePicture " + tile + " to direction: " + direction);
    var selector = "#" + tile;
    var $elt = $(selector);
    var tileLeft = parseInt($elt.css("left"),10);
    var tileTop = parseInt($elt.css("top"),10);

    if(direction === "left") {
        $elt.animate({ left: tileLeft - 200 }, duration);
    } else if(direction === "right") {
        $elt.animate({ left: tileLeft + 200 }, duration);
    } else if(direction === "up") {
        $elt.animate({ top: tileTop - 200 }, duration);
    } else if(direction == "down") {
        $elt.animate({ top: tileTop + 200 }, duration);
    } else {
        console.log("no such direction: "+direction);
    }
    updateData(direction, tile);
}

// does everything for a move. Direction is like "right" "up" etc.
function doMove(direction) {
    if(direction == "left") {
        movePicture("left",getRightTile());
    } else if( direction == "right") {
        movePicture("right",getLeftTile());
    } else if( direction == "up") {
        movePicture("up",getBelowTile());
    } else if( direction == "down") {
        movePicture("down",getAboveTile());
    } else {
        console.log("no such direction: "+direction);
    }
}

document.addEventListener('keypress',function (eventObj) {
    
    var a_key = 97; //left
    var s_key = 115; //down
    var d_key = 100; //right
    var w_key = 119; //up
    
    if( eventObj.keyCode === a_key ) {
        console.log("a key pressed");
        doMove("left");
    } else if(eventObj.keyCode === d_key ) {
        doMove("right");
    } else if(eventObj.keyCode === w_key ) {
        console.log("w key pressed");
        doMove("up");
    } else if(eventObj.keyCode === s_key ) {
        console.log("s key pressed");
        doMove("down");
    } else {
        //do nothing
    }
    
});

// You weren't asked to do this, but it's easy enough
$("#right").click(function () { doMove("right"); });
$("#left").click(function () { doMove("left"); });
$("#up").click(function () { doMove("up"); });
$("#down").click(function () { doMove("down"); });
