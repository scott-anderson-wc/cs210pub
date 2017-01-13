function directions(name) {
    var testfile = "testing/test-"+name+".html";
    $(".funcname").text(name);
    $(".testfile").text(testfile);
    $("a.testfile").attr("href",testfile);
    $(".jsfile").text(name+".js");
}
