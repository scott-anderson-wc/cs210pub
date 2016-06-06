function moveDown (row, col, color1, color2) {
    changeColor (row, col, color1);
    row ++;
    if (row == 10) {
	row = 0;
    }
    changeColor (row, col, color2);
    return row;
}
