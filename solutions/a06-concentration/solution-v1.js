//global variables: number of tries and matches are 0 initially, click = 1 to
//indicate the first element in a pair of clicks will start the game,
//firstelt is defined so that it can be used to save the id of the first
//element clicked in a pair of clicks

var tries = 0;
var matches = 0;
var click = 1;
var firstelt;
 
//reinitialize the page when a new game is started
function newGame() {
    tries = 0;
    matches = 0;
    click = 1;
    shuffleImages();
    $(".cell").attr("src","blank.jpg");
    updateStatus();
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
 
//play the game when an element is clicked
function processClick(elementid) {
    //if the image  is already showing, do nothing
    if ($("#"+elementid).attr("src") != "blank.jpg") {
	//ignore the click
    }
    
    // else if this is the first cell clicked in a pair of clicks, show the
    //image, set the firstelt variable, and set click to 2 to indicate a
    //first element has been clicked
    else if (click == 1) { 
	showImage(elementid);
	firstelt = elementid;
	click = 2;
    }
    
    //else if this is the second element clicked in a pair of clicks,
    //increment number of tries, show the element, and check for a match 
    else  {
        tries = tries + 1;
        showImage(elementid);
        
        //if they don't match, alert, hide the images, and reset click
        //variable to 1 for the next turn
        if ($("#" +elementid).attr("src") != $("#" +firstelt).attr("src")) {
	    alert("No match!");
	    hideImage(elementid);
	    hideImage(firstelt);
	    click = 1;
        } 
        
        //else if they do match, alert, reset click variable to 1 for the
        //next turn, increment number of matches, and alert if game over
        else {
            alert("Match!");
            click = 1;
            matches = matches + 1;
            if (matches == 8) {
		alert("Game over!");
            }
        }
     
	//update game status (number of tries and matches) after a second
	//click
	updateStatus();
    }
}
 
 //update the number of tries and matches
function updateStatus() {
    $("#tries").text(tries);
    $("#matches").text(matches);
}
 
 //create the initial grid using cloning
function cloneCells() {
    for (i = 2; i <= 16; i++) {
	var clonecell = $("#1").clone();
	$(clonecell).attr("id",i.toString());
	$("#game").append(clonecell);
    }
}

//when the initial page is loaded, clone the first image to create the grid,
//and shuffle the images to randomly assign them to the elements in the grid.
//When a cell is clicked, process the click to play the game.  When the reset
//is clicked, start a new game.

$(document).ready(function() {
	cloneCells();
	shuffleImages();
	$(".cell").click(function() {
		processClick($(this).attr("id"));
	    });
	$("#newGameButton").click(newGame);
    }); 
