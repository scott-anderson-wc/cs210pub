# Objects 

## Plan

1. Describe and demo assignment 5
1. Address questions on Closures and Namespaces
1. Activity from Chapter 8
1. Discuss solution to assignment 3

## Assignment 5 (Sliding Tiles)

[Sliding Tiles](../../assignments/a05/tile_game.html)

I'll also demo this.

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

```
:::JavaScript
function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
    });
}
```

The anonymous function that handles the event is a *closure*. We need to
understand this.  For example, when the click happens, the function that
is executed is:

```
:::JavaScript
function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
}
```

Note the anonymity is not the problem. Here's a named event handler; it's
*also* a closure:

```
:::JavaScript
function addThumbClickHandler(thumb) {
    'use strict';
    function handler(event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
    }

    thumb.addEventListener('click', handler);
}
```

Again, here's the executed function, deprived of its lexical context:

```
:::JavaScript
function handler (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
}
```

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

Note that, this time, the argument to `addEventHandler` is a function
invocation and we have parens after it. That's because we invoke it and
*it* returns a *handler*.

## Namespaces

The basic idea is to use an anonymous function to create a local
environment, and then immediately invoke it in order to run the code.  So
instead of:

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

We do:

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

The one downside is that it makes things harder to debug in the JS
console. I literally can't access any of these symbols.


## Chapter 8 Activity

Go! Do this!  You won't need a starting point this time, since we start from scratch in CoffeeRun

## Code review

We'll look at the solution to Chapter 8

## Assignments 3 and 4

I'll go over the solutions

