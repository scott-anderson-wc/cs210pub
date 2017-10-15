# OOP Inheritance

Today doesn't have a lot of code but has some important concepts.

We'll also look at my solution to A8 (Quizzes)

## Plan

1. Questions on A9?
1. Recap OOP 
1. Answer your questions
1. Explore Quizzes

## Recap OOP

OOP has the following advantages:

* Abstraction
* Polymorphism
* Inheritance

## Abstraction

Discuss: Why is abstraction an advantage?

## Polymorphism

Originally created decades ago in the context of a simulation system, but
also important in many other situations.

Consider *addition*

Consider this API from `coffeerun`:

* `add` (an order)
* `get` (a particular order)
* `getAll`
* `remove` (an order)

By using abstraction and polymorphism, we can have modules that support
the same API.

* save to the current browser tab
* save to a cloud-based server
* save to the browser's local storage?

## Inheritance

Discuss: Would it make sense to define a superclass of the `coffeerun` API
that they all inherit from?

## How to Implement Inheritance:

Defining the superclass is just the same as defining an ordinary class,
which is good. We won't necessarily know in advance that someone wants to
subclass it.

## The Superclass

```
:::JavaScript
function Shape(color) {
   this.color = color;
}

Shape.prototype.getColor = function () { return this.color; };

Shape.prototype.setColor = function (color) { this.color = color; };

Shape.prototype.toString = function() {
    return "[A "+this.color+" "+this.constructor.name+"]";
};

var s1 = new Shape("red");
console.log("s1 is "+s1.toString());
```

## The Subclass

Obviously, the subclass must be aware of the superclass.

```
:::JavaScript
function Rectangle(color,c1,c2) {
    // initialize using superclass
    Shape.call(this,color);
    ...
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle; 
```

## Activity

Let's look at the trouble with the `Triangle` object from [shapes](../../reading/shapes.html)

```
t1.__proto__;
t1.toString();
t1 instanceof Shape;
t1.constructor;
```

Step 1. Set the `prototype`:

```
:::JavaScript
Triangle.prototype = Object.create(Shape.prototype);
t2 = new Triangle("gold", p1, p2, p3);
```
and repeat those operations on `t1` and `t2`

Step 2. Fix the constructor:

```
:::JavaScript
Triangle.prototype.constructor = Triangle;
```

and repeat the operations.

## Your Questions

Only 9 people did the quiz questions. I know this is a busy time of the
semester, but our time in class will be more effective if you do the
reading and the quiz.

Am I reviewing too much in class? Was it the fact that there wasn't any
book reading?

I'll answer [your questions](../../quizzes/quiz18.html)

## Exercise:

Implement a `Square` class to the system.  Create an instance and
experiment with it. Here's my solution:

<div class="solution">
<p>Did you make your <code>Square</code> inherit from <code>Shape</code> or from <code>Rectangle</code>?

<pre>
function Square(color,side) {
     Rectangle.call(this,color,side,side);
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

sq1 = new Square("yellow",3);
sq1.toString();
sq1.area();
sq1 instanceof Square;
sq1 instanceof Rectangle;
sq1 instanceof Shape;
</pre>
</div>

## Assignment 8

We'll look at the code of Assignment 8.

## Summary

Classes allow us:

1. Abstraction: which gives us freedom of implementation
1. Polymorphism: which allows us to support common APIs and "distribute"
the implementation of methods over a set of objects.
1. Inheritance: which allows us to reuse behavior, code and types.

