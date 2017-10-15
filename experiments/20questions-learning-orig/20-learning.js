var twenty = {};
twenty.url = 'tree2.text';       // the url for the default tree

// ================================================================
/* Tree representation

 * The tree will be represented using JS object literals, but not objects
 * in the OOP sense. I considered using OOP, but using plain JS makes it
 * easier to get and save the tree from local storage in JSON, as well as
 * loading a default tree from a server.
 * 
 * Each internal node will be like this
 *  {Q: "a yes/no question", Y: child, N: child}
 * a child is either another node or a string. If it's a string, it's a guess, 
 * like "breadbox"
 * 
 * The tree can be modified when a guess is wrong.
 * 
 */

var tree = null;                // the tree of question nodes

function ensureTree() {
    if( ! tree ) {
        alert("There is no tree; maybe load a default one from the server?");
        return false;
    } else {
        return true;
    }
}

/* The tree from the server is stored in a special format, like this:

Q: is the subject real? (not imaginary)
    YQ: is the subject a US President?
        YG: Abraham Lincoln
        NQ: is the subject a revolutionary war figure?
            YG: Alexander Hamilton
            NG: Martin Luther King, Jr
    NQ: is the subject a Star Wars Character?
        YG: Darth Vader
        NQ: is the subject a character from Lord of the Rings?
            YG: Frodo Baggins
            NG: Captain Kirk

The first thing on the line indicates the type of node and which child it is. 
Q is the first question
YQ is a followup question if the previous answer was "yes"
NQ is a followup question if the previous answer was "no"
YG is a guess if the previous answer was "yes"
NG is a guess if the previous answer was "no"

The following function parses that format and builds and returns a tree. 

*/

function parseTree(text) {
    text = text.trim();
    var lines = text.split("\n");

    // recursive function to read a subtree from the array of lines,
    // returning the subtree
    function readNode() {
        if( lines.length == 0 ) {
            throw new Error("out of lines");
        }
        var line = lines.shift();
        var parts = line.trim().split(":");
        var nodeType = parts[0];
        // console.log('nodetype: ',nodeType);
        if( ['Q', 'YQ', 'NQ' ].indexOf(nodeType) != -1 ) {
            // two children
            var ychild = readNode();
            var nchild = readNode();
            var node = {Q: parts[1], Y: ychild, N: nchild};
            return node;
        } else if ( ['YG', 'NG'].indexOf(nodeType) != -1 ) {
            // leaf
            console.log('Found leaf: ',line);
            return parts[1];
        } else {
            throw new Error('Wrong node type: '+nodeType);
        }
    }

    // set our global to the value of the outermost recursive call
    tree = readNode();
};

// Read a tree from a file on the server, parse it, and set the global.

function readTreeFromServer() {
    $.get(twenty.url, parseTree);
}

// ================================================================
// Showing the tree. Useful for debugging and such.  The technique here is
// not to use cloning, but just to generate nested DIV elements, each with
// some padding-left that will then have them properly indented by depth.
// The entire tree is generated off-stage and then added to the page at
// the end.

function showTree(selector) {
    // Recursive function to show a subtree (a node and all its children)
    function showNode(node,yesno) {
        if( typeof node == typeof "string" ) {
            if( yesno ) {
                return $("<div>").addClass('node').text(yesno+': '+node);
            } else {
                return $("<div>").addClass("node").text('Guess: '+node);
            }
        } else {
            var ychild = showNode(node.Y,'yes');
            var nchild = showNode(node.N,'no');
            return $("<div>")
                    .addClass("node")
                    .text(yesno+" Question: "+node.Q)
                    .append(ychild)
                    .append(nchild);
            }
    }
    var root = showNode(tree,"First");
    $(selector).append(root);
}

// ================================================================
// Saving/restoring tree to the local storage. This isn't necessary for a
// learning version of the game, but it is nice.

// This is the key that it'll be stored under in LocalStorage

twenty.treeKey = "20questionsTree";

// retrieve a tree from local storage

function getTree() {
    var str = localStorage.getItem(twenty.treeKey);
    if( str ) {
        tree = JSON.parse(localStorage.getItem(twenty.treeKey));
    } else {
        alert("There is no saved tree");
    }
}

// save a tree to local storage

function saveTree() {
    if(!ensureTree()) return;
    localStorage.setItem(twenty.treeKey, JSON.stringify(tree));
}

// ================================================================
// DOM interaction

// We play the game by taking the current tree node and rendering it to
// the page. The rendering has buttons for the user to choose yes/no,
// whereupon we remove the buttons and follow up. The rendering relies on
// templates in the HTML file. None of these functions update the DOM;
// instead they return stuff that the event handlers will add to the DOM.

// All of these functions are generic, working on a generic node. 

// This function starts the game.

function playDOM(node) {
    $('#questions').empty().append(askDOM(node));
}    

/* For a given node and answer, this returns the next DOM stuff to add to
 * ask the question or make a final guess.  */

