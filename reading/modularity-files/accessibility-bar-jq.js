/* The following is based on code from
   http://www.white-hat-web-design.co.uk/articles/js-fontsize.php

   I changed it to assume that the font size is set on the BODY element,
   of which there is only one, so there's no need to iterate over all of
   the paragraphs.  I made some other minor modifications. (For example,
   parseInt stops at non-digits, so there's no need to get rid of the
   units of the existing font size.)

   Scott D. Anderson
   Fall 2009

   Rewrote using jQuery, Fall 2013.
   Update to avoid function literals and increase modularity, Fall 2015
*/

var minFontSize = 8;
var maxFontSize = 28;

/* Sets the body font to the given size (an integer). */

function setFontSize(size) {
    $("BODY").css("font-size",size+"px");
}

/* function to increase the current font size by 1px, up to the maximum */
function increaseFontSize() {
    var size = parseInt($("BODY").css("font-size"));
    if( size < maxFontSize ) {
        size = size + 1;
    }
    // finally, modify the element's style, using prior function
    setFontSize(size);
}

/* function to decrease the current font size by 1px, down to the minimum */
function decreaseFontSize() {
    var size = parseInt($("BODY").css("font-size"));
    if( size > minFontSize ) {
        size = size -1 ;
    }
    // finally, modify the element's style, using prior function
    setFontSize(size);
}

function addFontIncreaser(sel) {
    $("<li>").text("A").click(increaseFontSize).appendTo(sel); // JQ rocks!
}
    
function addFontDecreaser(sel) {
    $("<li>").text("a").click(decreaseFontSize).appendTo(sel); // JQ rocks!
}

/* Makes a clickable text control to set the font size to the given value.
   The text is the size of the font, printed in the desired size, so it's
   somewhat self-descriptive. */

function setFontSizeFromText() {
    setFontSize( parseInt( $(this).text() ) );
}

function addFontSizeControl(sel,size) {
    $("<li>").text(size+"px").click(setFontSizeFromText).appendTo(sel);
}

/* Function to create a "hide" control */
function hideThis () {
    $(this).hide();
};

function hider(sel) {
    $("<li>").text("hide this").click(hideThis).appendTo(sel);
}

/* This defines a particular accessibility bar, but you could easily make
   different ones by varying the controls, the order of the elements, and
   so forth.  Note that this code doesn't know what kind of HTML it's
   being added to; it just appends the controls.  That makes this more
   flexible. */

function makeBigAccessibilityBar(sel) {
    hider(sel);
    addFontDecreaser(sel);
    addFontSizeControl(sel,8);
    addFontSizeControl(sel,12);
    addFontSizeControl(sel,16);
    addFontSizeControl(sel,20);
    addFontSizeControl(sel,24);
    addFontSizeControl(sel,28);
    addFontIncreaser(sel);
}
