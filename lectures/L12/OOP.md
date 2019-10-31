# OOP in JS

Today, we'll focus on how to do Object-Oriented Programming (OOP) in
JavaScript, as covered in Chapter 8.

We probably won't go past page 183.

## Plan

1. Discuss Modules in JS
1. Bank Accounts
1. OOP in JS
1. Your Questions
1. OOP Exercises
1. Objects as Database
1. APIs
1. Pitfalls of `this`

## The App module from Chapter 8 

You'll find this example on page 171. It has an odd trick in it.

```
:::JavaScript
(function (win) {             // line 1
   'use strict';
   var App = win.App || {};   // line 3

   function DataStore () {    // line 5
      console.log('running the DataStore function');
   }

   App.DataStore = DataStore;  // line 9

   win.App = App;   // line 11, store app globally
})(window);
```

How does the last line store the App globally?

* `win`, the argument on the first line, is a *local* variable
* `App` on the third line is a *local* variable
* The function on line 5 is a *local* variable
* The assignment on line 9 puts a local value into an attribute of a local value
* The assignment on line 11 puts a local value into an attribute of another local value

Nothing in there assigns to a global variable. So, how can that happen?

Copy/paste that code into a JS console and try it out!

## OOP in JS

Now, we'll switch to talking about OOP in JS.

* First, we'll see a practical example, to help make things concrete.
* Then we'll talk about some abstract principles

## Example of OOP in JS using new `class` syntax

Let's see an example using the new `class` syntax for OOP in JS, namely
bank accounts. Each bank account has

* *state*: the current balance for that account, and
* *behavior* (methods): the way that clients can change the balance, namely `deposit` and `withdrawal`

```
:::JavaScript
class Account {
    constructor (init) {
        this.balance = init;
    }
    function deposit (amount) {
        this.balance += amount;
    }
    function withdrawal (amount) {
        if( this.balance >= amount ) {
            this.balance -= amount;
        } else {
            throw new Error("Insufficient funds");
        }
    }

var harry = new Account(1000);
var ron = new Account(2);
var hermione = new Account(200);
```

Here is a [demo using `class` syntax](bank/index_class.html).

## Example of OOP in JS using traditional syntax

Here's the same example using the traditional syntax that our book uses:

```
:::JavaScript
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
        throw new Error("Insufficient funds");
    }
};

var harry = new Account(1000);
var ron = new Account(2);
var hermione = new Account(200);
```

Here is a [demo using the traditional syntax](bank/index.html).

Let's try it out in the JS console!  Try some deposits and withdrawals. If
you look in the console, you can see the current balance.

How could we write a method to find out the current balance?

## OOP in JS

What we saw above:

### Constructors

The constructor is the `Account` function:

