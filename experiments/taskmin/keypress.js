/* This turns out not to be necessary at least in Chrome using buttons.

$(document).keypress(function (evt) {
    SPC = 32;
    ENTER = 13;
    
    switch (evt.which) {
    case SPC:
    case ENTER:
        // these keys trigger a click event on the focussed element
        $(event.target).click();
        break;

    default:
        console.log("Don't know how to handle "+evt.which
                    +" ("+String.fromCharCode(evt.which)+")");
    }
});

*/

