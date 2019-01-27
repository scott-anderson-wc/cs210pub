# Review

Our main goal for today is making sure everyone feels comfortable and
prepared for the midterm. If we have to put everything off until next
week, so be it.

## Plan

1. Admin
1. Hand out and Review solution to assignment 4
1. Describe assignment 5
1. Review solutions of prior assignments
1. Answer any other questions you have
1. Discuss OOP in JS
1. Discuss `bind` (if time)
1. Chapter 8 activity (if time)

## Assignment 4 (Rock Paper Scissors)

It's a good idea to write functions so that they can be tested in the
JavaScript console.

[my solution to RPS](../../solutions/a04/rps.html)

## Assignment 5 (Sliding Tiles)

This isn't due until a week from Tuesday, but you'll want to get started
on it after the midterm, so I will introduce it now.

[Sliding Tiles Assignment](../../assignments/a05/tile_game.html)

I'll demo my solution:

[Sliding Tiles Demo](../../solutions/a05/tile_game.html)

Also:

* you should make functions that are easy to test in the JS console
* you should always define testing functions when it makes sense to do so

## Exam Constraints

**Allowed Resources:** This is exam is *open book and open notes*.  You
may not use a computer or cell phone or calculator or any electronic
device except as a copy of our textbook.


## Your Questions

I'll answer for as long as necessary:

[quiz questions](../../quiz/review.html)

## Some Topics

* function definitions
* anonymous functions
* conditionals
* loops
* arrays
* `.forEach(function (elt) {})` method on arrays
* date objects and methods
* DOM
* jQuery
* finding nodes: `document.querySelectorAll(sel)` or `$(sel)`
* getting an attribute: `node.getAttribute(name)` or `$().attr(name)`
* setting an attribute: `node.setAttribute(name,val)` or `$().attr(name,val)`
* using `data-` attributes
* setting text: `node.textContent = str` or `$().text(str)`
* setting html: `node.innerHTML = str` or `$().html(str)`
* creating new structure: `*complex*` or `$(str)`
* changing CSS `node.style.*cssProp* = val` or `$().css(prop,val)`
* adding/removing classes: `node.classList.add(name)` or `$().addClass(name)`
* attaching click event handlers `node.addEventListener('click',func)` or
`$().click(func)` or `$().on('click',func)`
* attaching a keyboard event handler:
`document.body.addEventListener('keyup', func)` or
`$('body').on('keyup',func)`
* namespaces
* IIFEs
* closures
* OOP
* defining a constructor
* defining a method
* using `prototype`
* using `this`
* creating an instance using `new`
* invoking a method

## Review solutions to prior assignments

Only if desired

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
var hermione = new Account(300);
</script>

<div class="codehilite"><pre id="bank1-src"></pre></div>
<script>$("#bank1-src").text($("#bank1").text());</script>

Let's try it out in the JS console!

## OOP Exercises

We'll do these if there is time.

## Account Owner

Add an "owner" to the account. Make `type` default to "savings" and `init`
default to zero. Use it to redefine Harry's, Ron's and Hermione's accounts.

<script id="Account2_script">
function Account(owner, type, init) {
    this.owner = owner;
    this.type = type || "savings";
    this.init = init || 0;
}

var harry = new Account("Harry Potter","savings",1000);
var ron = new Account("Ron Weasley","savings",2);
var hermione = new Account("Hermione Granger","savings",300);
</script>

<div class="solution">
<p>Here's one way:
<div class="codehilite">
<pre id="Account2_pre">
</pre>
</div>
</div>

<script>$("#Account2_pre").text($("#Account2_script").text());</script>

## Printing

Is there a `.toString()` method for accounts? What does it do?

Define a `toString()` method for an account. test it

<div class="solution">
<p>Here's one way:
<div class="codehilite">
<pre>
Account.prototype.toString =
    function () {
        return "Account("+this.owner+","+this.type+","+this.balance+")";
        };

console.log(hermione.toString());
</pre>
</div>
</div>

## Numbered Accounts

Each account should have a unique number or ID. Implement that.

<div class="solution">
<p>Here's one way:
<div class="codehilite">
<pre>
var accountNumber = 0;

function Account(owner,type,init) {
    this.number = ++accountNumber;
    this.owner = owner;
    this.type = type || "savings";
    this.init = init || 0;
}
</pre>
</div>
</div>

## List of Accounts

How could we keep a global list of accounts?  Implement that.

<div class="solution">
<p>Here's one way:
<div class="codehilite">
<pre>
var allAccounts = [];

function Account(type,balance) {
    this.owner = owner;
    this.type = type || "savings";
    this.init = init || 0;
    allAccounts.push(this);
}
</pre>
</div>
</div>

## Processing Accounts

Define a function to add interest to all the savings accounts.

<div class="solution">
<p>Here's one way:
<div class="codehilite">
<pre>
function addInterest(rate) {
    allAccounts.forEach(function (acct) { acct.addInterest(rate); });
}
</pre>
</div>
</div>

## Chaining

If we have time, let's look at chaining.  Imagine that we have a series of
transactions we need to do. (Maybe these should be changes to house points).

```
:::JavaScript
hermione.deposit(100);
hermione.deposit(200);
hermione.withdrawal(150);
hermione.addInterest(0.1);
```

Fine, but a little tedious. Wouldn't it be nice to chain them together, like this:

```
:::JavaScript
hermione.deposit(100)
        .deposit(200)
        .withdrawal(150)
        .addInterest(0.1);
```

How could we implement that?

<div class="solution">
<p>Make sure each method returns <code>this</code>.  For example:</p>
<div class="codehilite">
<pre>
Account.prototype.deposit = function (amount) {
    this.balance += amount;
    return this;
}    
</pre>
</div>
</div>

## Conclusion

Objects often don't seem worthwhile, but taking the time to implement an
abstraction layer often pays off in unforeseen ways.

There was a story I heard where an AI system didn't get an innovation
implemented because they couldn't tell the difference between accessing
the first element of a list as a field accessor (method) versus other
kinds of list processing.

## Understanding `bind`

We'll switch to this [reading on bind](../../reading/bind.html)

## Chapter 8 code

[The final code](../../front-end-dev-resources/book-solutions/Chapter-08/coffeerun/index.html)

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

## Finally

Good luck on the midterm!

