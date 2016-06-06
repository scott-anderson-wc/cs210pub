/* simple code to increase/decrease font size
   from an initial value of 12px.

   Scott D. Anderson
   scott.anderson@acm.org
   November 2011
*/

var fontSize=12;  // in px

function changeFontSize(diff) {
    fontSize = fontSize + diff;
    document.body.style.fontSize=fontSize+"px";
    console.log("font set to "+fontSize);
}

function increase() {
    console.log("increasing");
    changeFontSize(+1);
}

function decrease() {
    console.log("decreasing");
    changeFontSize(-1);
}

function setup() {
    console.log("set up");
    changeFontSize(0);
    document.querySelector('#bigger').onclick = increase;
    document.querySelector('#smaller').onclick = decrease;
}

window.onload = setup;
