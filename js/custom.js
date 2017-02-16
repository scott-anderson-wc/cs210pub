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

/* Eventually, we won't need this function, I hope. No, the PRE elements created by Markdown have multiple children, so we'll just ignore this. */

function checkPreElements() {
    $("pre").each(function () {
        return;
        if( this.childElementCount != 1 ) {
            alert("PRE with multiple children: "+this.innerHTML);
        } else if( this.firstChild.nodeName !== "CODE" ) {
            alert("PRE without CODE: "+this.innerHTML);
        }
    });
}
    

/* This function should be called *before* any pretty-printing */

function trimPreElements() {
    $("pre > code").each(function () {
        $(this).html( $(this).html().trim() );
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


/* ================================================================ */
// Top margin for fragments

/* If the URL has #id in it, that part of the page will scroll to the top
 * of the browser window, but because of our damn nav bar at the top,
 * it'll be hidden behind the nav bar. So, this bit of code adds a
 * margin-top to the target element (and only the target element), so that
 * it'll be visible. */

function addMarginTopToFragment() {
    var hash = document.location.hash;
    if( hash ) {
        console.log("adding a margin-top to "+hash);
        $(hash).css('margin-top','100px');
    }
}

