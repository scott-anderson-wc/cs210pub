(function () {
    var $c = $(".container");

    function addrow(width,num) {
        var $row = $("<div></div>").addClass("row");
        for (var i=0; i < num; i++ ) {
            $("<div></div>")
                 .html("&nbsp;")
                 .addClass(width)
                 .addClass("columns")
                 .addClass("shaded")
                 .appendTo($row);
        }
        $row.appendTo($c);
    }
    addrow("twelve",1);                          
    addrow("one",12);                          
    addrow("twelve",1);                          
    addrow("two",6);
    addrow("twelve",1);
    addrow("three",4);
    addrow("twelve",1);
    addrow("four",3);
    addrow("twelve",1);
    addrow("six",2);
    addrow("twelve",1);
})();

