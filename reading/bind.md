# Constructors, this, Methods and Bind

This reading is supplemental to Chapter 8 (page 183 to the end).

<script src="bank-account-with-owner.js"></script>

## Invoking a Constructor

As you know, a constructor should be invoked with the keyword `new` in
front of it. Like this (this version of bank accounts require specifying
the owner) invocation:

```
var george = new Account("george",500);
```

The `new` keyword causes a new, empty, object to be created, with
its prototype set to the `prototype` property of the constructor. 

What happens if we forget the `new`?  Open up a JS console and try the
following:

```
var fred = Account("fred",500);
```

Print the value of `fred`. Print the value of `balance`

What happened?

The `fred` variable is undefined, because `Account` returns no value, and
`balance` is a new global variable, because `this` meant the global object
(essentially, `window`).

All because we forgot the `new` keyword!

If you want to protect against this error, make your constructor like
this:

```
:::JavaScript
function Account(init) {
    if( this === window ) {
        throw new Error("you forgot the 'new' keyword");
    }
    this.balance = init;
}
```

## Basic Method Invocation

As we saw earlier, methods have an extra input value, namely the
object. Here's the example:

```
:::JavaScript
function Foo(z) {
    this.z = z;
}

Foo.prototype.sum = function (x,y) { return x+y+this.z; };

var f1 = new Foo(1);
f1.sum(2,3);   // returns 6
```

The syntactic rule is that the special variable `this` gets bound to the
object, which is the thing to the left of the dot.

## Method Invocation Bug

Here's a way that method invocation can get messed up. Imagine we add a
method to our bank account that will help us set up a donation button on a
page. That is, it'll add an event handler to the button that will deposit
10 galleons into the account. Here's our attempt:

<script id="script_adh">
Account.prototype.add_donation_handler = function (buttonId) {
    console.log("Adding click handler to "+buttonId);
    console.log("Starting balance is "+this.balance);
    $("#"+buttonId).click( function () {
        console.log("thanks for clicking on "+buttonId);
        console.log("10 galleons will be deposited into "+this);
        this.deposit(10);
        alert("account balance is now "+this.balance);
    } );
};
</script>

<div class="codehilite"><pre id="pre_adh"></pre></div>

Here's the button and its code:

<div id="div_button"><button id="help_ron">Help Ron</button></div>
<div class="codehilite"><pre id="pre_button"></pre></div>

<script id="script_ron">
ron.add_donation_handler('help_ron');
</script>

Here's the code to add a button handler to help Ron:

<div class="codehilite"><pre id="pre_ron"></pre></div>

<script>
$("#pre_adh").text($("#script_adh").text())
$("#pre_button").text($("#div_button").html())
$("#pre_ron").text($("#script_ron").text())
</script>


Try it! Click the button to help Ron, and look in the JS console at the
error message. In the event handler, the value of `this` is the button
element that was clicked on, *not* the value it had in the
`add_donation_handler` method (namely, Ron's bank account).

## Closures to the Rescue

Hang on, isn't the event handler actually a *closure*? Yes, it is. It has
two non-local variables, namely `buttonId` and `this`.  The `buttonId`
variable has its proper value, but not `this`.

That's because `this` is special: It isn't closed over.

However, almost any other variable can be closed over. Traditionally,
JavaScript programmers use the variable `that`. Here's an example:

<script id="script_adh2">
Account.prototype.add_donation_handler_that = function (buttonId) {
    console.log("Adding click handler to "+buttonId);
    console.log("Starting balance is "+this.balance);
    var that = this;
    $("#"+buttonId).click( function () {
        console.log("thanks for clicking on "+buttonId);
        console.log("10 galleons will be deposited into "+that);
        that.deposit(10);
        alert("account balance is now "+that.balance);
    } );
};
</script>

<div class="codehilite"><pre id="pre_adh2"></pre></div>

Here's the button and its code:

<div id="div_button2"><button id="help_ron2">Help Ron Again</button></div>
<div class="codehilite"><pre id="pre_button2"></pre></div>

<script id="script_ron2">
ron.add_donation_handler_that('help_ron2');
</script>

Here's the code to add a button handler to help Ron:

<div class="codehilite"><pre id="pre_ron2"></pre></div>

<script>
$("#pre_adh2").text($("#script_adh2").text())
$("#pre_button2").text($("#div_button2").html())
$("#pre_ron2").text($("#script_ron2").text())
</script>

## The `bind` method

The need for the `that` trick is so common that JavaScript added a method
to the language to solve it in a general way, without tricks like `that`.

If I take any function and invoke the `bind` method on it, it returns a
new function that has the given value as the value of `this`.  Here's an
example:

```
:::JavaScript
f = function () { this.deposit(10); };

g = f.bind(ron);
```

If you invoke `f`, you'll get an error, because `this` has no value. If
you invoke `g` it'll successfully add 10 to Ron's bank account.

Try it in a JavaScript console! Copy/paste the definitions of `f` and `g`
and then invoke them.

Go back and compare `f` with the event handler in `add_donation_handler`,
you'll see that they are the same (if you remove all the `console.log` and
`alert` statements).  So the `bind` method will solve our trouble without
having to use `that`. Here's how:

<div class="codehilite">
<pre>
Account.prototype.add_donation_handler_bind = function (buttonId) {
    console.log("Adding click handler to "+buttonId);
    console.log("Starting balance is "+this.balance);
    $("#"+buttonId).click( function () {
        console.log("thanks for clicking on "+buttonId);
        console.log("10 galleons will be deposited into "+this);
        this.deposit(10);
        alert("account balance is now "+that.balance);
    }.bind(this) );
};
</pre></div>

## The Bug from Chapter 8

Our book created a common and tricky bug to illustrate this subtle issue
with `this` and method invocation. They did an excellent job of setting up
the bug and motivating the use of `bind` in only a few lines of code.
We'll go over it in class.

