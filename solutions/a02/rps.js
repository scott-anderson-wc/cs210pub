/* Functions for playing Rock-Paper-Scissors (RPS) */

/* function to determine the outcome of an RPS encounter. Returns -1 if
 * the first arg beats the second, 0 if it's a tie, and 1 if the second
 * arg beats the first. (This function can be used as a comparison
 * function to the JavaScript .sort() method, but, of course, these moves
 * can't be sorted!)  Checks that the args are correct. */

function compare(player1,player2) {
    var p1 = player1.toLowerCase();
    var p2 = player2.toLowerCase();
    var moves = ["rock", "paper", "scissors"];
    if( moves.indexOf(p1) == -1 ) {
        console.log("p1 is not the correct type: %o",p1);
    }
    if( moves.indexOf(p2) == -1 ) {
        console.log("p2 is not the correct type: %o",p2);
    }
    if( p1 == p2 ) {
        return 0;
    } else if ( p1 == "rock" && p2 == "scissors" ||
                p1 == "scissors" && p2 == "paper" ||
                p1 == "paper" && p2 == "rock" ) {
        return -1;
    } else {
        return 1;
    }
}

function test_compare() {
    var moves = ["rock", "paper", "scissors"];
    for( var i in moves ) {
        for( var j in moves ) {
            var p1 = moves[i];
            var p2 = moves[j];
            var result = compare(p1,p2);
            console.log("for "+p1+' and '+p2+' compare returns '+result);
        }
    }
}

test_compare();

/* this function yields an interesting result. Each neighboring pair of
 * array items are in sorted order, but the overall list appears to be in
 * a random order. */

function test_sort() {
    var many_moves = ["rock", "paper", "scissors",
                      "rock", "paper", "scissors",
                      "rock", "paper", "scissors"];
    many_moves.sort(compare);
    console.log(JSON.stringify(many_moves));
    many_moves.sort();
    console.log(JSON.stringify(many_moves));
}

test_sort();
