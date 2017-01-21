var twenty = {};

var tree = null;

function init () {
    tree = null;
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

function readTree(url, selector) {
    if( !selector ) {
        $.get(url, parseTree);
    } else {
        $.get(url, function (text) { parseTree(text); showTree(selector); });
    }
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
    var node = tree;
    while(!done) {
        if( typeof node === typeof 'string' ) {
            // final guess
            if( confirm(node) ) {
                alert('I win!');
            } else {
                alert('I lose...');
            }
            done = true;
        } else {
            if( confirm(node.Q) ) {
                node = node.Y;
            } else {
                node = node.N;
            }
        }
    }
}

twenty.init = init;
twenty.readTree = readTree;
twenty.play = play;
