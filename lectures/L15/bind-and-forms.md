# The `bind` Method and Forms

Today, we'll discuss the `bind` method in JavaScript and conclude our
activity from Chapter 8.

Next, we'll look at HTML forms, from Chapter 9.

## Plan

1. OOP recap
1. Bind in JS
1. Chapter 8 activity
1. Forms
1. Your questions on forms
1. Chapter 9 activity
1. A5 Sliding Tiles solution
1. A6 Concentration solution

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

## Binding `this`

The `bind` method is an advanced feature of OOP in JS, but we will find it
useful, so let's learn it now.

Methods *must* have an object, bound to `this`

Unfortunately, `this` is no ordinary varible. It constantly gets rebound,
anytime there's a function call or a method call.

Here is the [coffeerun halfway code](../../front-end-dev-resources/book-solutions/Chapter-08-halfway/coffeerun/index.html)

The following code, mal-adapted from your book (page 189) *doesn't* work:

```
:::JavaScript
Truck.prototype.printOrders_buggy = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    customerIdArray.forEach( function (id) {
        console.log(this.db.get(id));
       });
}

truck1.printOrders_buggy();
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

    var that = this;
    var print1 = function (id) {
        console.log(that.db.get(id));
        };
    customerIdArray.forEach( print1 );
}
```

### Solution 2: use `bind`

The following code does the same thing, without having to invent a
variable like `that` and creating a closure by hand:

```
:::JavaScript
Truck.prototype.printOrders_bind = function () {
    var customerIdArray = Object.keys(this.db.getAll());

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
Truck.prototype.printOrders_solved = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    customerIdArray.forEach( function (id) {
        console.log(this.db.get(id));
    }.bind(this));
}
```

## Chapter 8 activity

We'll pick up the Chapter 8 activity just before the debugging example on
page 183. I added those extra methods to the code, so please re-download
and re-untar:

```
rm -r Chapter-08-halfway
curl -O https://cs.wellesley.edu/~cs204/downloads/Chapter-08-halfway.tar
tar xf Chapter-08-halfway.tar
```

I'll demo the debugging, then you'll redo it (for practice) and then fix
the bug using `.bind()` and we'll be done.

Here again is the [coffeerun halfway code](../../front-end-dev-resources/book-solutions/Chapter-08-halfway/coffeerun/index.html)

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

## Questions
 
We'll look at [your questions](../../quizzes/quiz12.html)

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

We'll look back at the example in the [reading on forms](../../reading/forms.html#pizza-form), to make sure it's clear

## Questions
 
We'll look at [your questions on forms](../../quizzes/quiz12.html)

## Chapter 9 Activity

Here's the finished code from chapter 8, which you can use as a starting
point for Chapter 9's activity.

```
curl -O https://cs.wellesley.edu/~cs204/downloads/ch08.tar
tar xf ch08.tar
```

## Forms and JS

I'll preview the next chapter by returning to the
[pizza form](../../reading/forms.html#pizza-form) example, filling it out,
and then serializing it in two ways using jQuery methods:

* [serialize()](https://api.jquery.com/serialize) which gives us a string, 
* [serializeArray()](https://api.jquery.com/serializeArray) which gives us
an array of pairs, represented as objects

## A5 Sliding Tiles Solution

I'll have a paper handout. Here's the live game, and I will show you the
source.

[A5 solution](../../solutions/a05-sliding-tiles/tile-game.html)

bottom-up coding:

* top and left set for each img
* tile array stores ID of each img
* location of blank is known
* get functions just look in the tile array relative to location of blank
* updateData changes the location of the moved tile and the blank
* movePicture animates the movement and also invokes updateData
* doMove figures out the tile to move and invokes movePicture
* event listener just maps keys to an invocation of doMove

## A6 Concentration Solution

I'll have a paper handout. Here's the live game, and I will show you the
source.

[A6 solution](../../solutions/a06-concentration/game.html)

* each img has an ID and initially shows the blank img
* globals to count things and tell first from second click
* newGame just resets them
* showImage changes the src to the desired pic
* hideImage also just changes the src to the blank
* processClick is big. arg is the id of the picture clicked on
    * if first click, show image and set state to second click
    * if second click:
        * increase tries
        * show image
        * compare src to determine a match
        * if no match, hide both after a short delay
        * else increase matches, and maybe end game
        * set state to first click
* updateStatus just updates the page
* addEventHandler adds one handler to one img
    * gets the id from an attribute
    * click handler is a closure over the id
    * also set a global for debugging
* addEventHandlers iterates over a node array just like our book does

---

## Additional OOP Exercises

We'll do these only if there's time and desire. 

[OOP review](../L13/OOP-exercises)

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement
