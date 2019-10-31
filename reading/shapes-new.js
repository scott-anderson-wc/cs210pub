class Shape {
    constructor(color) {
        this.color = color;
    }
    getColor() {
        return this.color;
    }
    setColor(color) {
        this.color = color;
    }
    toString() {
        // using the new template strings
        return `[A ${this.color} ${this.constructor.name}]`;
    }
}

var s1 = new Shape("red");
console.log("s1 is "+s1.toString());     // Look in the JS console

// ================================================================

class Rectangle extends Shape {
    constructor(color,corner1,corner2) {
        super(color);
        var c1 = corner1;
        var c2 = corner2;
        this.ulx = Math.min(c1.x, c2.x);
        this.uly = Math.max(c1.y, c2.y);
        this.lrx = Math.max(c1.x, c2.x);
        this.lry = Math.min(c1.y, c2.y);
    }
    
    area() {
        var width = this.lrx - this.ulx;
        var height = this.uly - this.lry;
        return width*height;
    }
}

var origin = {x: 0, y: 0};
var p1 = {x: 10, y: 20};

var r1 = new Rectangle( "blue", origin, p1);
console.log("r1 is "+r1.toString());
console.log("area is "+r1.area());

// ================================================================

class Circle extends Shape {
    constructor (color,c1,radius) {
        super(color);
        this.center = c1;
        this.radius = radius;
    }
    area() {
        var radius = this.radius;
        return Math.PI*radius*radius;
    }
}
        
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

class Triangle extends Shape {
    constructor (color,v1,v2,v3) {
        super(color);
        this.v1 = v1;    
        this.v2 = v2;    
        this.v3 = v3;
    }
}

var p2 = {x: 7, y: 11};
var p3 = {x: 9, y: 3};

var t1 = new Triangle("mauve",p1, p2, p3);
console.log("t1 is "+t1.toString());

// ================================================================
// Checking the inheritance chain for r1

// All true
console.log("r1 instanceof Rectangle: "+(r1 instanceof Rectangle));
console.log("r1 instanceof Shape: "+(r1 instanceof Shape));
console.log("r1 instanceof Object: "+(r1 instanceof Object));

// False
console.log("r1 instanceof Circle: "+(r1 instanceof Circle));
