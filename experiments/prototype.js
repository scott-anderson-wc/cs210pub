function Foo(x) {
    this.x = x;
    return this;
}

Foo.prototype.getX = function () { return "prototype "+this.x; }

Foo.prototype.getC = function () { return "prototype"; }

Foo.getX = function () { return "function "+this.x; }

Foo.getC = function () { return "function"; }

var foo = new Foo("17");

alert(foo.getX());
alert(foo.getC());
