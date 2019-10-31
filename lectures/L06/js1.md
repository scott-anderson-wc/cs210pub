# Introduction to JavaScript

We have a variety of prior experience with JavaScript, so if some of this is too easy for you, do let me know, but please be patient.

## Outline

1. Quiz questions
1. Exercise 1: math functions
1. Exercise 2: Debugging
1. Exercise 3: Arrays and Loops
1. Exercise 4: Sorting Arrays

## Quiz Questions

[your questions](../../quizzes/quiz05.html)

## Quick Review

```
:::JavaScript
function foo(a,b) {
    var x = a+b;
    if( a > b ) {
        return x;
    } else {
        return b-a;
    }
}
```

* `function` is a reserved word to define a function
* params in parens. No need for datatypes
* braces around blocks of code
* `var` for declaring variables
* `if` for conditionals. Expression must be in parens.
* `return` to return a value

## Running JS

* You can also use the console in the Chrome Dev Tools (or equivalent in Firefox)
* The console is nice for trying functions defined by a web page

1. Open your `cs204` folder
1. `cp -r ~cs204/pub/lectures/L06/js1a .`
1. Edit the `stuff.js` file so that it just contains `console.log("loaded");`
1. Visit the `stuff.html` file in a browser
1. Open the JS console in the page
1. See the `loaded` message

Here is [mine](js1a/stuff.html)

## Exercise 1

Write a function named `line` that takes three arguments and implements a linear function like this:

```
y = m x + b
```

Test it with m=2, b=1, x=3.

<div class="solution">
<pre class="codehilite"> 
function line(m, x, b) {
    return m * x + b;
}
</pre>
</div>

Write a function named `parabola` that takes four arguments and implements
a quadratic function like this:

```
y = a x^2 + b x + c
```

Test it with a=2, b =3, c=5 and x=-1

<div class="solution">
<pre class="codehilite"> 
function parabola(a, b, c, x) {
     return a*x*x + b*x + c;
}
</pre>
</div>

## N Choose K

In combinatorics, we learn how to count things. For example, suppose I
have 28 people in this class, and I have to choose 3 of them for a
programming team. How many ways are there to do that? In general, how can
I choose K things from a set of N things?

One way is to think recursively. To choose 3 people from 28, let's
consider the first person in the class:

* If I choose them, I have to choose 2 people from the remaining 27.
* If I don't choose them, I have to choose 3 people from the remaining 27.

Those are all the possibilities, and they are mutually exclusive. So, one
way do compute Choose(N,K) is as follows (math notation):

```
Choose(N,K) = Choose(N-1,K-1) + Choose(N-1,K)
```

We have to think about the base cases as well. If N=K, we have to take all
the K of them, and there's only one way to do that, so

```
Choose(N,N) = 1
```

Similarly, if there no more people left to be chosen, there's exactly one
way to do that (no choices).

```
Choose(N,0) = 1
```

This is exactly how Pascal's triangle works.

## Combinatorics Exercise

Write a recursive function named `choose` that takes two arguments and
implements n choose k like this (math notation):

```
choose(n,k) = choose(n-1,k)+choose(n-1,k-1) if n>1
choose(n,0) = 1
choose(n,n) = 1
```

My solution:

<div class="solution"> 
<pre class="codehilite"> 
function choose(n,k) {
    if( k == n || k == 0 ) return 1;
    return choose(n-1,k) + choose(n-1,k-1);
}
</pre>
</div>

## Milestone 1

[js1b](js1b/stuff.html)

Feel free to copy my solution: `cp -r cs204/pub/lectures/L06/js1b .`

## Debugging with breakpoints

I'll take you through debugging the `choose` function using the Chrome
debugger and stepper.

I'll invoke `choose(4,3)` in my page and we'll see how it works.

You can then do the same.  Or use [mine](js1b/stuff.html)

Here's the basics of how to use the debugger:

* Open the developer tools
* switch to the `sources` tab
* choose `stuff.js`; this displays the code in the big panel
* click in the margin to the left of the line you'd like to set a breakpoint on
* switch back to the console and run the function
* the browser will stop just before the line you chose is executed
* you can look to the right to see the call stack, local variables, and more
* the buttons above that "state" pane allow you to resume execution, step over this function, and more


## Local Variables

Write a function that takes three arguments: the subtotal of the
restaurant bill, the tax rate, and a string describing the service (great
or not). It should compute and return the total bill.

We'll look at my `total_bad` function. 

<div class="solution">
<pre class="codehilite"> 
function total_bad(subtotal, rate, service) {
    tax = subtotal * rate;
    if( service == "great" ) {
        tip = subtotal * 0.2;
    } else {
        tip = subtotal * 0.15;
    }
    return subtotal + tax + tip;
}
</pre>
</div>

