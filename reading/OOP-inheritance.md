# Inheritance in JavaScript
    
Object-oriented programming (OOP) has many advantages:

* data abstraction: objects hide implementation and provide behavior
* polymorphism: objects can provide similar behavior for different types

In addition, OOP often provides for *inheritance*. That is, the behavior
of a class can be extended or modified in *subclasses*.

We'll see how all these play out in JavaScript.

A good companion reading to this is the MDN article on [Inheritance in
JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance). The
article has some good but different examples.

## Data Abstraction

Suppose we are using JavaScript for a 2D computer graphics system. In our
system, we're going to have rectangles.

How shall we represent them? We could do any of the following:

* upper left and lower right corners
* upper left corner, width and height
* any two corners
* center and width and height
* ...

What if we decide on a representation and change our minds later? Will
that affect the users of our system?

What kind of behavior (methods) do we want to support?  We might list
quite a lot of methods, including drawing it on the screen (which we will
*not* discuss unless you twist my arm). For now, we're only going to
provide the `area` method.

Regardless of how we represent the rectangle internally, how shall we
allow the user to *construct* a rectangle?

For the purposes of this example, suppose we allow the user to give any
two corners in the constructor.

Furthermore (switching to the other side of the *abstraction barrier*),
let's suppose that we decide to implement the representation as the upper
left and lower right corners.

Here's a JavaScript implementation of [rectangles](rect.html).  Please read
the code; it's only about 20 lines.

## Abstraction Barrier

The *client* of these rectangle objects only knows that they can report
their area. They don't know or care what the internal representation
is. This is called an *abstraction barrier*.

The *implementor* of these rectangle objects provides a constructor and
that behavior (method).

Note that, the implementor might decide that, if clients ask for the area
a lot, maybe it would make sense to pre-compute it, or switch to a
representation that doesn't require so much computation. The *behavior*
remains the same, but it's now faster and more efficient.  We have the
freedom to change our representation.

## Polymorphism

Suppose that we also want to have circles. They should *also* support an
`area` method.  What will the internal representation be?

* Center and radius?
* Top and bottom points?
* Left and right points?

Here's an implementation of [rectangles and
circles](rect-and-circ.html). Please read the code. The new circle code is
only two dozen lines.

Note at the end of that code that we have a list of objects, some of the
rectangles and some of the circles.  We can compute the area of all of
them by using the `area` method that they both support.

This is called *polymorphism*: a single interface to entities of different
types.

One thing that's great about polymorphism is that we don't have to have a
"master" function that knows how to compute the area of all kinds of
shapes (and which then needs to be updated if we add a new kind of
shape). Instead, the knowledge of how to compute the area of a shape is
distributed among the shapes. Each knows how to compute its own area.

## Inheritance

What if we have some behavior that is common to both rectangles and
circles? Since we are supposing that this a 2D graphics system, maybe each
has to keep track of its color (fill mode, stroke width and many other
such properties).

We will define a new class called `Shape`. It will take a color as its
argument. We'll also define methods to get and set the color and one to
help print a shape, overriding the `toString()` method that every object
inherits from `Object`, the ancestor of all JavaScript objects.

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

### The `constructor` property

As you surely noticed, an object can know what function constructed
it. For `s1` it's the `Shape` function. Functions have properties like
`name`, which we used here in our `toString()` method.

Using the constructor name is not common, but it clarifies some of the
issues we will discuss next.

### Defining Subclasses

We'll redefine our classes for rectangles and circles to use
inheritance. In honor of this change, we'll call them `Rectangle` and
`Circle`.

Both of our Rectangle and Circle classes will *inherit* from
`Shape`. (`Shape` will be described as the *parent* class or sometimes the
*superclass*. `Rectangle` and `Circle` will be described as the *child*
class or the *subclass*.)

Setting up inheritance requires several steps:

* To properly initialize a new object, we must invoke the parent's
  constructor from the child's constructor. True, we could assign the
  `color` instance variable ourselves, but what if the parent changes the
  initialization code, say to check the color? Then we'd have to copy
  those changes to every child: very bad.
* We have to specify that the child's prototype is a instance of
  `Shape`. Since each object inherits instance variables and methods from
  its prototype chain, we have to make sure that chain is correct.
* Setting the child's prototype has the unwanted side-effect of changing
  the `constructor` property, which we use in the name, so we set it back
  to the correct value.

Here's a high-level view of creating a subclass:

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

Here we see a good use of the `call` method that functions have. We invoke
the `Shape` function but we supply a value to use for `this` (it happens
to be the same as the current `this`) and any additional arguments it
needs.

The following file has a complete implementation of these ideas, with
rectangles and circles. It also adds Triangles, but it "forgets" to set
the prototype and prototype constructor. The result is that triangles
don't inherit from `Shape`, which you can see in the console.log output.

Here's the file: [shapes](shapes.html)  

Please read the code; it's not terribly long, and much of it is familiar
to you from the earlier examples, so you can focus on the differences.

Notice that one of the cool things about inheritance is code reuse: all
the children (grandchildren and further descendants) of `Shape` get its
methods. 

## The `instanceof` Operator

There is a special JavaScript operator that will go through the prototype
chain for an object to determine whether it inherits from a particular
"class".  Remember that JavaScript doesn't really have classes; we
simulate that with constructor functions, so the constructor functions
stand in for classes:

```
:::JavaScript
// All true
console.log("r1 instanceof Rectangle: "+(r1 instanceof Rectangle));
console.log("r1 instanceof Shape: "+(r1 instanceof Shape));
console.log("r1 instanceof Object: "+(r1 instanceof Object));

// False
console.log("r1 instanceof Circle: "+(r1 instanceof Circle));
```

## Summary

Many object-oriented languages, such as Java and Python, have *classes*
and *objected*, with classes being the templates and factories for
objects. JavaScript doesn't have this "classical" (as Douglas Crockford,
author of <i>JavaScript: The Good Parts</i>, describes it) inheritance
system, but instead uses prototype chains. Nevertheless, we can implement
this classical OOP inheritance in JavaScript, and many JavaScript
libraries do so. For example, [Threejs](http://www.threejs.org), a library
for doing 3D computer graphics in JavaScript.
