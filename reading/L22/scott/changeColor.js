
	function changeColor(row, column, color) {

	var cell_row_column = "cell" + row + column;
	
	var elt = document.getElementById(cell_row_column);

	elt.style.backgroundColor = color;
	
	}