# OOP in JS

Our main goal for today is making sure everyone feels comfortable and
prepared for the midterm. If we have to put everything off until next
week, so be it.

## Plan

1. Return assignment 4
1. Answer questions about assignment 5
1. Describe assignment 6
1. Hand out solutions to prior assignments
1. Review solutions of prior assignments
1. Answer any other questions you have
1. Discuss OOP in JS
1. Chapter 8 activity

## Assignment 4 (Rock Paper Scissors)

It's a good idea to write testing functions, even if we don't make you.

We won't dock points this time, but we will occasionally require it in the
future, with notice.  It's a good habit.

## Assignment 5 (Sliding Tiles)

[Sliding Tiles](../../assignments/a05/tile_game.html)

I'll demo this.  Also:

* you should make functions that are easy to test in the JS console
* you should always define testing functions when it makes sense to do so

## Assignment 6 (Concentration)

[Concentration](../../assignments/a06/concentration.html)

I'll demo it.

## Review solutions to prior assignments

## Example of OOP in JS 

Let's see an example using JS:

<script id="bank1">
function Account(init) {
    this.balance = init;
}

Account.prototype.deposit = function (amount) {
    this.balance += amount;
};

Account.prototype.withdrawal = function (amount) {
    if( this.balance >= amount ) {
        this.balance -= amount;
    } else {
        throw new Error("Sorry, you are overdrawn");
    }
};

var harry = new Account(1000);
var ron = new Account(2);

</script>

<pre id="bank1-src"></pre>
<script>$("#bank1-src").text($("#bank1").text());</script>

Let's try it out in the JS console!

## OOP in JS

What we saw above:

### Constructors

* Create a constructor function (really, it's an initializer)
* By convention, name it with a capital letter
* It can access `this`
* No return value

### Instance Variables

* are properties of `this`
* can be modified like any object property

As an aside:

* ideally, should not be used outside the object, but
* JavaScript doesn't have that abstraction barrier, though
* if every object were a closure, it would

### Methods

* functions that are stored in `Foo.prototype`
* can reference `this` to refer to the object

## Exercise 1

Write code to add a method that will add `x` percent interest to an
account. Name it `addInterest`.

<div class="solution">
<pre>
Account.prototype.addInterest =
    function (x) { this.balance += x*this.balance; };
</pre>
</div>

## Summary

* OOP involves constructors, methods, and instances

Good luck on the midterm!

