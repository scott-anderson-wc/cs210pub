/* This file adds the "scrambling" behavior to the basic interaction,
 thereby making it a real game. It works by re-defining the functions to
 move tiles so that the functions can be chained together, including the
 animations. The chaining together is both a cool visual effect and
 ensures that the solution state is reachable from the starting state.
*/

/* global $, tileArray, blankTileRow, blankTileCol, getRightTile,
   getLeftTile, getAboveTile, getBelowTile global duration, updateData,
   movePicture, */

// This function can replace the original one, adding the 'after' arg
// animate the selected tile in the direction specified by input
function movePicture(direction, tile, after) {
    if( tile == null) return;
    if( after == null ) after = function () {};
	var id = "#" + tile;
    var $elt = $(id);
	console.log("movePicture id " + id + " to direction: " + direction);
	
    var tileLeft = parseInt($elt.css("left"),10);
    var tileTop = parseInt($elt.css("top"),10);

    function done() { console.log("now at ",$elt.css("left")," and ",$elt.css("top")); }
	if(direction === "left") {
		$elt.animate({ left: tileLeft - 200 }, duration, after);
	}else if(direction === "right") {
		$elt.animate({ left: tileLeft + 200	}, duration, after);
	}else if(direction === "up") {
		$elt.animate({ top: tileTop - 200 }, duration, after);
	}else if(direction == "down") {
		$elt.animate({ top: tileTop + 200 }, duration, after);
	} else {
	    console.log("no such direction: "+direction);
	}
	
	updateData(direction, tile);
}

// replaces one of the same name in other file
function doMove(direction, after) {
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

// This function replaces one of the same name, adding the 'after' arg
function doMove(direction, after) {
    if(direction == "left") {
        movePicture("left",getRightTile(), after);
    } else if( direction == "right") {
        movePicture("right",getLeftTile(), after);
    } else if( direction == "up") {
        movePicture("up",getBelowTile(), after);
    } else if( direction == "down") {
        movePicture("down",getAboveTile(), after);
    } else {
        console.log("no such direction: "+direction);
    }
}

// This will be used to get a random move for scrambling

function randomElt(array) {
    if( array.length == 0) {
        throw new Error('array has no elements');
    }
    return array[Math.floor(array.length*Math.random())];
}

// Determine the set of moves possible in the current state

function possibleMoves() {
    var moves = [];
    if( blankTileRow != 0) moves.push("down");
    if( blankTileRow != 2) moves.push("up");
    if( blankTileCol != 0) moves.push("right");
    if( blankTileCol != 2) moves.push("left");
    return moves;
}

// This keeps track of the previous move, so that we don't just undo it in
// the scrambling.
var prevMove;

// Improved function to determine the set of moves possible in the current
// state and not undoing the previous move.

function possibleMovesNew() {
    var moves = [];
    if( blankTileRow != 0 && prevMove != "up") moves.push("down");
    if( blankTileRow != 2 && prevMove != "down" ) moves.push("up");
    if( blankTileCol != 0 && prevMove != "left") moves.push("right");
    if( blankTileCol != 2 && prevMove != "right") moves.push("left");
    window.moves = moves;
    return moves;
}

// Return a random move that is possible in the current state

function randomMove() {
    var m = randomElt(possibleMovesNew());
    prevMove = m;
    return m;
}

// This executes the given number of random moves to scramble the board.

function scrambleBoard(numMoves) {
    var m = randomMove();
    console.log('random move '+m);
    doMove(m,function () { if(numMoves>1) scrambleBoard(numMoves-1); });
}

// For testing the scrambling, I wanted to be able to set up a fixed list
// of moves.

function doMoveList(moves) {
    doMove(moves[0], function () { moves.shift(); doMoveList(moves); });
}

// A fixed list of moves for testing scrambling.

var rrl = ["right","right","left"];

// Add the behavior to the scrambling button

$("#scrambleButton").click(function() { scrambleBoard(30); });
