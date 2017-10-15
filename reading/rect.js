function Rect(c1,c2) {
    // UL is upper left, LR is lower right
    this.ulx = Math.min(c1.x, c2.x);
    this.uly = Math.max(c1.y, c2.y);
    this.lrx = Math.max(c1.x, c2.x);
    this.lry = Math.min(c1.y, c2.y);
}

Rect.prototype.area = function () {
    var width = this.lrx - this.ulx;
    var height = this.uly - this.lry;
    return width*height;
}

var origin = {x: 0, y: 0};
var p1 = {x: 10, y: 20};

var r1 = new Rect(origin, p1);
console.log(r1);
console.log("area is "+r1.area());
