# Forms and JS

Today, we'll finish our discussion of OOP, and quickly focus on HTML forms
and how they interact with JavaScript.

## Plan

1. Midterm recap
1. Review forms
1. A6 preview
1. Forms and JS
1. Quiz Questions
1. Chapter 9/10 activities
1. Chapter 10 review

## Midterm Recap

I'll go over a few of the midterm questions that people had trouble with.

[midterm questions](../../solutions/midterm/midterm.html)

If you have any questions or concerns, please come talk to me! I'd like to
make sure everyone has a firm foundation for the rest of the course.

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

## Assignment 6

You should start on A6 right away. In general, even if you are taking
lateness coupons, you should meet with your collaborator for the new
assignment and start thinking about it. Overlap the implementation effort.

[a06](../../assignments/a06/concentration.html)

[my solution](../../solutions/a06-concentration/game.html)

There are lots of suggestions and advice in that assignment. I hope it'll
be helpful, but if it's not, talk to me or the tutor.

## Forms and JS

* forms will typically have a `submit` button (though you can change the
text to "place order" or whatever.
* form submission is an *event*
* we can attach JS functions to the event
* often those handlers will want to do `event.preventDefault()`
* we should probably check that we succeeded in finding the form to attach
the event handler to
* can get all the data using `.serialize` or `.serializeArray` (jQuery methods).
* elaborate protocol of writing a generic *add handler* method that takes
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

## Next Time

We'll look at dynamically creating DOM elements using jQuery.

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