* Create a constructor function (really, it's an initializer)
* By convention, name it with a capital letter, to remind us to use `new`
* Use the `new` keyword when invoking the constructor
* The constructor can access `this` when it executes
* The value of `this` is an new, empty, object
* except the object has a *prototype* connection
* The constructor has no return value
* Commonly, it's used to *initialize* the *instance variables*

We can think of this function as a *factory*, but in practice we name
it with the things it makes. So, we don't call it `makeAccount`; we
called it `Account` because we'll use it like this:

```
:::JavaScript
var hermione = new Account(200);
```

### Instance Variables

In our bank account example, the instance variable is the `balance`
property. Instance variables 

* are also called
    * attributes
    * data members
    * fields
* are properties of the object (`this`)
* can be modified like any object property

As an aside:

* ideally, should not be used outside the object, but
* JavaScript doesn't have that abstraction barrier, though
* if every object were a closure, it would

### Prototypes

Instead of a *class*, like in Java or Python, JavaScript has *prototypes*.

A prototype is an object, just like the one that the factory is
creating, but *all* the objects made by that factory contain an
invisible link to the prototype.

<figure>
<img src="object-factory-with-prototype-x4.svg">
<figcaption>Object factory with cyan objects and a pink
prototype. (Factory image by Chrystina Angeline, from the Noun
Project)</figcaption>
</figure>

The prototype has *read-only* properties that *all* instances share. Let's try the following:

```
ron   // one instance variable
ron.__proto__  // a hidden property
Account.prototype;   // an object
ron.__proto__ == Account.prototype;  // same
Account.prototype.FDIC = true;
console.log(ron.FDIC);
console.log(harry.FDIC);
```

### Methods

In our bank account example, these were `deposit` and `withdrawal`

* also called
    * member functions
    * instance methods
* functions that are stored in `Foo.prototype`
* inherited by all objects created using the given constructor
* the function is *shared* by all instances (saving memory)
* can reference `this` to refer to the object and its properties
* note that because we assign them to properties of the prototype, the statement ends with a semi-colon.

```
:::JavaScript
Foo.prototype.meth = function () { code };
```


### Invoking a Method

We all know how function arguments get their input values: by sequential order:

```
:::JavaScript
function foo(x,y) { return x-y; }

foo(3,2);  // does this return 1 or -1?
```

Methods have another, extra, input value, namely the object. Here's an example:

```
:::JavaScript
function Foo(z) {
    this.z = z;
}

Foo.prototype.sum =
    function (x,y) { return x+y+this.z; };

var f1 = new Foo(1);
f1.sum(2,3);   // returns 6
```

The syntactic rule is that the special variable `this` gets bound to the object.


## Questions

We'll look at [your questions](../../quizzes/quiz10.html)

## Exercise 1

To get started, copy the `~cs204/pub/downloads/bank` folder to your cs204
folder:

```
cd ~/public_html/cs204/
cp -r ~cs204/pub/downloads/bank .
```

1. Make sure it works as above
1. Add an instance variable to the object for different types of accounts: checking vs savings
1. You may use either the traditional syntax in `Account.js` or the new
syntax in `Account_class.js`.
    * Using the tradition syntax might be less confusing because it matches our reading, but
    * Using the new syntax might be simpler and less confusing.

<div class="solution codehilite">
<pre>
function Account(type,init) {
    this.type = type;
    this.balance = init;
}
</pre>
</div>

## Exercise 2

Write code to add a method that will add `x` percent interest to a savings
accounts but not to checking accounts. Name it `addInterest`.

<div class="solution">
<pre>
Account.prototype.addInterest =
    function (rate) {
        if( this.type == "savings" ) {
            this.balance += rate * this.balance;
        }
    };
</pre>

<p>Did you rename the "x" parameter? Why or why not?
</div>


## Using Objects as a Database

There are many kinds of database. A very common and useful type is a [key-value database](https://en.wikipedia.org/wiki/Key-value_database).

For an in-memory database of that kind, we could use JavaScript
objects. Like this:


```
:::JavaScript
var house = {};
house['cho'] = 'ravenclaw';
house['draco'] = 'slytherin';
house['cedric'] = 'hufflepuff';
console.log(house['cho']);
```

Or this:
```
:::JavaScript
var heads = {};
heads['gryffindor'] = 'McGonnagall';
heads['slytherin'] = 'Snape';
```

## APIs

Abstraction barriers give the implementation *freedom*
and *flexibility*. I'll draw a picture of this on the board and if it
works, I'll add it to the reading.

In this chapter we want a key-value database and we decided to use
objects, but what if we wanted to change our minds? What if we wanted
to switch to Oracle NoSQL or LMDB or ... The code above would be a
nightmare to update. But if we hide the database behind an abstraction
barrier, we can isolate that implementation decision and allow
ourselves to change it.

Our API will consist of two methods:

* `put(key,val)` stores a key, value pair
* `get(key)` returns the stored value

Here's one way:

```
:::JavaScript
function KeyValue() {
    this.db = {};
}

KeyValue.prototype.get =
    function (key) { return this.db[key]; }

KeyValue.prototype.put =
    function (key,val) { this.db[key] = val; }

var heads = new KeyValue();
heads.put('gryffindor', 'McGonnagall');
heads.put('slytherin','Snape');
```

## Debugging 

We'll look at the buggy code that was constructed partway through [Chapter
8](../../front-end-dev-resources/book-solutions/Chapter-08-halfway/coffeerun/index.html)

We can replicate the bug with the function `bugSetup` that I implemented
for us, to avoid a bit of typing. We'll look at the definition first:

```
:::JavaScript
var myTruck; 
function bugSetup() {
    myTruck = new App.Truck('007',new App.DataStore());
    myTruck.createOrder({ emailAddress: 'm@bond.com',
                          coffee: 'earl grey'});
    myTruck.createOrder({ emailAddress: 'dr@no.com',
                          coffee: 'decaf'});
    myTruck.createOrder({ emailAddress: 'me@goldfinger.com',
                          coffee: 'double mocha'});
}
```

Next, we will try the following method invocations:

```
myTruck.printOrders_buggy();
myTruck.printOrders_closure();
myTruck.printOrders_bind();
myTruck.printOrders_solved();
```

## Bug Diagnosis

Here's a description of the bug:

```
:::JavaScript
// This is the buggy version from page 183
Truck.prototype.printOrders_buggy = function () {
  var customerIdArray = Object.keys(this.db.getAll());

  console.log('Truck #' + this.truckId + ' pending orders:');
  customerIdArray.forEach(function (id) {
    console.log(this.db.get(id));
  });
};
```

The `forEach` in that code is a method invocation, and so `this` is
*bound* to the `customerIdArray` instead of to the `Truck` instance. Then
the anonymous function is invoked, and because it's not a method, `this`
is *unbound* (AKA *undefined*). 

The `this` in the anonymous function doesn't mean the same object as the
one in the second line!

In the rest of the chapter, we'll learn a solution to that problem using
the `.bind()` method, which allows us to specify a value of `this`.

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement
