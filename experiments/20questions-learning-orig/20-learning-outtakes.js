// For my first implementation, I just had a loop to go down the tree,
// asking questions using confirm().

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
