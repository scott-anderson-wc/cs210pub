# Closures and Namespaces

This reading is supplemental to Chapter 8 (through page 173), which uses
Immediately Invoked Function Expressions (IIFEs) to establish
*namespaces*. This reading also discusses *closures*, which are briefly
described on page 133.

A closure is a special kind of function, and a namespace is a way that a
programming language can support separation of code. Consequently, you'll
learn more about these concepts in CS 251 (Programming Languages), but
they are important, practical concepts that arise naturally in JavaScript
code, so we'll learn about them now.

But, before we get to closures, let's review some ideas that you probably
remember from prior CS classes, but I want to bring to the top of your
mind.

## Scope

In JavaScript, variables can be *local* or *global*. A global variable can
be seen by any code anywhere; local variables can only be seen from a
small part of the code.  For example, consider the following code:

```
var glob = 13;

function fred(x) {
    return x+glob;
}

function george(x) {
    x = Math.random();
    glob = Math.random();
    return x+glob;
}
```

The global variable `glob` is visible to both functions. (The function
names `fred` and `george` also go into the global namespace and so are
visible to each other. For example, they could invoke each other.)

The local variable `x` is local to each function. I could
<q>simultaneously</q> invoke fred and george with different values for `x`
and nothing would go wrong, because they are different names and therefore
different storage locations. Imagine each function is a family, and both
families have a child named `x` (short for <q>Xenophon</q> and
<q>Xerxes</q>). Different kids, different storage locations, but the
identical names cause no confusion. For the functions, the `x` variable
exists only during the function call and disappears when the function
completes.

## Other Scopes

