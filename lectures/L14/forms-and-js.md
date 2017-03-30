# Forms and JS

Today, we'll finish our discussion of OOP, and quickly focus on HTML forms
and how they interact with JavaScript.

## Plan

1. Conclude OOP in JS
1. Discuss `bind`
1. Discuss forms
1. Discuss submit handlers
1. Chapter 8/9/10 activities

## OOP

Any questions on what we learned about OOP last time?

* Constructors
* instance variables
* prototypes
* method definition
* method invocation

## Binding `this`

Methods *must* have an object, bound to `this`

Unfortunately, `this` is no ordinary varible. It constantly gets rebound,
anytime there's a function call or a method call.

The following code, mal-adapted from your book (page 189) *doesn't* work:

```
:::JavaScript
Truck.prototype.printOrders_bad = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.TruckId + " has pending orders:");
    customerIdArray.forEach( function (id) {
        console.log(this.db.get(id));
       });
}

truck1.printOrders_bad();
```

The `Object.keys()` method is a way of getting an array of all the
properties in an object. Here the database is an object with a key for
each order, so an array of all the keys comprises all the orders. We then
use the `.forEach()` method on that array to print all the orders.

Why doesn't in work?  Because `this` doesn't mean the same thing in the
function passed to `forEach` as it did outside. Why? Because there's been
a method call and a function call.  

### Solution 1:  use a closure over `that`

```
:::JavaScript
Truck.prototype.printOrders_closure = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.TruckId + " has pending orders:");
    var that = this;
    var print1 = function (id) { console.log(that.db.get(id)); }
    customerIdArray.forEach( print1 );
}
```

### Solution 2: use `bind`

This does the same thing, without having to invent a variable like `that`
and creating a closure:

```
:::JavaScript
Truck.prototype.printOrders_bind = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.TruckId + " has pending orders:");
    var print1 = function (id) {
        console.log(this.db.get(id));
    }.bind(this);
    customerIdArray.forEach( print1 );
}
```

Compare that with their code from page 189, which avoids an extra variable
at the price of some syntactic complexity:

```
:::JavaScript
Truck.prototype.printOrders_original = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log("Truck #" + this.TruckId + " has pending orders:");
    customerIdArray.forEach( function (id) {
        console.log(this.db.get(id));
    }.bind(this));
}
```

## OOP Conclusion

Objects often don't seem worthwhile, but taking the time to implement an
abstraction layer often pays off in unforeseen ways.

There was a story I heard where an AI system didn't get an innovation
implemented because they couldn't tell the difference between accessing
the first element of a list as a field accessor (method) versus other
kinds of list processing.

I can also tell you about a success I had in which I had defined a thin
interface to a library and I was able to keep all my code working when the
library failed by replacing the library and re-writing the interface a
bit.


## HTML forms

Tags to know:

* `form`  wrapper for all controls (inputs)
* `label` to label an input/control with some text for accessible UI
* `input`  most common, many varieties, including
    * `text` very common
    * `button` for actions
    * `submit` to send form data to server
    * `reset` to clear the form
    * `radio` to make a set mutually exclusive choices
    * `checkbox` to make a set of combinatorial choices
* `select` and `option` for menus
* `textarea` for long chunks of text

Attributes to know:

* `name` and `value`
* `id` and `for` (used by `label`)
* `type` for inputs
* `action` and `method` for `form` (later in the course)

## Pizza example

We'll look back at the example in the reading, to make sure it's clear.

## Questions

I'll answer [your questions](../../quizzes/quiz12.html)

## Forms and JS

* forms will typically have a `submit` button (though you can change the
text to "place order" or whatever.
* form submission is an *event*
* we can attach JS functions to the event
* often those handlers will want to `event.preventDefault()`
* we should probably check that we succeeded in attaching the event
handler
* can get all the data using `.serialize` or `.serializeArray` (jQuery methods).

## Questions

I'll answer [your questions](../../quizzes/quiz13.html)

## Activities

There are some important debugging aspects of the activities in Chapters
8, 9 and 10, so we'll do as much of that as we can.

## Chapter 10

Here's the final code from chapter 10, slightly edited

```
:::JavaScript
(function (window) {

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('No element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      fn(data);                 // user callback here!!!
      this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);

// ================================================================

(function (window) {
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var FormHandler = App.FormHandler;
  var myTruck = new Truck('ncc-1701', new DataStore());
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  console.log(formHandler);
})(window);
```

## Summary

* IFFEs and modules are great, but by definition they make things harder
to interact with via the JS console. I suggest packaging things up once
your code is more mature and needs less debugging.
* OOP isn't that hard to do and can be useful
* Forms can have event handlers for form submission
* We can define higher-order functions that will attach a function to a
form as an submission handler.
* It can even supply some standard behavior, such as `.preventDefault()`


## Chaining

If we have time, let's look at chaining in OOP.  Imagine that we have a
series of transactions we need to do. (Maybe these should be changes to
Hogwart's house points).

```
:::JavaScript
var hermione = new Account("savings",300);
hermione.deposit(100);
hermione.deposit(200);
hermione.withdrawal(150);
hermione.addInterest(0.1);
```

Fine, but a little tedious. Wouldn't it be nice to chain them together,
like this:

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
<p>Make sure each method returns <code>this</code>. For example:</p>
<pre>
Account.prototype.deposit = function (amount) {
     this.balance += amount;
     return this;
}     
</pre>
</div>

Any disadvantages to the chaining idea?

<div class="solution">
<p>Maybe we want the <code>.deposit()</code>
and <code>.withdrawal()</code> methods to return the new balance, instead
of the object?

<p>But we could just chain on <code>.getBalance()</code> if we wanted.

<p>In general, if we want to "switch focus" that might affect our
choice. jQuery does this sometimes.
</div>

## Next Time

We'll look at dynamically creating DOM elements using jQuery.
