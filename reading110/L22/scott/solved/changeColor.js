function changeColor(row, column, color) {
    var cellid = "#cell" + row + column;
    $(cellid).css('backgroundColor', color);
}
