// Here's one way

function rpsJudge(player1choice, player2choice) {
    var a = player1choice;
    var b = player2choice;
    var outcome;
    if( a == b ) {
        outcome = 0;
    } else if ( a == "rock" && b == "paper" ||
                a == "paper" && b == "scissors" ||
                a == "scissors" && b == "rock" ) {
        outcome = 1;
    } else {
        outcome = -1;
    }
    return outcome;
}

// Here's a way that Dana suggested. Bravo to her!

function rpsJudge(player1choice, player2choice) {
    var table = {'rock':     {'rock': 0,  'paper':  1, 'scissors': -1},
                 'paper':    {'rock': -1, 'paper':  0, 'scissors': 1},
                 'scissors': {'rock': 1,  'paper': -1, 'scissors': 0}};
    return table[player1choice][player2choice];
}

// =============================================================================

function randomElt(array) {
    var index = Math.floor(Math.random()*array.length);
    return array[index];
}

// =============================================================================
// New for RPS
// =============================================================================

/* global $ */

// =============================================================================
// highlight player choice; separately testable
// Note that because every image already has (in CSS) a white border, all we 
// have to do is change the color. This avoids any re-display glitches


function highlightPlayerChoice(choice) {
    $("#player-throws-"+choice).css("border-color","blue");
}

// =============================================================================
// show computer choice; separately testable
// Note that the filenames of the pictures need to follow a pattern

function showComputerChoice(choice) {
    var url = "images/"+choice+"-200.png";
    $("#computerThrow").attr("src",url);
}

// =============================================================================
// Reset game; separately testable

// Note that it's fine to have three globals for wins, ties and losses.
// Indeed, that's what I expect. But this is useful using a trick
// that I will show below.

var outcomes = [0, 0, 0];

function resetRPS() {
    $("#player img").css("border-color","white"); // set them all
    $("#outcome").html("");
}

function startOver() {
    outcomes = [0,0,0];
    updateScores();
}

// Add the function as a click handler.

$("#startOver").click(startOver);

// =============================================================================
// Update the scores

function updateScores() {
    $("#num_wins").text(outcomes[0]);
    $("#num_ties").text(outcomes[1]);
    $("#num_losses").text(outcomes[2]);
}

// We do this when the page loads so that the user sees zeroes

updateScores();

// =============================================================================
// Play game given human player's choice; separately testable
// this does all the work for all the event handlers.

// Note that the trick is that the return values from rpsJudge are -1,0,1. If I
// add 1 to that value, I get 0,1,2 for win, tie, and loss, respectively.  I
// can then use that as an array index for the counters and the messages.  If
// you didn't think of this, that's fine. Sorting it out with "if" statements
// is certainly okay.

function playerTurn(choice) {
    resetRPS();
    highlightPlayerChoice(choice);
    var computerChoice = randomElt(["rock", "paper", "scissors"]);
    showComputerChoice(computerChoice);
    var result = rpsJudge(choice, computerChoice)+1;
    outcomes[result]++;
    updateScores();
    var messages = ["Player wins!", "Tie", "Computer wins!" ];
    var message = messages[result];
    $("#outcome").html(message);
}

// =============================================================================
// Finally, add the event handlers

// Here's the code I expected you to write for RPS:

$("#player-throws-rock").click(function () { playerTurn("rock"); });
$("#player-throws-paper").click(function () { playerTurn("paper"); });
$("#player-throws-scissors").click(function () { playerTurn("scissors"); });

// Here's a fancier way, more similar to the book:

// Note that this code is very similar to how click handlers were added to
// thumbnails in Ottergram, except that this code uses jQuery, which provides
// some nice shortcuts. The inner anonymous function is still a closure over
// the variable 'choice', which in this case has a value that is a string,
// rather than being a DOM element. Instead, we get the string out of the DOM
// element before the closure is created. 

/*

function addEventHandlers() {
   $("#player img").each( function (index, elt) {
       var choice = $(elt).attr("data-choice");
       $(elt).click(function () { playerTurn(choice); });
   });
}

addEventHandlers();
*/