function nextQuestionDOM(node, ans) {
    // helper function to make the next question DOM stuff
    function nq(child) {
        if( typeof child == 'string' ) {
            // make a guess
            return guessDOM(child);
        } else {
            return askDOM(child);
        }
    }
    if( ans == 'yes' ) {
        return nq(node.Y);
    } else if( ans == 'no' ) {
        return nq(node.N);
    } else {
        throw new TypeError("answer should be either yes or no: %o",ans);
    }
};

// This function asks a question, using a template in the HTML file.

function askDOM(node) {
    if( typeof node != "object" || typeof node.Q != "string" ) {
        throw new TypeError("not a question node: %o",node);
    }
    // HTML <template> nodes have a different API; have to use the '.content' property
    var qtc = $('#questionTemplate').bounds(1,1).prop('content');
    // Yes, we need this extra wrapping of jQuery; .prop doesn't return a JQ wrapped set
    var elt = $(qtc).find('.question').bounds(1,1).clone();
    elt.find('.subj').text(node.Q);
    return elt;
};
    
// When we get to a leaf (a string), we use it to guess. Very similar to
// asking a question.

function guessDOM(guess) {
    if( typeof guess != "string" ) {
        throw new TypeError("guess should be a string: %o",guess);
    }
    var gtc = $('#guessTemplate').bounds(1,1).prop('content');
    var elt = $(gtc).find('.question').bounds(1,1).clone();
    elt.find('.guess').text(guess);
    return elt;
}
    
// When we guess wrong, we ask the user for the correct answer so that we
// can update the tree.

function requestQuestion(guess) {
    if( typeof guess != "string") {
        throw new TypeError("guess is not a string: %o",guess);
    }
    // HTML <template> nodes have a different API; have to use the '.content' property
    var ltc = $('#lossTemplate').bounds(1,1).prop('content');
    // Yes, we need this extra wrapping of jQuery; .prop doesn't return a JQ wrapped set
    var elt = $(ltc).find('.loss').bounds(1,1).clone();
    elt.find('.myguess').text(guess);
    return elt;
};

// ================================================================
// Game play

var currentTreeNode = null;     // the current node
var parentTreeNode = null;      // for when we add to the tree

function startGame() {
    if( !ensureTree()) return;
    currentTreeNode = tree;
    playDOM(currentTreeNode);
}

function answerYes() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append(nextQuestionDOM(currentTreeNode,'yes'));
    parentTreeNode = currentTreeNode;
    currentTreeNode = currentTreeNode.Y;
}

function answerNo() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append(nextQuestionDOM(currentTreeNode,'no'));
    parentTreeNode = currentTreeNode;
    currentTreeNode = currentTreeNode.N;
}

function correctGuess() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append('<li>Yay! Click "new game" to play again');
}

function incorrectGuess() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append(requestQuestion(currentTreeNode));
}

function addToTree() {
    $('#questions [data-ans]').remove();
    var quest = $('#newQ').bounds(1,1).val();
    var yourans = $("#questions .yourans").bounds(1,1).val();
    var myguess = $("#questions .myguess").bounds(1,1).text();
    var newnode = {Q: quest, Y: yourans, N: myguess};
    // replace the guess in the parent node
    if( myguess == parentTreeNode.Y ) {
        parentTreeNode.Y = newnode;
    } else if (myguess == parentTreeNode.N) {
        parentTreeNode.N = newnode;
    } else {
        throw new Error("this shouldn't happen");
    }
    $('#questions .loss').remove();
}

// ================================================================
// User interface.  These are the event handlers on the various buttons.


/* function to add buttons to play the game or show the tree once the tree is loaded. */
function addButtonHandlers() {
    $("#newgame").click(startGame);
    $("#showhidetree").click( function () {
        if($('#treedisplay').attr('data-treeshown') == 'no') {
            if(!ensureTree()) return;
            // show tree
            twenty.showTree('#treedisplay');
            $('#showhidetree').text('Hide Tree');
            $('#treedisplay').attr('data-treeshown','yes');
        } else {
            // hide tree
            $('#treedisplay').empty();
            $('#showhidetree').text('Show Tree');
            $('#treedisplay').attr('data-treeshown','no');
        }
    });
    $("#savetree").click(saveTree);
}

function init () {
    tree = null;
    $("#savedTree").click(function () {
        getTree();
        addButtonHandlers();
    });
    $("#defaultTree").click(function () {
        readTreeFromServer();
        addButtonHandlers();
    });
    $('#questions').on('click','[data-ans=yes]', answerYes);
    $('#questions').on('click','[data-ans=no]', answerNo);
    $('#questions').on('click','[data-ans=win]',correctGuess);
    $('#questions').on('click','[data-ans=lose]', incorrectGuess);
    $('#questions').on('click','[data-ans=add]', addToTree);
};

// ================================================================
// API

// Eventually, this file of code will be hidden inside an IIFE and the
// only footprint will be the following. We could avoid even these, by
// invoking init() right here.

twenty.init = init;
twenty.readTreeFromServer = readTreeFromServer;
twenty.play = playDOM;
twenty.saveTree = saveTree;
twenty.getTree = getTree;
twenty.showTree = showTree;
