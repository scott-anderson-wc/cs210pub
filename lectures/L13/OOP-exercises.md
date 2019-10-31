# OOP Exercises

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

