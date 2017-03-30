/* 
   Functions for the CS110 assignment on the game of Concentration
   Written by the CS110 staff, Fall 2012

   2013-11-15, Scott, Added "grading" feature that skips shuffling the
   board.

   2013-11-15, Scott, Added feature where they can use their own 8
   pictures, supplying an array to getImage().  */

// For the game of Concentration described in the CS110 assignment, 
// there are 8 pairs of images "hidden" in a 4x4 grid. The global 
// variable "board" is used to store a random arrangement of 16 
// integers (one pair of each of the integers from 1 to 8) for a
// new game. The shuffleImages() function creates this arrangement

// To make grading easier, if the URL ends in "grading", the board is not
// shuffled, so cell 1 matches cell 9, cell 2 matches cell 10, and cell i
// matches cell i+8.

var board;

function shuffleImages () {
    board = new Array(16);
    // store two copies of each integer from 1 to 8
    for (var i = 0; i <= 15; i++){
        board[i] = i % 8 + 1;
    }
    if( ! /grading$/.test(window.location.href) ) {
        // randomize the order of the integers in the array
        for (var i = 15; i >= 0; --i){
            var randPos = Math.floor(i * Math.random());
            var tmpStore = board[i];
            board[i] = board[randPos];
            board[randPos] = tmpStore;
        }
    }
}

// getImage() has one input, the location of the cell that the user 
// selected (an integer from 1 to 16), and returns the filename (an
// absolute URL) for the image associated with this cell - it assumes 
// that the images are stored in the following directory:
// http://cs.wellesley.edu/~cs110/assignments/assignment6F12/images/
// and have filenames "im1.jpg" ... "im8.jpg"

// 

function getImage (id) {
    var cell = parseInt(id);
    var filename = "images/im" + board[cell-1] + ".jpg";
    return filename;
}

