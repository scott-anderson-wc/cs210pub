# Introduction to JavaScript

We have a variety of prior experience with JavaScript, so if some of this is too easy for you, do let me know, but please be patient.

## Outline

1. Quiz questions [//]: # (15 minutes)
1. Exercise 1: math functions  [//]: # (10 minutes)
1. Exercise 2: Curried functions
1. Exercise 3: Arrays and Loops
1. Exercise 4: Sorting Arrays

## Quiz Questions

[your questions](../quizzes/quiz05.html)

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

```y = m x + b```

Test it with m=2, b=1, x=3.

<div class="hidden_from_student">
function line(m, x, b) {
    return m * x + b;
}
</div>

Write a function named `parabola` that takes four arguments and implements a quadratic function like this:

```y = a x^2 + b x + c```

Test it with a=2, b =3, c=5 and x=-1

<div class="hidden_from_student">
function parabola(a, b, c, x) {
    return a * x *x + b * x + c;
}
</div>

Write a  recursive function named `choose` that takes two arguments and implements n choose k like this:

```
f(n,k) = f(n-1,k)+f(n-1,k-1) if n>1
f(n,1) = n
f(n,0) = 1
f(n,n) = 1
```

<div class="hidden_from_student">
function choose(n,k) {
    if( k == n || k == 0 ) return 1;
    if( k == 1 ) return n;
    return choose(n-1,k) + choose(n-1,k-1);
}
</div>

## Debugging with breakpoints

I'll take you through debugging the `choose` function using the Chrome debugger and stepper.

Try `choose(3,4)`



## Currying

