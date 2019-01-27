// Eventually, wrap this in an IIFE to make it a module.

var twenty = {};

var tree = null;                // the tree of question nodes

function ensureTree() {
    if( ! tree ) {
        alert("There is no tree; maybe load a default one from the server?");
        return false;
    } else {
        return true;
    }
}

/* global $ parseTree */

// Read a tree from a file on the server, parse it, and set the global.
// This is the sole bit of Ajax code.

function readTreeFromServer() {
    $.get(twenty.url, function (data) { tree = parseTree(data); });
}

// ================================================================
// Showing the tree. Useful for debugging and such.  The technique here is
// to generate nested DIV elements, each with some padding-left that will
// then have them properly indented by depth.  The entire tree is
// generated off-stage and then added to the page at the end.

function nodeType(node) {
    if( typeof node === 'string' ) {
        return "guess";
    } else {
        return "question";
    }
}

function showTree(selector, node) {

    // Recursive local function to return the DOM element for a subtree (a
    // node and all its children). First arg says whether it's a yes child
    // or a no child (added feature).

    function showNode(node,yesno) {
        if( nodeType(node) == "guess" ) {

            return $("<div>")
                         .addClass('node')
                         .text(yesno+': '+node);

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
    var root = showNode(node,"First");
    $(selector).append(root);
}

// ================================================================
// DOM interaction

// We play the game by taking the current tree node and rendering it to
// the page. The rendering has buttons for the user to choose yes/no,
// whereupon we remove the buttons and follow up. The rendering relies on
// templates in the HTML file. None of these functions update the DOM;
// instead they return stuff that the event handlers will add to the DOM.

// All of these functions are generic, working on a generic node. 

/* For a given node and answer, this returns the next DOM stuff to add to
 * ask the question or make a final guess.  */

function nextQuestionDOM(node) {
    if( nodeType(node) === "guess" ) {
        return guessDOM(node);
    } else {
        return askDOM(node);
    }
}

// This function asks a question, using a template in the HTML file.

function askDOM(node) {
    var elt = $('#questionTemplate > .question').one().clone();
    elt.find('.subj').text(node.Q);
    return elt;
};
    
// When we get to a leaf (a string), we use it to guess. 

function guessDOM(guess) {
    var elt = $('#guessTemplate > .question').one().clone();
    elt.find('.guess').text(guess);
    return elt;
}
    
// ================================================================
// Game play

var currentTreeNode = null;     // the current node

function startGame() {
    if( !ensureTree()) return;
    currentTreeNode = tree;
    $('#questions').empty().append(nextQuestionDOM(tree));
}

function answerYes() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append(nextQuestionDOM(currentTreeNode.Y));
    currentTreeNode = currentTreeNode.Y;
}

function answerNo() {
    // remove this button and its twin
    $('#questions [data-ans]').remove();
    $('#questions').append(nextQuestionDOM(currentTreeNode.N));
    currentTreeNode = currentTreeNode.N;
}

function correctGuess() {
    $('#questions [data-ans]').remove();
    $('#questions').append('<li>Yay! Click "new game" to play again');
}

function incorrectGuess() {
    $('#questions [data-ans]').remove();
    $('#questions').append('<li>Boo! I lost. Click "new game to play again');
}

// ================================================================
// User interface.  These are the event handlers on the various buttons.


/* function to add buttons to play the game or 
 * show the tree once the tree is loaded. */

function addButtonHandlers() {
    $("#newgame").click(startGame);
    $("#showhidetree").click( function () {
        if($('#treedisplay').attr('data-treeshown') == 'no') {
            if(!ensureTree()) return;
            // show tree
            twenty.showTree('#treedisplay', tree);
            $('#showhidetree').text('Hide Tree');
            $('#treedisplay').attr('data-treeshown','yes');
        } else {
            // hide tree
            $('#treedisplay').empty();
            $('#showhidetree').text('Show Tree');
            $('#treedisplay').attr('data-treeshown','no');
        }
    });
}

function init () {
    tree = null;
    $("#defaultTree").click(function () {
        readTreeFromServer();
        addButtonHandlers();
    });
    $('#questions').on('click','[data-ans=yes]', answerYes);
    $('#questions').on('click','[data-ans=no]', answerNo);
    $('#questions').on('click','[data-ans=win]',correctGuess);
    $('#questions').on('click','[data-ans=lose]', incorrectGuess);
};

// ================================================================
// API

// Eventually, this file of code will be hidden inside an IIFE and the
// only footprint will be the following. We could avoid even these, by
// invoking init() right here.

twenty.init = init;
twenty.readTreeFromServer = readTreeFromServer;
twenty.play = startGame;
twenty.getTree = readTreeFromServer;
twenty.showTree = showTree;
