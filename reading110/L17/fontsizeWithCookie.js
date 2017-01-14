/* simple code to increase/decrease font size
   from an initial value of 12px.

   Scott D. Anderson
   scott.anderson@acm.org
   November 2011
*/

var FontSize=12;  // in px

var fontsize_cookie = getCookie("font_size");
if( fontsize_cookie != "" ) {
    FontSize = parseInt(fontsize_cookie);
}

function changeFontSize(diff) {
    FontSize = FontSize + diff;
    setCookie("font_size",FontSize);
    document.body.style.fontSize=FontSize+"px";
}