Why is it bad?
<div class="solution">
<p>
It's bad because it omits the <code>var</code> keyword
for <code>tax</code> and <code>tip</code> so it ends up creating global
variables.
</p>
</div>


## Arrays

Arrays are very easy in JS, very similar to Python's lists.

```
:::JavaScript
var primes = [ 2, 3, 5, 7 ];
console.log(primes[0]);
primes[4] = 11;
console.log(primes.length);
```

## Loops

A lot like loops in C.

```
:::JavaScript
for( var i = 0; i < 10; i ++ ) {
    console.log(i);
}
```

Write a function `range` to create an array from 1 to `n`; just like
Python's function.

<div class="solution">
<pre class="codehilite"> 
function range(n) {
    var nums = [];
    for( var i = 1; i <= n; i++ ) {
        nums[i-1] = i;
    }
    return nums;
}
</pre>
</div>

## Milestone 2

[js1c](js1c/stuff.html)

Feel free to copy my solution: `cp -r cs204/pub/lectures/L06/js1c .`

## Functions as arguments.

You can pass a function to another function and the callee can invoke the
argument. Passing functions as arguments is an important part of browser
programming, so understanding it is crucial.

```
:::javascript
function collatz(n) {
    if (n%2 == 0) {
        return n/2;
    } else {
        return 3*n+1;
    }
}

function ask_user(fun) {
     var input = prompt("what number do you want? ");
     var x = parseInt(input);
     var y = fun(x);
     alert("The answer is "+y);
}
```

Write a function `computeCurve` to compute a math function on an array of
inputs, returning an array of results.

<div class="solution">
<pre class="codehilite"> 
function computeCurve(inputs, func) {
    var outputs = [];
    for ( var i = 0; i < domain.length; i++ ) {
        outputs[i] = func(inputs[i]);
    }
    return outputs;
}
</pre>
</div>

Note that the new `.map()` method on JS Arrays does this in a convenient
way:

```
:::JavaScript
y_values = x_values.map(some_function)
```

## Milestone 3

[js1d](js1d/stuff.html)

Feel free to copy my solution: `cp -r cs204/pub/lectures/L06/js1d .`

## More Functions 

Let's create functions `line23` and `curve234` and use them with this
function:

<div class="solution">
<pre class="codehilite">
function line23(x) {  return line(2,x,3); }

function curve234(x) { return parabola(2,3,4,x); }

computeCurve( range(10), line23 );
computeCurve( range(10), curve234 );
</pre>
</div>

Alternatively, use an anonymous function:

<div class="solution">
<pre class="codehilite">
var f = function (x) { return line(2,x,3);};
computeCurve( range(10), f);

// maybe better:
computeCurve( range(10),
              function (x) { return line(2,x,3);} );
</pre>
</div>

There is, however, the <q>blizzard of punctuation</q> problem. That's an
advantage for arrow functions, which are syntactically nicer:

<div class="solution">
<pre class="codehilite">
var f2 = x => line(2,x,3)
computeCurve( range(10), f2);

// much better:
computeCurve( range(10),
              x => line(2,x,3) );
</pre>
</div>


## Search

Arrays can be searched:

```
var nums = [5, 4, 8, 9, 1, 7, 6, 3, 2 ];
nums.indexOf(8);
```

## Sorting

Arrays can be sorted using a built-in .sort() method.

```
var nums = [5, 4, 8, 9, 1, 7, 6, 3, 2 ];
nums.sort();
var nums2 = [ 1, 2, 3, 11, 22, 33 ];
nums2.sort()
```

By default, they are sorted as *strings*.

Optionally, you can supply a comparison function. The comparison
function must take two args and return

* negative if the first arg is less than the second (should be earlier)
* zero if they are equal
* positive if the first is greater than the second (should be later)

```
nums2.sort( function (a,b) { return b-a; } );
nums2.sort( (a,b) => b-a );
nums2.sort( (a,b) => a-b );
```

## Anonymous functions

They can do pretty much anything named functions do. They're convenient
when you need to create a function for a single purpose and not need to
refer to it from other places (so it doesn't need a name).  Constrast the
previous example with:

```
function diff(a,b) {
    return b-a;
}

nums2.sort(diff);
```

Similarly `line23` and `curve234` could have been anonymous functions.

## Milestone 4

[js1e](js1e/stuff.html)

Feel free to copy my solution: `cp -r cs204/pub/lectures/L06/js1e .`

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

<script>
var revealAt = "9/24/2019 5:00 pm";
</script>
