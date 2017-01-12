// By Ellen Hildreth, Scott D. Anderson and the CS110 staff

// Rewritten Fall 2016 for the Name Game by Scott D. Anderson

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
    var objs = shuffleArray(classList);
    for( i in objs ) {
        var obj = objs[i];
        var acct = obj.acct;
        $("<img>")
            .attr("src","cs307f16/"+acct+".jpg")
            .attr("data-info",obj)
            .appendTo("#pics");
    }
    var objs = shuffleArray(classList);
    for( i in objs ) {
        var obj = objs[i];
        var name = obj.name;
        $("<p>")
            .text(name)
            .attr("data-info",obj)
            .appendTo("names");
    }
}
  
// The event handler that does all the work

function processClick(domElt) {
    console.log("Processing for elt "+domElt);
    // else if this is the first cell clicked in a pair of clicks, show the
    //image, set the firstelt variable, and set click to 2 to indicate a
    //first element has been clicked
    if (click == 1) { 
        firstelt = domElt;
        click = 2;
    }
    
    //else if this is the second element clicked in a pair of clicks,
    //increment number of tries, show the element, and check for a match 
    else  {
        tries = tries + 1;
        
        //if they don't match, announce, hide the images, and reset click
        //variable to 1 for the next turn
        if ( $(domElt).attr("data-info") != $(firstelt).attr("data-info") ) {
            $("#msg").text("No match!");
            setTimeout(
                function () {
                    $("#msg").text("");
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
 
// Set up two event handlers.

$("#board").click( function (evt) { 
    var elt = $(evt.target).closest("[data-info=*]")
    if( ! elt ) {
        throw "couldn't find element with data-info as ancestor of "
            + evt.target.outerHTML;
    }
    console.log("Click on element "+elt);
    processClick(elt);
});

$("#startNewGameButton").click(newGame);

// ================================================================

var classList;
var resp_text;
var resp_json;

function ajaxFail(xhr, ajaxOptions, thrownError) { 
    console.log("respText: "+xhr.responseText);
    console.log("fail: "+thrownError); 
}

function loadClassList() {
    $.getJSON("cs307f16/cs307-fa16.json",
              function (data) { 
                  var discard = data.pop();
                  console.log("discarding "+discard);
                  classList = data; 
                  newGame(); }).fail(ajaxFail);
    return;
    $.get("cs307f16/cs307-fa16.json",
          function (resp) {
              console.log("got "+resp);
              resp_text = resp;
              resp_json = JSON.parse(resp_text);
              var data = resp_json;
              var discard = data.pop();
              console.log("discarding "+discard);
              classList = data; 
              newGame(); },
          "text").fail(ajaxFail);
    
}

loadClassList();

