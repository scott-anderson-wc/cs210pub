function Ball(color, radius, hasPolkaDots) {
    this.ballColor = color;
    this.ballRadius = radius;
    this.doesThisBallhavePolkaDots = hasPolkaDots;
};

Ball.prototype.getColor = function() {
    return this.ballColor;
};

Ball.prototype.setColor = function(color) {
    this.ballColor = color;
};

Ball.prototype.bounce = function () {
    console.log('Booiiiinng. Ball is bouncing.');
};

// examples of creating two instances of the class
var ball1 = new Ball("Red", 12, true);
var ball2 = new Ball("Blue", 5, false);

// examples of invoking a method
console.log(ball1.getColor()); // "Red"

ball1.setColor("Green");

console.log(ball1.getColor()); // "Green"

// example of retrieving an instance variable
// it would be better to define a method to do this
console.log(ball2.ballRadius); // 5

ball1.bounce();  // Booiiiiinng. Ball is bouncing
ball2.bounce();  // Booiiiiinng. Ball is bouncing
