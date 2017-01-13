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
