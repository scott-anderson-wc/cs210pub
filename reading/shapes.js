function Shape(color) {
   this.color = color;
}

Shape.prototype.getColor = function () { return this.color; };

// Ideally, this method could check that the argument is 
// really a color, but we will omit that for simplicity.

Shape.prototype.setColor = function (color) { this.color = color; };

Shape.prototype.toString = function() {
    return "[A "+this.color+" "+this.constructor.name+"]";
};

var s1 = new Shape("red");
console.log("s1 is "+s1.toString());     // Look in the JS console

// ================================================================

function Rectangle(color,corner1,corner2) {
    // initialize object using superclass
    Shape.call(this,color);
    // UL is upper left, LR is lower right
    var c1 = corner1;
    var c2 = corner2;
    this.ulx = Math.min(c1.x, c2.x);
    this.uly = Math.max(c1.y, c2.y);
    this.lrx = Math.max(c1.x, c2.x);
    this.lry = Math.min(c1.y, c2.y);
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle; 

Rectangle.prototype.area = function () {
    var width = this.lrx - this.ulx;
    var height = this.uly - this.lry;
    return width*height;
}

var origin = {x: 0, y: 0};
var p1 = {x: 10, y: 20};

var r1 = new Rectangle( "blue", origin, p1);
console.log("r1 is "+r1.toString());
console.log("area is "+r1.area());

// ================================================================

function Circle(color,c1,radius) {
    // initialize using super's constructor
    Shape.call(this,color);
    // UL is upper left, LR is lower right
    this.center = c1;
    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function () {
    var radius = this.radius;
    return Math.PI*radius*radius;
};

var c1 = new Circle( "green", origin, 10);
console.log("c1 is "+c1.toString());
console.log("area of c1 is "+c1.area());

var objs = [ r1, c1, 
             new Rectangle("teal", p1, {x: 5, y: 15}), 
             new Circle( "yellow", p1, 100) ];

(function () {
    for ( var i = 0 ; i < objs.length; i++ ) {
        var obj = objs[i];
        console.log(i+" area of "+obj+" is "+obj.area());
    }
})();

// ================================================================

function Triangle(color,v1,v2,v3) {
    Shape.call(this,color);
    this.v1 = v1;    
    this.v2 = v2;    
    this.v3 = v3;
}

// Oops, we "forgot" to do these:
// Triangle.prototype = Object.create(Shape.prototype);
// Triangle.prototype.constructor = Triangle;

var p2 = {x: 7, y: 11};
var p3 = {x: 9, y: 3};

var t1 = new Triangle("mauve",p1, p2, p3);
console.log("t1 is "+t1.toString());
// This yields an error, because getColor isn't inherited
// console.log("t1's color is "+t1.getColor());

// ================================================================
// Checking the inheritance chain for r1

// All true
console.log("r1 instanceof Rectangle: "+(r1 instanceof Rectangle));
console.log("r1 instanceof Shape: "+(r1 instanceof Shape));
console.log("r1 instanceof Object: "+(r1 instanceof Object));

// False
console.log("r1 instanceof Circle: "+(r1 instanceof Circle));
