# OOP Inheritance

Today doesn't have a lot of code but has some important concepts.

## Plan

1. Admin: 
1. Questions on A9 (twenty questions)?
1. Recap OOP 
1. Answer your questions
1. Review A8 (quizzes)
1. Discuss A10 (Jelly Blobs of Doom)

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

Consider *addition*. We can define `add` on:

* integers
* floats
* ratios
* complex numbers
* vectors
* matrices
* functions
* many others

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

<div class="solution">

<p>It gives us an opportunity to define the API without worrying about
implementation, but we can do that with documentation.

<p>If there is code that can be <em>shared</em> among the children, then
    certainly we should do so.

</div>

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

Shape.prototype.getColor =
    function () { return this.color; };

Shape.prototype.setColor =
    function (color) { this.color = color; };

Shape.prototype.toString = function() {
    return "[A "+this.color+" "+this.constructor.name+"]";
};

var s1 = new Shape("red");
console.log("s1 is "+s1.toString());  // [A red Shape]
```

Note that `constructor.name` is built-in and gives the name of the
constructor as a string, so in this case it produces the string
`Shape`. Thus the string returned by `s1.toString()` is `[A red Shape]`


## The Subclass

Obviously, the subclass must be aware of the superclass. In particular,
any initialization that the superclass needs to do has to be done by the
constructor of the subclass. So, the subclass needs to *call* the
superclass constructor while *supplying* the value of `this`. Usually,
constructors are magically given a value of `this` because they are
invoked with the `new` keyword in front, but that doesn't happen with the
subclass. So, we use the `call` method.

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

Let's build a picture of what's going on with prototypes, constructors,
methods and such from [shapes](../../reading/shapes.html)

Let's look at the trouble with the `Triangle` object in that reading.

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

I'll answer [your questions](../../quizzes/quiz19.html)

## Exercise:

Implement a `Square` class to the system.  To use your C9 account, you can
upload the [shapes
file](https://cs.wellesley.edu/~cs204/reading/shapes.html) from the
reading:

```
curl -O https://cs.wellesley.edu/~cs204/reading/shapes.html
curl -O https://cs.wellesley.edu/~cs204/reading/shapes.js
```

No need to un-tar it; it's just two files.  Alternatively, just click on
the link above and work in the JS console.

Create an instance and experiment with it. Here's my solution:

<div class="solution">

<p>Did you make your <code>Square</code> inherit from <code>Shape</code>
or from <code>Rectangle</code>?

<pre>
function Square(color,upperleftcorner,side) {
     var ul = upperleftcorner;
     var lr = {x: ul.x+side, y: ul.y+side};    
     Rectangle.call(this,color,ul,lr);
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

// a 3x3 square with upper left at p1 = (10,20)
sq1 = new Square("yellow",p1,3);  
sq1.toString();
sq1.area();
sq1 instanceof Square;
sq1 instanceof Rectangle;
sq1 instanceof Shape;
</pre>
</div>

## Assignment 8

[quizzes](../../solutions/a08-quiz/quiz.html)

Notes:

* HTML is spartan
* IDs for the *three* things I want to address
* CSS is simple
* `Question.js` puts most work in the constructor.
* used a subfunction to avoid duplicate code
* squirrels away DOM element in instance variable for later
* method uses saved DOM element to attach to page
* quiz.js loops over questions, creating elements and adding to page
* grading function involves lots of DOM traversal and jQuery magic

## Assignment 10

We'll look at Assignment 10, Jelly Blobs. In particular, I'll talk about:

* The correspondence between the *model* and the CSS
* The `progress` callback
* Enemies do the checking for collisions, not the player
* Two testing functions I defined. I'll demo those.
* Inheritance: blobs, enemies, player

[Jelly Blobs of Doom](../../solutions/a10-jelly/jBlobs.html)

This is very cool but it's difficult. Get started on it ASAP.

What makes it hard?

1. lots more code
1. testing is hard
1. interactions with the animation thread

## New Syntax

If there's time, we'll explore the new syntax for subclasses:

[shapes new](../../reading/shapes-new.html)

## Summary

Classes allow us:

1. Abstraction: which gives us freedom of implementation
1. Polymorphism: which allows us to support common APIs and "distribute"
the implementation of methods over a set of objects.
1. Inheritance: which allows us to reuse behavior, code and types.

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and **how far behind you are** on the assignments. Of course, you
may also say one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

