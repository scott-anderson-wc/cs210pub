# Forms and JS

Today, we'll finish our discussion of OOP, and quickly focus on HTML forms
and how they interact with JavaScript.

## Plan

1. Review forms
1. Forms and JS
1. Quiz Questions
1. Chapter 9/10 activities
1. Chapter 10 review
1. Assignment 7

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

We'll look back at the [example in the reading](../../reading/forms.html#pizza-form), to make sure it's clear.

I'll demo `.serialize()` and `.serializeArray()`

## Forms and JS

* forms will typically have a `submit` button (though you can change the
text to "place order" or whatever).
* form submission is an *event*
* we can attach JS functions to the event
* often those handlers will want to do `event.preventDefault()` 
* we should probably check that we succeeded in finding the form (to attach
the event handler to)
* we can get all the data using `.serialize` or `.serializeArray` (jQuery methods).
* Our book teaches us an elaborate protocol of writing a generic *add handler* method that takes
a *callback* function to get the form data as an argument and then do the
specific work for that form.

## Questions

I'll answer [your questions](../../quizzes/quiz13.html)

## Activities

There are some important debugging aspects of the activities in Chapters 9
and 10, so we'll do as much of that as we can.

## Chapter 10 Activity

Here's the finished code from chapter 9, which you can use as a starting
point for Chapter 10's activity.

```
curl -O https://cs.wellesley.edu/~cs204/downloads/ch09.tar
tar xf ch09.tar
```

## Chapter 10 Review

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
      throw new Error('No element with selector: '
                      + selector);
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

// ====================================================

(function (window) {
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var FormHandler = App.FormHandler;
  var myTruck = new Truck('ncc-1701', new DataStore());
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(myTruck.createOrder
                                       .bind(myTruck));
  console.log(formHandler);
})(window);
```

Observations:

1. the `createOrder` method wants as input an object with key/value pairs
that describe the order, like `emailAddress`, `size` and `flavorShot`.
1. the form has controls with those names
1. the form event handler collects those name-value pairs into an object
and invokes the callback with that object.
1. the callback will be the `createOrder` method, with `this` bound to the
intended truck.

Let's try filling out [the coffeerun
form](../../front-end-dev-resources/book-solutions/Chapter-10/coffeerun/index.html)
and serializing the form using simplified code like this:

```
:::JavaScript
var cof = $('[data-coffee-order="form"]');
cof.serializeArray();
function addEH(form, cb) {
   $(form).on('submit', function (event) {
       event.preventDefault(); 
       var data = {};
       $(this).serializeArray().forEach(function (item) {
           data[item.name] = item.value;
           console.log(item.name + ' is ' + item.value);
       });
       console.log(data);
       cb(data);
    });
}
var global_data = null;
addEH(cof, function (data) { global_data = data; });
```

## Assignment 7 and Modules

I'll demo [A07 signup form](../../solutions/a07-signup/signup.html), and
we'll discuss this aspect of the implementation:

```
:::JavaScript
var Luhn = (function () {

    function digits_of(number,step,init) {
        ....
    }
    
    function sum(array) {
        ...
    }

    function checksum(card_number) {
        ...
    } 

    function is_valid(card_number) {
        return checksum(card_number) == 0;
    }
    
    function test() {
        console.log('should be true:  '+is_valid('79927398713'));
        console.log('should be false: '+is_valid('79927398714'));
    }
    
    // here are the exported values
    return { checksum: checksum, is_valid: is_valid, test: test };
})();
```

Let's see that in the browser, here: [Luhn.html](Luhn.html)

Let's compare that with Python code:

```
:::Python
def digits_of(number):
    return [int(i) for i in str(number)]

def luhn_checksum(card_number):
    digits = digits_of(card_number)
    odd_digits = digits[-1::-2]
    even_digits = digits[-2::-2]
    total = sum(odd_digits)
    for digit in even_digits:
        total += sum(digits_of(2 * digit))
    return total % 10

def is_luhn_valid(card_number):
    return luhn_checksum(card_number) == 0
```

To use this module, our main Python file would do

```
:::Python
import luhn

print luhn.luhn_checksum('1234')  # returns a number
print luhn.is_luhn_valid('1234')  # returns boolean
```    

If you're using modules, you'd probably omit `luhn` from the function
names!

Let's draw a picture of this as well as seeing it in the Python REPL.

Our JavaScript works pretty much the same way, only it uses better naming
and is explicit about exports.  

## Modules in Assignment 7

Working with and defining modules is key to this assignment

Your HTML will load three files:

1. `Luhn.js`; you'll make only a tiny change to this file
1. `formhandler.js`; you'll make some small changes to this file
1. `signup.js`; this file will be similar to the `main.js` file from
Chapter 10, in that it will *use* functions and objects defined in the
other files.  By working with both sides of the abstraction barriers, I
hope you'll feel more comfortable with modules in general and modules in JavaScript.

Let's draw a picture of this.


## Assignment 7

## Summary

* IFFEs and modules are great, but by definition they make things harder
to interact with via the JS console. I suggest packaging things up once
your code is more mature and needs less debugging.
* OOP isn't that hard to do and can be useful
* Forms can have event handlers for form submission
* We can define higher-order functions that will attach a function to a
form as an submission handler.
* It can even supply some standard behavior, such as `.preventDefault()`

## Next Time

We'll look at dynamically creating DOM elements using jQuery.

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