There are other scopes in addition to local and global. Imagine we have a
function that needs some helper functions. Because they are only used by
the main function, we can make the *local* to the main function.  Here's
an example using [quicksort](https://en.wikipedia.org/wiki/Quicksort); if you don't
know that sorting algorithm, it's sufficient to know that it needs two
helper functions, named `partition` and `qs`.  I'm adapting this code from
the Wikipedia article linked earlier.

```
function quicksort(arrayToSort, compareFunction) {
     var A = arrayToSort;
     var less = compareFunction;

     // modify array, moving small elements to the beginning and
     // big ones to the end. Return the location of the division

     function partition(lo, hi) {
         var i = lo;
         ...
            if( less(A[j], A[i] ) swap(A,i,j);
         ...
         return i+1;
     }

     // sorts the sub-array from lo .. hi

     function qs(lo,hi) {
         if( lo < hi ) {
             var p = partition(lo,hi);
             qs(lo, p-1);
             qs(p+2, hi);
         }
     }

     // finally, use qs on the whole array
     qs(0, A.length-1);
}
```

Did you see the use of a comparison function that is passed into the
sorting algorithm?

Consider the scopes of different variables.  The parameters of `partition`
and of the recursive `qs` function (`lo` and `hi`) are local to just those
function calls. That's a good thin, particularly in the case of the
recursive `qs` function, because there are several of them being computed
at once, and so they each need to have different values for `lo` and `hi`.

Now consider the scopes of `A` and `less`. They are *local* to the
`quicksort` function, but they are *non-local* to the `partition` and `qs`
functions.  The names `A` and `less` are shared by the two helper
functions, so they are like global variables in that respect. These
non-local scopes are also called *environments*, since they are the spaces
that the functions live in, but are outside the functions themselves. But
they're not global, since they exist only for the duration of the
`quicksort` function.

We can nest scopes/environments as deeply as we like, and JavaScript will
not get confused. Moreover, neither will we: the value of a name is the
value it has in the innermost scope that contains the reference.  For
example:

```
function f1(x) {
   function f2(x) {
      function f3(x) {
          function f4(x) {
               function f5(x) {
                   return x+5;
               }
              return f5(x+4);
          }
          return f4(x+3);
      }
      return f3(x+2);
  }
  return f2(x+1);
}

console.log(f1(0));  // prints 15
```

It may not be obvious that the function returns 15, but it should be clear
that each `x` means the argument to its own function, and doesn't mean the
argument to any other function.  There are 5 different nested namespaces
here.

Of course, all these nested namespaces are extremely ephemeral: each
disappears when its function call completes, so they all have disappeared
when `f1` completes.  Things become more interesting when they don't
disappear.  

## What is a Closure?

Formally, a closure is a function plus an environment (you can read more
about them in the [Wikipedia article on
Closures](https://en.wikipedia.org/wiki/Closure_(computer_programming)),
so to begin getting a handle on them, we start with some more observations
about functions.

## Functional Programming

The following functions `f1` and `f2` depend only on their inputs (rather
than on some global state information), which makes them easier to
understand than the function `g1` which depends on some global variable
`glob`. (For example, suppose `glob` is a string: then the value of `g1`
is a string, too.)

```javascript
var f1 = function (x y) { return x + y; };
var f2 = function (x) { return x + 4; };
var g1 = function (x) { return x + glob; };
```

When we talk about ''functional programming'' in Computer Science, we are
thinking about functions like `f1` and `f2`, where calling the functions
with the same inputs always yields the same output. The same can't be said
of `g1`. In general, when we say some code is *functional*, we mean that
it depends only on its arguments, not on external state (like `glob`) or
even internal state (its prior history of executions). We'll return to
this later.

Function `f1` is just the `add` function; we might call `f2` the `add4`
function. Since functions are first-class objects in JavaScript, we can
dynamically create them and return them from functions.  So, the following
function can create functions like `add4`:

```javascript
var makeAdder = function (delta) {
    return function (x) { return x+delta; }
    };
var add4 = makeAdder(4);
alert(add4(3));
```

Now, what kind of function is `add4`? It's functional, in the sense that
its value only depends on its arguments, not on any global state
(certainly none that can change). Yet the code looks nearly the same as
`g1`.  What's the difference?  The difference is that the `glob` that `g1`
refers to is *global* and can change dynamically, while `delta` is a
*lexical* variable in the *environment* of the anonymous function returned
by `makeAdder`. That function includes both the function plus that bit of
environment, so it is a *closure*.

If you think about our earlier discussion of scopes and environments, the
environment of the anonymous function returned by `makeAdder` includes the
parameter `delta` and the `delta` continues to exist even though
`makeAdder` has returned. It continues to exist because the anonymous
function needs it. We say that the anonymous function has *closed* over
the name `delta`.  

## An Example: A Shopping Example

Let's see closures in action in a web page. Suppose we have a page that
has an item for sale, say apples, and it has an associated button that
increments a counter, updates a database, updates the web page and maybe
other things.  So, you write some code like this:

```
:::JavaScript
function updateAppleDatabase(n) {
    console.log("Apple Database updated with "+n);
}
```

<script>
function updateAppleDatabase(n) {
    console.log("Apple Database updated with "+n);
}
</script>


<div class="eg" id="apple-example"><form action="">
<p><output id="apple-clicks">0</output>
   Apples
   <button type="button" id="apple-button">click on Apples</button>
</p></form>
</div>

Here's the HTML code:

<pre id="apple-example_dst"></pre>
<script>$("#apple-example_dst").text($("#apple-example").html());</script>

And here's the JavaScript code:

<script id="apple-example-script">var appleClicks = 0;
$("#apple-button").click(function () {
    appleClicks++;
    updateAppleDatabase(appleClicks);
    $("#apple-clicks").html(appleClicks);
    });
</script>

<pre id="apple-example-script_dst"></pre>
<script>$("#apple-example-script_dst").text($("#apple-example-script").html());</script>

The event handler function we've written is not *functional* (it depends
on the global variable `appleClicks`). Nevertheless, the code works fine.

Next, we decide to add additional buttons for bananas, coconuts, dates,
eggplants, figs and the rest of the alphabet. Of course, we could
copy/paste the code above for each of our grocery items, but copy/paste
usually a bad idea. Duplicate code means that if we change our
implementation, we have to update all the copies of the original
implementation.

## Event Handler Maker

But how do we write a <q>generic</q> event handler? We could write a
function to make one. While we're at it, we'll make the
`updateAppleDatabase` function more generic.

<script>
function updateDatabase(item,n) {
    console.log(item+" database updated with "+n);
}
</script>


```javascript
function groceryClickHandlerMaker(item,outputId) {
    var counter = 0;
    return function () {
         counter++;
         updateDatabase(item,counter);
         $(outputId).html(counter);
         };
}
```

<script>
function groceryClickHandlerMaker(item,outputId) {
    var counter = 0;
    return function () {
         counter++;
         updateDatabase(item,counter);
         $(outputId).html(counter);
         };
}
</script>

How do we use the `groceryClickHandlerMaker`?  Here are two examples, where we
invoke the `groceryClickHandlerMaker` function to return a *closure* that
we then attach as the click handler.

<div id="fruit-example">
<form action="">
<p><output id="banana-clicks">0</output>
    Bananas
    <button type="button" id="bananas-button">click on Bananas</button>
</form>
<form action="">
<p><output id="coconuts-clicks">0</output>
    Coconuts
    <button type="button" id="coconuts-button">click on Coconuts</button>
</form>
</div>

<script class="eg" id="fruit2">
var gchm = groceryClickHandlerMaker;
$("#bananas-button").click(gchm("bananas","#banana-clicks"));
$("#coconuts-button").click(gchm("coconuts","#coconuts-clicks"));
</script>

Here's the JavaScript code:

<pre id="fruit2_dst"></pre>
<script>
$("#fruit2_dst").text($("#fruit2").text());
</script>

## Closure Variables

Let's look again at the `groceryClickHandlerMaker`:

```javascript
function groceryClickHandlerMaker(item,outputId) {
    var counter = 0;
    return function () {
         counter++;
         updateDatabase(item,counter);
         $(outputId).html(counter);
         };
}
```

What variables does it close over? It closes over every variable that is
not defined within the function. Here there are three:

1. `item`
1. `outputId`
1. `counter`

The first two closure variables won't change ever, so the JavaScript
engine can really just substitute the values as static constants. The
counter, however, is interesting, because it's updated by the closure
invocation, which means that the closure isn't *functional* in the
technical sense of its behavior only depending on its arguments. Its
behavior depends on how many times its been executed before.

## Namespaces

Some very cool properties of the `counter` variable used by the click
handlers above are that

1. there are several of these variables, one for each handler
1. they all have the same name, but
1. they are all completely unrelated, and
1. they are all completely private

Think about that last property for a moment: each click handler has its
own private state variable. (This should remind you of instance variables
in object-oriented programming.)  Indeed, each closure has its own private
*namespace*.

What's a namespace?  In general, a namespace is a mapping from names
(symbols) to values. You can think of the names as variables, as we will
here, since in JavaScript we can assign a function to a
variable. Namespaces are important in programming because they help us
avoid name *collisions*.  For example, many years ago, I was doing some
graphics programming and I has some variables that stored the hex codes for
various colors:

```
var red = 0xff0000;
var white = 0xffffff;
var tan = 0xd2b48c;
var teal = 0x00ffff;
...
```

I also needed to compute the tangent of an angle:

```javascript
var tan_theta = tan(theta);
```

I'm embarrassed to admit that it took me *hours* to understand why the
tangent function wasn't working. The problem was a name collision: I had
only one namespace, so `tan` could only have one value.

In JavaScript, the `tan` function is safely in the `Math` object and so we
say `Math.tan` to use it.  The `Math` object gives us a kind of namespace.
We could create one for Colors very easily in JavaScript using objects:

```javascript
var Colors = {};
Colors.red = 0xff0000;
Colors.white = 0xffffff;
Colors.tan = 0xd2b48c;
Colors.teal = 0x00ffff;
```

We can put functions in the object as well, like the `tan` function is in
`Math`. Suppose we had a function `lighten` and we didn't want to clutter
up the global namespace with it. We could put it in `Colors`:

```javascript
Colors.lighten = function (color) { ... };
```

This technique is very common in JavaScript programming.  Another, even
more common, is to use functions.

## Functions as Namespaces

Let's take a very abstract example so that the details of the code don't
confuse the issue.  Suppose we want to have a bunch of global variables
and functions with short, succinct names for brevity.  The functions might
be mutually recursive, might refer to the globals, and so forth. After all
those definitions, the thing we actually want to do is compute `f(1)` and
insert the result into page . Our code might look like this:

```javascript

var a = 123;

var b = 456;

var f = function (n) { ... g(a*n); ... };

var g = function (x,y) { ... f(b*x)+f(b*y)...; }

$("#ans").html(f(1));
```

This code would work, but it would not be good software engineering,
because of the potential for namespace conflicts. So, we can just make all
these variables be *local* variables of a new, anonymous function that we
will immediately execute.

```
:::javascript
(function () {

     // code from above

})();
```

Notice that the function expression is wrapped in parentheses: that's
necessary so that it won't be treated as just a top-level function
definition. The parenthesized function expression is then followed by a
pair of empty parentheses which causes the function to be invoked. This is
called an Immediately Invoked Function Expression or IIFE. Wikipedia has
more about [Immediately Invoked Function
Expressions](https://en.wikipedia.org/wiki/immediately-invoked_function_expression).

Using an IIFE means that *no* names are added to the global namespace, so
the code has no footprint at all. (The <q>footprint</q> of code is the set
of names that are added to the global JavaScript namespace.)

