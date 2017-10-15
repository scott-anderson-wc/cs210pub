// ================================================================
// Questions as proper objects with methods. However, this makes
// converting to/from JSON more difficult, so I've abandoned this idea.

function QuestionNode(question, yeschild, nochild) {
    this.Q = question;
    console.assert(yeschild instanceof QuestionNode || typeof yeschild == 'string');
    console.assert(nochild instanceof QuestionNode || typeof nochild == 'string');
    this.Y = yeschild;
    this.N = nochild;
}




QuestionNode.prototype.askDOM = function () {
    // HTML <template> nodes have a different API; have to use the '.content' property
    var qtc = $('#questionTemplate').bounds(1,1).prop('content');
    // Yes, we need this extra wrapping of jQuery; .prop doesn't return a JQ wrapped set
    var elt = $(qtc).find('.question').bounds(1,1).clone();
    elt.find('.subj').text(this.Q);
    return elt;
};

function guessDOM(guess) {
    var gtc = $('#guessTemplate').bounds(1,1).prop('content');
    var elt = $(gtc).find('.question').bounds(1,1).clone();
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
