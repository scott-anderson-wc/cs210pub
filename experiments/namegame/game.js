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

function shuffleArray (list) {
    shuffled = list.slice();  // shallow copy of array
    if( /grading$/.test(window.location.href) ) {
        console.log("Not shuffling during debugging");
        return shuffled;
    } else {
        // randomize the order of the integers in the array
        // this steps backward through the array, with i having a value
        // one more than the last element of the array.
        for (var last = list.length-1; last >= 0; --last ){
            var randPos = Math.floor(last * Math.random());
            var tmpStore = shuffled[last];
            shuffled[last] = shuffled[randPos];
            shuffled[randPos] = tmpStore;
        }
    }
    return shuffled;
}


