
// ================================================================
// file randomColor.js 

function randomColor() {
    var color = randomInt(5);
    
    if(color == 0) {
        return "red";
    } else if(color == 1) {
        return "magenta";
    } else if(color == 2) {
        return "green";
    } else if(color == 3) {
        return "cyan";
    } else if(color == 4) {
        return "yellow";
    }
}

// ================================================================
// file changeColor.js 

function changeColor(row, column, color) {
    var cellid = "#cell" + row + column;
    $(cellid).css('backgroundColor', color);
}

// ================================================================
// file moveLeft.js 

function moveLeft(row, column, color1, color2) {
    changeColor(row,column, color1);
    column --;
    if(column < 0) {
	column = 9;
    }
    changeColor(row,column, color2);
    return column;
}

// ================================================================
// file moveRight.js 

function moveRight(row, column, color1, color2) {
    changeColor(row,column,color1);
    column ++;
    if(column == 10){
        column = 0;
    }
    changeColor(row,column,color2);
    return column;
}

// ================================================================
// file moveUp.js 

function moveUp(row,col,color1,color2) {
    changeColor(row,col,color1);
    row --;
    if (row<0) {
        row = 9;
    }
    changeColor(row,col,color2);
    return row;
}

// ================================================================
// file moveDown.js 

function moveDown (row, col, color1, color2) {
    changeColor (row, col, color1);
    row ++;
    if (row == 10) {
	row = 0;
    }
    changeColor (row, col, color2);
    return row;
}
