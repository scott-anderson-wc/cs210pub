function moveLeft(row, column, color1, color2) {
    changeColor(row,column, color1);
    column --;
    if(column < 0) {
	column = 9;
    }
    changeColor(row,column, color2);
    return column;
}
