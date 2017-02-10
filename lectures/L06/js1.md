# Introduction to JavaScript

We have a variety of prior experience with JavaScript, so if some of this is too easy for you, do let me know, but please be patient.

## Outline

1. Quiz questions
1. Exercise 1: math functions
1. Exercise 2: Debugging
1. Exercise 3: Arrays and Loops
1. Exercise 4: Sorting Arrays

## Quiz Questions

[your questions](../quizzes/quiz05.html)

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

* The "immediate" tab on the lower part of the page is a perfect sandbox. You can make if full-screen
* You can also use the console in the Chrome Dev Tools (or equivalent in Firefox)
* The console is nice for trying functions defined by a web page

1. Open your class workspace and create a folder named `js1`
1. Create a file stuff.html that has a `script` tag that loads `stuff.js`
1. Create a `stuff.js` file that just contains `console.log("loaded");`
1. See that this works.

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

Write a function named `parabola` that takes four arguments and implements a quadratic function like this:

```
y = a x^2 + b x + c
```

Test it with a=2, b =3, c=5 and x=-1

<div class="solution">
<pre class="codehilite"> 
function parabola(a, b, c, x) {
     return a * x *x + b * x + c;
}
</pre>
</div>

Write a  recursive function named `choose` that takes two arguments and implements n choose k like this:

```
f(n,k) = f(n-1,k)+f(n-1,k-1) if n>1
f(n,1) = n
f(n,0) = 1
f(n,n) = 1
```

<div class="solution"> 
<pre class="codehilite"> 
function choose(n,k) {
    if( k == n || k == 0 ) return 1;
    if( k == 1 ) return n;
    return choose(n-1,k) + choose(n-1,k-1);
}
</pre>
</div>

## Debugging with breakpoints

I'll take you through debugging the `choose` function using the Chrome debugger and stepper.

I'll invoke `choose_v1(3,4)` in my public workspace and we'll see how it works.

You can then do the same.

l## Local Variables

Write a function that takes three arguments: the subtotal of the restaurant bill, the tax rate, and a string describing the service (great or not). It should compute and return the total bill.

We'll look at my `total_bad` function. Why is it bad?

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

## Arrays

 ```
:::JavaScript
var primes = [ 2, 3, 5, 7 ];
console.log(primes[0]);
primes[4] = 11;
tconsole.log(primes.length);
```

## Loops

A lot like loops in C.

```
:::JavaScript
sfor( var i = 0; i < 10; i ++ ) {
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

## Functions as arguments.

Write a function `computeCurve` to compute a math function on an array of inputs.

<div class="solution">
<pre class="codehilite"> 
function computeCurve(domain, func) {
    var range = [];
    for ( var i = 0; i < domain.length; i++ ) {
        range[i] = func(domain[i]);
    }
    return range;
}
</pre>
</div>

Let's create functions `line23` and `curve234` and use them with this
function:

<div class="solution">
<pre class="codehilite">
function line23(x) {  return line(2,x,3); }

function curve234(x) { return parabola(2,3,4,x); }
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

* negative if the first arg is less than the second
* zero if they are equal
* positive if the first is greater than the second

```
nums2.sort( function (a,b) { return b-a; } );
nums2.sort( function (a,b) { return a-b; } );
```



