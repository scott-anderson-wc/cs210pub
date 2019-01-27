# OOP in JS + Forms

Today, we'll discuss how to do Object-Oriented Programming (OOP) in
JavaScript and conclude our activity from Chapter 8.

Next, we'll look at HTML forms, from Chapter 9.

## Plan

1. Discuss Modules in JS
1. Discuss OOP in JS
1. Discuss forms
1. Chapter 8 activity

## The App module from Chapter 8

```
:::JavaScript
(function (win) {
   'use strict';
   var App = win.App || {};

   function DataStore () {
      console.log('Constructing DataStore object');
      this.data = {};
   }

   DataStore.prototype.add = function (key, val) {
       this.data[key] = val;
   };

   App.DataStore = DataStore;  // put it in our app

   function Truck(truckId, db) {
       this.truckId = truckId;
       this.db = db;
    }

    Truck.prototype.createOrder = function (order) {
         this.db.add(order.emailAddress, order);
    }

   App.Truck = Truck;  // put it in our app

   win.App = App;   // store app globally
})(window);

var truck1 = new App.Truck('007',new App.DataStore());
truck1.createOrder({emailAddress: 'dr@no.com', coffee: 'decaf'});
truck1.createOrder({emailAddress: 'me@gold.com', coffee: 'mocha'});
truck1.createOrder({emailAddress: 'm@bond.com', coffee: 'earl grey'});
```

<script>
(function (win) {
   'use strict';
   var App = win.App || {};

   function DataStore () {
      console.log('Constructing DataStore object');
      this.data = {};
   }

   DataStore.prototype.add = function (key, val) {
       this.data[key] = val;
   };

   DataStore.prototype.getAll = function () {
       return this.data;
   };

   App.DataStore = DataStore;  // put it in our app

   function Truck(truckId, db) {
       this.truckId = truckId;
       this.db = db;
    }

    Truck.prototype.createOrder = function (order) {
         this.db.add(order.emailAddress, order);
    }

   App.Truck = Truck;  // put it in our app

   win.App = App;   // store app globally
})(window);

var truck1 = new App.Truck('007',new App.DataStore());
truck1.createOrder({emailAddress: 'dr@no.com', coffee: 'decaf'});
truck1.createOrder({emailAddress: 'me@gold.com', coffee: 'mocha'});
truck1.createOrder({emailAddress: 'm@bond.com', coffee: 'earl grey'});
</script>

## Questions

We'll look at [your questions](../../quizzes/quiz11.html)

## List of Accounts

How could we keep a global list of accounts?  Implement that.

<div class="solution">
<p>Here's one way:
<pre>
var allAccounts = [];

function Account(type,balance) {
   this.type = type;
   this.balance = balance;
   allAccounts.push(this);
}
</pre>
</div>

## Printing

Is there a `.toString()` method? What does it do?

Define a `toString()` method for an account. Print all the accounts.

<div class="solution">
<p>Here's one way:
<pre>
Account.prototype.toString = function () { return "Account("+this.type+","+this.balance+")"; };

allAccounts.forEach(function (acct) { console.log(acct.toString()); });
</pre>
</div>

## Processing Accounts

Define a function to add interest to all the savings accounts.

<div class="solution">
<p>Here's one way:
<pre>
function addInterest(rate) {
    allAccounts.forEach(function (acct) { acct.addInterest(rate); });
}
</pre>
</div>

## Activities

Let's proceed with the activities from Chapter 8

Next time, we'll review the code from Chapter 8 before we move on to Chapter 9

## Chaining

If we have time, let's look at chaining.  Imagine that we have a series of
transactions we need to do. (Maybe these should be changes to house points).

```
:::JavaScript
var hermione = new Account("savings",300);
hermione.deposit(100);
hermione.deposit(200);
hermione.withdrawal(150);
hermione.addInterest(0.1);
```

Fine, but a little tedious. Wouldn't it be nice to chain them together, like this:

```
:::JavaScript
var hermione = new Account("savings",300);
hermione.deposit(100)
        .deposit(200)
        .withdrawal(150)
        .addInterest(0.1);
```

How could we implement that?

<div class="solution">
<p>Make sure each method returns <code>this</code>.</p>
</div>

## Conclusion

Objects often don't seem worthwhile, but taking the time to implement an
abstraction layer often pays off in unforeseen ways.

There was a story I heard where an AI system didn't get an innovation
implemented because they couldn't tell the difference between accessing
the first element of a list as a field accessor (method) versus other
kinds of list processing.

## Forms

Tags to know:

* `form`  wrapper for all controls (inputs)
* `label` to label an input/control with some text
* `input`  most common, many varieties, including
    * text very common
    * button for actions
    * submit to send form data to server
    * reset to clear the form
    * radio to make a set mutually exclusive choices
    * checkbox to make a set of combinatorial choices
* `select` and `option` for menus
* `textarea` for long chunks of text

Attributes to know:

* `name` and `value`
* `id` and `for` (used by `label`)
* `type` for inputs
* `action` and `method` for `form` (later in the course)

## Pizza example

We'll look back at the example in the reading, to make sure it's clear

## Questions

We'll look at [your questions](../../quizzes/quiz12.html)

## Chapter 8 Activity

## Chapter 8 code

We'll look at the code that we constructed in Chapter 8
