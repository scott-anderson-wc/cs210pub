/* The markdown package creates "pre" elements out of code blocks, but
 * doesn't add the "prettyprint" class that the Google prettify code looks
 * for. So I add it to everything that doesn't say noprettyprint. */

function addPrettyPrintClass() {
    $("pre").each(function () {
        if(!$(this).hasClass('noprettyprint')) {
            $(this).addClass('prettyprint');
        }
    });
}

/* Create additional PRE elements for displaying examples (elts with class
   "eg"). They will also be pretty printed. Each should have an ID
   attribute, say FOO. You can put the result anywhere, just by creating
   an empty PRE element with the ID FOO_dst.  Otherwise, the display is
   put right after the element.
*/

function addPreExamples() {
    $(".eg").each(function () {
        var srcId = $(this).attr("id");
        console.log("copying "+srcId);
        var dstElt;
        if(!srcId) {
            dstElt = $("<pre>").addClass("prettyprint").insertAfter(this);
        } else {
            var dstId = "#"+srcId+"_dst"; 
            dstElt = $(dstId);
            if(dstElt.length == 0) {
                console.log("Couldn't find "+dstId+"; putting it here");
                dstElt = $("<pre>").addClass("prettyprint").insertAfter(this);
            }
        }
        $(dstElt).text($(this).html().trim());
    });
}