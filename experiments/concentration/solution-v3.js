// By Ellen Hildreth, Scott D. Anderson and the CS110 staff

// Updated Fall 2016 by Scott D. Anderson

// This version uses jQuery. It also doesn't use alert, to avoid the
// problem where the page isn't updated to show the second image.  It
// does, however, use setTimeout to have images disappear after 1 second.

// global variables: number of tries and matches are 0 initially,
// click = 1 to indicate the first element in a pair of clicks will
// start the game, firstelt is defined so that it can be used to save
// the id of the first element clicked in a pair of clicks

var tries = 0;
var matches = 0;
var click = 1;
var firstelt;
 
//reinitialize the page when a new game is started
function newGame() {
    click = 1;
    tries = 0;
    matches = 0;
    updateStatus();
    shuffleImages();
    $("#board img").attr("src","blank.jpg");  // replace all pics with blank
}
  
//show the image specified by the parameter elementid by changing the src to
//one of the images
function showImage(elementid) {
    $('#' + elementid).attr("src",getImage(elementid));
} 
 
//hide the image specified by the parameter elementid by changing the src to
//a blank image
function hideImage(elementid) {
    $('#' + elementid).attr("src","blank.jpg");
} 
 
// The event handler that does all the work

function processClick(id) {
    console.log("Processing for elt "+id);
    // Optional:  if the image is already showing, do nothing.
    var img = $("#"+id);
    if ($(img).attr("src") != "blank.jpg") {
        console.log("click on revealed image is ignored");
    }
    
    // else if this is the first cell clicked in a pair of clicks, show the
    //image, set the firstelt variable, and set click to 2 to indicate a
    //first element has been clicked
    else if (click == 1) { 
        showImage(id);
        firstelt = id;
        click = 2;
    }
    
    //else if this is the second element clicked in a pair of clicks,
    //increment number of tries, show the element, and check for a match 
    else  {
        tries = tries + 1;
        showImage(id);
        
        //if they don't match, announce, hide the images, and reset click
        //variable to 1 for the next turn
        if ( getImage(id) != getImage(firstelt) ) {
            $("#msg").text("No match!");
            setTimeout(
                function () {
                    $("#msg").text("");
                    hideImage(id);  
                    hideImage(firstelt);
                }, 
                1000);
        } 
        
        //else if they do match, announce, reset click variable to 1 for
        //the next turn, increment number of matches, and announce if game
        //over
        else {
            $("#msg").text("Match!");
            setTimeout(function () { $("#msg").text(""); }, 1000);
            matches = matches + 1;
            if (matches == 8) {
                $("#msg").text("Game over!");
            }
        }
     
    // Next click is a first click
    click = 1;
    //update game display (number of tries and matches) 
    updateStatus();
    }
}
 
 //update the document display of the number of tries and matches

function updateStatus() {
    $("#tries").text(tries);
    $("#matches").text(matches);
}
 
// When the initial page is loaded, shuffle the images to randomly
// assign them to the elements in the grid.  

shuffleImages();

// Set up two event handlers.

var id;                         // just for debugging

$("#board img").click( function (evt) { 
    var elementid = $(evt.target).attr('id');
    if( ! elementid ) {
        throw "no id for element "+evt.target.outerHTML;
    }
    id = elementid;
    console.log("Click on element id "+elementid);
    processClick(elementid);
});

$("#startNewGameButton").click(newGame);
