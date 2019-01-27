/* global $, localStorage */
/* global twenty, tree, ensureTree, currentTreeNode, nextQuestionDOM */

// ================================================================
// Tree surgery

/* This function replaces an arbitrary tree node (current), whose parent
is (parent) with a new node using the old node and a new question and an
answer. The question must be of the form where the current node is the
"Yes" value and the new answer is the "NO" value.  */

function addToTree(parent, current, userquestion, userans) {
    var newnode = {Q: userquestion, Y: userans, N: current};
    // replace the guess in the parent node
    if( current == parent.Y ) {
        parent.Y = newnode;
    } else if (current == parent.N) {
        parent.N = newnode;
    } else {
        throw new Error("this shouldn't happen");
    }
}

// ================================================================

// Fix the other gameplay functions to keep track of parentTreeNode as
// well as currentTreeNode. These two function definitions replace the
// ones from the static version.

function answerYes() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append(nextQuestionDOM(currentTreeNode.Y));
    parentTreeNode = currentTreeNode;       // new line
    currentTreeNode = currentTreeNode.Y;
}

function answerNo() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append(nextQuestionDOM(currentTreeNode.N));
    parentTreeNode = currentTreeNode;       // new line
    currentTreeNode = currentTreeNode.N;
}

// ================================================================
// Handle an incorrect guess entirely differently. This function 
// is also copied from the static version.

function incorrectGuess() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append(requestQuestion(currentTreeNode));
}

// When we guess wrong, we ask the user for the correct answer so that we
// can update the tree.

function requestQuestion(guess) {
    if( typeof guess != "string") {
        throw new TypeError("guess is not a string: %o",guess);
    }
    var elt = $('#lossTemplate > li.loss').bounds(1,1).clone();
    elt.find('.myguess').text(guess);
    return elt;
}

// ================================================================

/* This function handles the event where we have filled out the form with
 * a new question and a new "NO" value. It assumes that currentTreeNode
 * and parentTreeNode are both correct: the currentTreeNode is a *leaf*
 * and the parentTreeNode is the one that we need to modify to insert a
 * node. */

var parentTreeNode;

function addToTreeEvent() {
    addToTree(parentTreeNode, 
              currentTreeNode, 
              $('#newQ').bounds(1,1).val(),
              $("#questions .yourans").bounds(1,1).val());
    $('#questions .loss').remove();
    $("<li>").text('Thanks!').appendTo("#questions");
}

$('#questions').on('click','[data-ans=add]', addToTreeEvent);

// ================================================================
// Saving to and getting from local storage    

twenty.treekey = '20questiontree';

function getTree() {
    var str = localStorage.getItem(twenty.treekey);
    if( str ) {
        tree = JSON.parse(str);
    } else {
        alert("There is no saved tree; load one from the server");
    }
}

function saveTree() {
    if(!ensureTree()) {
        alert("There is no tree to save");
        return;
    }
    localStorage.setItem(twenty.treekey, JSON.stringify(tree));
}

// ================================================================
// Add the handlers

$('#getTree').on('click', getTree);
$('#saveTree').on('click', saveTree); 

