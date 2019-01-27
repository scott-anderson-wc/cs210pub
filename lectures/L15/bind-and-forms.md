# The `bind` Method and Forms

Today, we'll discuss the `bind` method in JavaScript and conclude our
activity from Chapter 8.

Next, we'll look at HTML forms, from Chapter 9.

## Plan

1. OOP recap
1. Your questions on closures
1. Bind in JS
1. Chapter 8 activity
1. Forms
1. Your questions on forms
1. Chapter 9 activity

## OOP in JS recap

At this point, we know the basics of doing OOP in JS. We know:

1. How to write and name constructors
1. How to use `this` in a constructor
1. How to create instance variables as properties of `this`
1. How to define a method as a function stored in `Foo.prototype` and
accessing values in `this`

## OOP Conclusion

Objects often don't seem worthwhile, but taking the time to implement an
abstraction layer often pays off in unforeseen ways.

There was a story I heard where an AI system didn't get an innovation
implemented because they had used lists as a data structure instead of
some kind of abstraction. Later, they couldn't tell the difference between
accessing the first element of a list as a field accessor (method) versus
other kinds of list processing.

I can also tell you about a success I had in which I had defined a thin
interface to a library and I was able to keep all my code working when the
library failed by replacing the library and re-writing the interface a
bit.

## Questions

We'll look at [your questions on closures](../../quizzes/quiz12.html)

## Binding `this`

The `bind` method is an advanced feature of OOP in JS, but we will find it
useful, so let's learn it now.

Methods *must* have an object, bound to `this`

Unfortunately, `this` is no ordinary varible. It constantly gets rebound,
anytime there's a function call or a method call.

The following code, mal-adapted from your book (page 189) *doesn't* work:

```
:::JavaScript
Truck.prototype.printOrders_bad = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.TruckId + " has pending orders:");
    customerIdArray.forEach( function (id) {
        console.log(this.db.get(id));
       });
}

truck1.printOrders_bad();
```

The `Object.keys()` method is a way of getting an array of all the
properties in an object. Here the database is an object with a key for
each order, so an array of all the keys comprises all the orders. We then
use the `.forEach()` method on that array to print all the orders.

Why doesn't it work?  Because `this` doesn't mean the same thing in the
function passed to `forEach` as it did outside. Why? Because there's been
a method call and a function call, and those re-bind the value of `this`

### Solution 1:  use a closure over `that`

```
:::JavaScript
Truck.prototype.printOrders_closure = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.TruckId + " has pending orders:");
    var that = this;
    var print1 = function (id) { console.log(that.db.get(id)); }
    customerIdArray.forEach( print1 );
}
```

### Solution 2: use `bind`

This does the same thing, without having to invent a variable like `that`
and creating a closure:

```
:::JavaScript
Truck.prototype.printOrders_bind = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.TruckId + " has pending orders:");
    var print1 = function (id) {
        console.log(this.db.get(id));
    }.bind(this);
    customerIdArray.forEach( print1 );
}
```

Compare that with their code from page 189, which avoids an extra variable
at the price of some syntactic complexity:

```
:::JavaScript
Truck.prototype.printOrders_original = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.TruckId + " has pending orders:");
    customerIdArray.forEach( function (id) {
        console.log(this.db.get(id));
    }.bind(this));
}
```

## Chapter 8 activity

We'll pick up the Chapter 8 activity just before the debugging example on
page 183.

I'll demo the debugging, then you'll redo it (for practice) and then fix
the bug using `.bind()` and we'll be done.

[Chapter 8 Debugging](../../front-end-dev-resources/book-solutions/Chapter-08-halfway/coffeerun/)

I'll invoke `replicatebug` to trigger the error

Debugging Steps:

1. Set a breakpoint at the line of the error
1. show that `esc` opens/closes the drawer
1. run `myTruck.printOrders()` again
1. try pieces of the code, like `id`, `this.db.get(id)` and so forth the console
1. click up/down the call stack and try them again
1. resume execution
1. remove the breakpoint

Now do it on your own. If you need a starting point, you can use mine:

```
curl -O https://cs.wellesley.edu/~cs204/downloads/ch08-halfway.tar
tar xf ch08-halfway.tar
```

## Forms

Tags to know:

* `form`  wrapper for all controls (inputs)
* `label` to label an input/control with some text
* `input`  most common, many varieties, including
    * text very common
    * button for actions
    * submit to send form data to server
    * reset to clear the form
    * radio to make a set mutually exclusive choices
    * checkbox to make a set of combinatorial choices
* `select` and `option` for menus
* `textarea` for long chunks of text

Attributes to know:

* `name` and `value`
* `id` and `for` (used by `label`)
* `type` for inputs
* `action` and `method` for `form` (later in the course)

## Pizza example

We'll look back at the example in the [reading on forms](../../reading/forms.html), to make sure it's clear

## Questions
 
We'll look at [your questions on forms](../../quizzes/quiz12.html)

## Chapter 9 Activity

Here's the finished code from chapter 8, which you can use as a starting
point for Chapter 9's activity.

```
curl -O https://cs.wellesley.edu/~cs204/downloads/ch08.tar
tar xf ch08.tar
```

---

## Additional OOP Exercises

We'll do these only if there's time and desire. 

[OOP review](../L13/index.html#oop-exercises)

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement
