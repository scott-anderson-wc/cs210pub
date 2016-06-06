function moveRight(row, column, color1, color2) {
    changeColor(row,column,color1);
    column ++;
    if(column == 10){
        column = 0;
    }
    changeColor(row,column,color2);
    return column;
}
