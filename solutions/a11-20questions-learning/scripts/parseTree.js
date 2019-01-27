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

    // return the value of the outermost recursive call
    return readNode();
};
