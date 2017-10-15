# Closures and Namespaces

If today doesn't blow your mind, you either already know closures or you
fell asleep. 

## Plan

1. Describe and demo assignment 4
1. Discuss Closures
1. Quiz questions
1. Discuss Modules
1. Discuss Namespaces
1. Activity (maybe)
1. Solution to Assignment 3 (Zodiac)
1. Bring questions on Tuesday!

## Closures

Fundamental ideas for closures:

1. Scope (visibility) of variables
1. Global variables, local variables, non-local variables
1. Environments can *nest*
1. Functions have access to all the nested environments
1. Variables in inner environments can *shadow* variables in outer ones
1. Functions that are returned from a nested environments *may* continue
to refer to variables in those environments. Such functions are known as
*closures*

## Why does it matter?

* Closures are really cool
* You can build an astonishing variety of
things from closures. For example, you can build OOP. The closure variables are the instance variables, and they are absolutely secure.
* You can build things like modules out of closures.
* Closures naturally arise in programming with callbacks

## Closures in Ottergram

Here's their code to attach an event handler to a thumbnail in Ottergram
(page 127):

<style>
span.em { font-style: italics; color: red; }

</style>

<div class="codehilite">
<pre class="prettyprint lang-js">
function addThumbClickHandler(<span class="em">thumb</span>) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(<span class="em">thumb</span>);
    });
}
</pre>
</div>

The anonymous function that handles the event is a *closure*. We need to
understand this.  For example, when the click happens, the function that
is executed is:

<div class="codehilite">
<pre class="prettyprint lang-js">
function (event) {
    event.preventDefault();
    setDetailsFromThumb(<span class="em">thumb</span>);
}
</pre>
</div>

What's the value of `thumb`??? It *should* be the value of `thumb` from
`addThumbClickHandler`, but that function is long gone.

Note that anonymity is not the problem. Here's a named event handler; it's
*also* a closure:

<div class="codehilite">
<pre class="prettyprint lang-js">
function addThumbClickHandler(thumb) {
    'use strict';
    function handler(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
    }

    thumb.addEventListener('click', handler);
}
</pre>
</div>

Again, here's the executed function, deprived of its lexical context:

<div class="codehilite">
<pre class="prettyprint lang-js">
function handler (event) {
    event.preventDefault();
    setDetailsFromThumb(<span class="em">thumb</span>);
}
</pre>
</div>

* the `thumb` variable is non-local to the event handler.
* It's also not global, so
* the environment has to continue to exist so that,
* later, when the handler runs,
* it still knows what `thumb` is.

Lyn Turbak describes this as an <q>umbilical cord</q> that the closure has
back to its birth environment. I really like that metaphor.

## Review Reading

We'll return to the reading on
[closures](../../reading/closures-and-namespaces.html) and make sure all
that material is clear.

## Questions from last night

[questions](../../quizzes/quiz10.html)

## Pitfalls

It's really easy to make mistakes with closures, and the mistakes can be
hard to debug.  Here's one that really happened:

```
:::JavaScript
var nodeList = document.querySelectorAll("#listA > li");
// add click handlers to every element of a list
for( var i = 0; i < nodeList.length; i++ ) {
    var node = nodeList[i];
    node.addEventListener('click', 
                          function (event) {
                               alert('clicked on element '+i);
                          });
}
```

What goes wrong?  Here it is in action:

<div>
<ol id="listA">
   <li>Harry</li>
   <li>Ron</li>
   <li>Hermione</li>
</ol>
<script>
(function () {
    var nodeList = document.querySelectorAll("#listA > li");
    // add click handlers to every element of a list
    for( var i = 0; i < nodeList.length; i++ ) {
        var node = nodeList[i];
        node.addEventListener('click', 
                              function (event) {
                                   alert('clicked on element '+i);
                              });
    }
})();    
</script>
</div>

Hunh? What's going on?

## Diagnosis

* The handler is a closure over the `i` variable.
* But there's only one handler, and
* it's added to all three elements.
* Therefore, they all do the same thing.

## Remedy

* We have to *create* a *new* closure for each element
* One way is to close over a *new* variable each time by invoking a separate function, as with `addThumbClickHandler`
* A way to do that is with a function that returns a function (like `makeAdder`)

Let's see the second way:

<div>
<ol id="listB">
   <li>Harry</li>
   <li>Ron</li>
   <li>Hermione</li>
</ol>
<script id="listB-script">
(function () {
    var nodeList = document.querySelectorAll("#listB > li");
    function makeHandler(i) {
         // no line break after return!!
         return function (event) {
                    alert('clicked on element '+i);
                 };
    }

    // add click handlers to every element of a list
    for( var i = 0; i < nodeList.length; i++ ) {
        var node = nodeList[i];
        node.addEventListener('click', makeHandler(i));
    }
})();    
</script>
</div>

Here's the code:

