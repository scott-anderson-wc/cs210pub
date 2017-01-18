var twenty = {};
twenty.url = 'tree2.text';       // the url for the default tree

var tree = null;                // the tree of question nodes
var curr = null;                // the current node

/* function to add buttons to play the game or show the tree once the tree is loaded. */
function addButtons() {
    $("<button>")
        .text("New Game")
        .click(function () { twenty.play('#questions'); })
        .appendTo("#controller_buttons");
    $("<button>")
        .text("Show Tree")
        .click(function () { twenty.showTree("#treedisplay"); })
        .appendTo("#controller_buttons");
}

function init () {
    tree = null;
    $("#savedTree").click(function () {
        twenty.getTree();
        addButtons();
        $(this).remove();
    });
    $("#defaultTree").click(function () {
        twenty.readTree();
        addButtons();
        $(this).remove();
    });
    $('#questions').on('click','[data-ans]',
                       function (event) {
                           var ans = $(this).attr("data-ans");
                           console.log("answer was "+ans);
                           // remove this button and its twin
                           $('#questions [data-ans]').remove();
                           $('#questions').append(curr.nextQuestionDOM(ans));
                       });
};

function parseTree(text) {
    text = text.trim();
    gtext = text;
    var lines = text.split("\n");
    glines = lines;
    function readNode() {
        if( lines.length == 0 ) {
            throw "error: out of lines";
        }
        var line = lines.shift();
        gline = line;
        var parts = line.trim().split(":");
        var nodeType = parts[0];
        console.log('nodetype: ',nodeType);
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
            throw 'Wrong node type: '+nodeType;
        }
    }
    tree = readNode();
};

function showTree(selector) {
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

function readTree(selector) {
    if( !selector ) {
        $.get(this.url, parseTree);
    } else {
        $.get(this.url, function (text) { parseTree(text); showTree(selector); });
    }
}

var treeKey = "20questionsTree";

function getTree() {
    tree = JSON.parse(localStorage.getItem(treeKey));
}

function saveTree() {
    localStorage.setItem(treeKey, JSON.stringify(tree));
}

var currNode = null;

function buttonYes() { return buttonYesNo('Yes'); }
function buttonNo() { return buttonYesNo('No'); }

function buttonYesNo(yesno) {
    var id='#button'+yesno;
    $(id).off().attr("id","")
    return $("<button>").text(yesno).attr("id",id)[0];
}

function iwin() {
    alert('I win!');
}

function ilose() {
    alert('I lose...');
}

function askQuestion(selector,node) {
    currNode = node;
    if(typeof node == typeof "string") {
        console.log('Current node is a leaf ',node);
        $('<p>')
            .html('Is the subject '+node+'?'+buttonYes()+buttonNo())
           .appendTo(selector);
        $('#buttonYes').click(iwin);
        $('#buttonNo').click(ilose);
    } else {
        // internal node
        console.log('Current node is a choice ',node.Q);
        $('<p>').html(node.Q+'?')
            .append(buttonYes())
            .append(buttonNo())
            .appendTo(selector);
        $('#buttonYes').click( function () {
            console.log('clicked Yes');
            askQuestion(selector,node.Y);
        });
        $('#buttonNo').click( function () {
            console.log('clicked No');
            askQuestion(selector,node.N);
        });
    }
}

function play2(selector) {
    askQuestion(selector,tree);
}

function play(selector) {
    var done = false;
    var parent = null;
    var node = tree;
    while(!done) {
        if( typeof node === typeof 'string' ) {
            // final guess
            if( confirm('Is the subject '+node+'?') ) {
                alert('I win!');
            } else {
                alert('I lose...');
                var newA = prompt("Please say what the correct answer was: ");
                var newQ = prompt("Please give a yes/no question to distinguish "+node+" from "+newA
                                  +' where Yes is '+node+' and No is '+newA);
                var newChild = {Q: newQ, Y: node, N: newA};
                if( parent.Y == node ) {
                    parent.Y = newChild;
                } else if( parent.N == node ) {
                    parent.N = newChild;
                } else {
                    throw "Couldn't figure out which child to replace";
                }
                $("#treedisplay").empty();
                showTree("#treedisplay");
                saveTree();
            }
            done = true;
        } else {
            if( confirm(node.Q) ) {
                parent = node;
                node = node.Y;
            } else {
                parent = node;
                node = node.N;
            }
        }
    }
}

twenty.init = init;
twenty.readTree = readTree;
twenty.play = play;
twenty.saveTree = saveTree;
twenty.getTree = getTree;
twenty.showTree = showTree;

// ================================================================

function QuestionNode(question, yeschild, nochild) {
    this.Q = question;
    console.assert(yeschild instanceof QuestionNode || yeschild instanceof String)
    console.assert(nochild instanceof QuestionNode || nochild instanceof String)
    this.Y = yeschild;
    this.N = nochild;
}

QuestionNode.prototype.askDOM = function () {
    var elt = $('#questionTemplate > .question').clone();
    elt.find('.subj').text(this.Q);
    return elt;
};

function guessDOM(guess) {
    var elt = $('#guessTemplate > .question').clone();
    elt.find('.subj').text(guess);
    return elt;
}

QuestionNode.prototype.nextQuestionDOM = function (ans) {
    console.assert(ans == 'yes' || ans == 'no');
    function nextQuestionDOM(child) {
        if( child instanceof QuestionNode ) {
            // ask another question
            return child.askDOM();
        } else {
            // has to be a string
            return guessDOM(child);
        }
    }
    if( ans == 'yes' ) {
        nextQuestionDOM(this.Y);
    } else {
        nextQuestionDOM(this.N);
    }
};
            
        
function parseTreeNodes(text) {
    text = text.trim();
    gtext = text;
    var lines = text.split("\n");
    glines = lines;
    function readNode() {
        if( lines.length == 0 ) {
            throw "error: out of lines";
        }
        var line = lines.shift();
        gline = line;
        var parts = line.trim().split(":");
        var nodeType = parts[0];
        console.log('nodetype: ',nodeType);
        if( ['Q', 'YQ', 'NQ' ].indexOf(nodeType) != -1 ) {
            // two children
            var ychild = readNode();
            var nchild = readNode();
            var node = new QuestionNode(parts[1], ychild, nchild);
            return node;
        } else if ( ['YG', 'NG'].indexOf(nodeType) != -1 ) {
            // leaf
            console.log('Found leaf: ',line);
            return parts[1];
        } else {
            throw 'Wrong node type: '+nodeType;
        }
    }
    tree = readNode();
};

function readTreeNodes(selector) {
    if( !selector ) {
        $.get(this.url, parseTreeNodes);
    } else {
        $.get(this.url, function (text) { parseTreeNodes(text); showTree(selector); });
    }
}
