function moveUp(row,col,color1,color2) {
    changeColor(row,col,color1);
    row --;
    if (row<0) {
        row = 9;
    }
    changeColor(row,col,color2);
    return row;
}