```
:::JavaScript
var nodeList = document.querySelectorAll("#listA > li");
// add click handlers to every element of a list
for( var i = 0; i < nodeList.length; i++ ) {
    var node = nodeList[i];
    function makeHandler(i) {
         // no line break after return!!
         return function (event) {
                    alert('clicked on element '+i);
                 };
    }

    node.addEventListener('click', makeHandler(i));
}
```

Note that, this time, the argument to `addEventListener` is a function
invocation and we have parens after it. That's because we invoke it and
*it* returns a *handler*.

## Modules

Modules are a really important idea in all complex programming. It's
really part of *divide and conquer*: in particular it allows you to truly
*divide* the problem into separate components. Here's an example:

<figure>
   <img src="modules.svg" alt="a program with two supporting modules">
   <figcaption>a program with two supporting modules</figcaption>
</figure>

It doesn't matter whether this is Java code or Python code or some other
programming language that has a civilized module system.

However, imagine that it's Python code, where it's possible to do:

```
:::Python
from Math import *
from Colors import *
```

What goes wrong? In this case, the `main` module has all the names from
all three boxes above and the result is chaos, because both supporting
modules used the `tan` name. But in one namespace, there can be only
one meaning for any name.

What's the solution?  *Don't* do `from module import *` (unless you know
what you're doing). Pay the price of prefixing names with their module.

## Modules in JavaScript

Unfortunately, JavaScript doesn't have a module system like Python or
Java. There is only one namespace. It's as if every file is loaded with
`from file import *`.

However, the *effect* of namespaces can be achieved by clever use of
objects (dictionaries), functions and closures.  Here's the behavior we
want:

* a private namespace where new names can be created that don't affect
  other namespaces
* a way to "export" certain names from the namespace, so that external
  "clients" can use them (such as referring to values or invoking
  functions)

## Namespaces

To achieve a private namespace, we can use functions, since every function
defines a local namespace.

The basic idea is to use an anonymous function to create a local
environment, and then immediately invoke it in order to run the code.  So
instead of this:

```
:::JavaScript
x = 3;
y = 4;
function hyp(a,b) {
    return Math.sqrt(a*a+b*b);
}
z = hyp(x,y);
alert('hypotenuse is '+z);
```

which creates global names `x`, `y`, `hyp` and `z` (its *footprint*), we
instead do:

```
:::JavaScript
(function () {
    x = 3;
    y = 4;
    function hyp(a,b) {
         return Math.sqrt(a*a+b*b);
    }
    z = hyp(x,y);
    alert('hypotenuse is '+z);
})();
```

This code has no footprint at all!

The one downside is that it makes things harder to debug in the JS
console. I literally can't access any of these symbols.

## Objects

The downside of the above technique is that it can be *too* private. The
variables `x`, `y`, and `z` are private, but so is `hyp`. So, how can we
do that?  We can do that with objects (as dictionaries). Here's a way:

```
:::JavaScript
var colors = (function () {
     var namespace = {};

     namespace.red = 0xff0000;
     namespace.tan = 0xd2b48c;
     ...

     return namespace;
})();
```

After that code runs, the `colors` variable contains an object that has
the properties named `red` and `tan`, etc. Just like our Python module!

## Renaming Names

By W3C fiat, every browser implementation of JavaScript is supposed to
have a global variable named `window` that contains an object. (Properties
of that object are, in fact, global varibles, so it's the default
namespace.)

It's often useful to refer to that variable, but what if we want to write
code that can run in non-browser implementations of JavaScript? We could
do a global search-and-replace of `window` with `othername`, but that
would be a nightmare. Instead, we can use the power of function
parameters.  Here's an example:

```
:::JavaScript
(function (window) {
     // use the global value if it exists,
     // otherwise, create a new, empty object
     var App = window.App || {};

     ...
})(othername);
```

Inside the IIFE, we can use the `window` name, and when we invoke it with
the `othername` variable, the operations all happen to `othername`. It's
like magic!

But what if the code is running in a browser, where we want to use
`window` instead of `othername`?  In that common case, we end up with the
following counterintuitive code:

```
:::JavaScript
(function (window) {
     // use the global value if it exists,
     // otherwise, create a new, empty object
     var App = window.App || {};

     ...
})(window);
```

So, the function invocation will bind the local name `window` to the value
of the global variable (name) `window`.

Your book does this a lot. Don't let it confuse you!

## Activity

If we get this far, start setting up the CoffeeRun app. Start on page
168. You'll only do the following:

1. Create the necessary folder, `coffeerun`
1. Create the `index.html` file
1. Put the basic contents in, including loading the `scripts/datastore.js`
file
1. Create the `scripts` folder and the `datastore.js` file
1. Write the contents of the `datastore.js` file (see page 171)
1. Run the HTML file and open the JS console.
1. Try some of their test code (bottom of page 172)

## Zodiac Solution

Here's my [solution](../../solutions/a03/)

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement
