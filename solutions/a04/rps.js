// Task 1: judge the outcome of a RPS battle.

// Here's the first way I thought of

function rpsJudge(player1choice, player2choice) {
    var a = player1choice;
    var b = player2choice;
    var outcome;
    if( a == b ) {
        outcome = 0;
    } else if ( a == "rock" ) {
        if( b == "paper") {
            outcome = 1;
        } else {
            outcome = -1;
        }
    } else if ( a == "paper" ) {
        if( b == "scissors") {
            outcome = 1;
        } else {
            outcome = -1;
        }
    } else if ( a == "scissors" ) {
        if( b == "rock" ) {
            outcome = 1;
        } else {
            outcome = -1;
        }
    }
    return outcome;
}

// Here's a more succinct way

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


// ================================================================

function randomElt(array) {
    var index = Math.floor(Math.random()*array.length);
    return array[index];
}

// ================================================================
// Task 2, highlight player choice; separately testable

/* global $ */

function highlightPlayerChoice(choice) {
    $("#player-throws-"+choice).css("border-color","blue");
}

// ================================================================
// Task 3, animate computer choice; separately testable

function showComputerChoice(choice) {
    var url = "images/"+choice+"-200.png";
    $("#computerThrow").attr("src",url);
}

// ================================================================
// Task 4, reset game; separately testable

var outcomes = [0, 0, 0];

function resetRPS() {
    $("#player img").css("border-color","white"); // set them all
    $("#outcome").html("");
}

function startOver() {
    outcomes = [0,0,0];
    updateScores();
}

$("#startOver").click(startOver);

// ================================================================
// Task 5, play game given human player's choice; separately testable
// this does all the work for all the event handlers.

function updateScores() {
    $("#num_wins").text(outcomes[0]);
    $("#num_ties").text(outcomes[1]);
    $("#num_losses").text(outcomes[2]);
}
updateScores();

function playerTurn(choice) {
    resetRPS();
    highlightPlayerChoice(choice);
    var computerChoice = randomElt(["rock", "paper", "scissors"]);
    showComputerChoice(computerChoice);
    var result = rpsJudge(choice, computerChoice)+1;
    var messages = ["Player wins!", "Tie", "Computer wins!" ];
    outcomes[result]++;
    updateScores();
    var message = messages[result];
    $("#outcome").html(message);
}

// ================================================================
// Task 6, add the event handlers

function addEventHandlers() {
   $("#player img").each( function (index, elt) {
       var choice = $(elt).attr("data-choice");
       $(elt).click(function () { playerTurn(choice); });
   });
}

addEventHandlers();
