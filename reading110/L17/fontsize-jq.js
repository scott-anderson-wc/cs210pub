/* simple code to increase/decrease font size
   from an initial value of 12px.

   Scott D. Anderson
   scott.anderson@acm.org
   November 2011
   November 2013, modified to use jQuery
*/

var FontSize=12;  // in px

function changeFontSize(diff) {
    FontSize = FontSize + diff;
    $("body").css("font-size",FontSize+"px");
}

// Define functions to increase/decrease the font size by a fixed amount

function increaseFontSize() {
    changeFontSize(+1);
}

function decreaseFontSize() {
    changeFontSize(-1);
}

// When the file loads, set the font-size to the default, by adding zero
// to it and setting the body font size.

changeFontSize(0);

// Add event handlers to increase/decrease the font size.  

$("#increaseFont").click(increaseFontSize);
$("#decreaseFont").click(decreaseFontSize);
