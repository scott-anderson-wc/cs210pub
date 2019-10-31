function Circ(c1,radius) {
    this.center = c1;
    this.radius = radius;
}

Circ.prototype.area = function () {
    var radius = this.radius;
    return Math.PI*radius*radius;
}

var c1 = new Circ( origin, 10);
console.log(c1);
console.log("area of c1 is "+c1.area());

var objs = [ r1, c1, new Rect(p1, {x: 5, y: 15}), new Circ( p1, 100) ];

(function () {
    for ( var i = 0 ; i < objs.length; i++ ) {
        var obj = objs[i];
        console.log(i+" area of "+obj+" is "+obj.area());
    }
})();
