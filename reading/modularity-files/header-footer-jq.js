/* JavaScript functions that generate the headers and footers of a simple website.

The goal is to write a header that has a banner image and a navbar that looks like: 
    <nav>
      <ul>
         <li><a href="A.html" ...>Page A</a></li>
         <li><a href="B.html" ...>Page B</a></li>
        ... etc ...
     </ul>
   </nav>  
*/

function addHeader(sel) {
    addBannerPic(sel); 
    addNavbar(sel); 
}

function addBannerPic(sel) {
    var banner = $("<img>")
                     .attr('src','header.png')
                     .attr('alt','Welcome to my wonderful web site');
    $(sel).append(banner);
}

function addNavbar(sel) {
    var ul = $("<ul>");
    addMenuItem(ul, "Page A", "A.html" );
    addMenuItem(ul, "Page B", "B.html" );
    addMenuItem(ul, "Page C", "C.html" );
    addMenuItem(ul, "CS Dept", "http://www.wellesley.edu/cs");
    $("<nav>").append(ul).appendTo(sel);
}

function addMenuItem (sel, pagetitle, url) {
    var link = $("<a>")
                  .attr('href',url)
                  .text(pagetitle);
    $("<li>").append(link).appendTo(sel);
}

function addFooter(sel) {
    $(sel).html("<a rel='license'"
                   + "       href='http://creativecommons.org/licenses/by-nc-sa/1.0/'><img"
                   + "    alt='Creative Commons License' style='border: 0'"
                   + "    src='http://creativecommons.org/images/public/somerights.gif'></a>"
                   ); 
}
