// creates a 10x10 grid for the chasing game and art canvas

function displayBoard (cellspace) {
    var row = "";
    var allStr = "";
    for (var row=0; row<10; row=row+1) {
        rowStr = "";
        for (var col=0; col<10; col=col+1) {
            rowStr = rowStr + "<td id=cell" + row + col + " class='blue'> <\/td>";
        }
        allStr = allStr + "<tr> " + rowStr + " <\/tr>\n";
    }
    document.writeln("<table border='10' cellspacing='" 
                     + cellspace
                     + "' width='300' height='300'>"
                     + allStr + "<\/table>");
}

function td(contents) {
    return "<td>"+contents+"</td>";
}

function tr() {
    var i, len=arguments.length, result='';
    for ( i=0; i<len; i++ ) {
        result += td(arguments[i]);
    }
    return "<tr>"+result+"</tr>";
}

function arrow(kind) {
    return "<img id="+kind+" src='"+kind+".jpg' alt='"+kind+" arrow'>";
}

function displayArrows(up,left,right,down) {
    document.write("<table border='0' cellspacing='0'>"
                   + tr("",arrow("up"),"")
                   + tr(arrow("left"),"",arrow("right"))
                   + tr("",arrow("down"),"")
                   + "</table>");
    var alert_errors = function (f) { return function () { try { f() } catch(e) { alert(e); } } };
    $("#up").click(alert_errors(up));
    $("#left").click(alert_errors(left));
    $("#right").click(alert_errors(right));
    $("#down").click(alert_errors(down));
}
