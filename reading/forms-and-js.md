# Forms and JavaScript

This reading supplements Chapter 10, which introduces JS code to process
data that is entered into forms.  We'll look at the following topics:

* `bind` (this is from Chapter 8, but re-occurs in Chapter 10)
* submit handlers
* preventing defaults
* jQuery and its pitfall
* serializing forms
* resetting forms

## Binding `this`

We saw `bind` back in Chapter 8, but it rears its ugly head again in
Chapter 10. 

If you'd like to explore `bind` with more examples, check out the [MDN
explanation of
bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

If you're not feeling okay about it, please talk to me or to our tutor.

## Form Submission

Now let's talk about forms. HTML forms were invented so that a page could
collect information from the user and allow it to be packaged up and
submitted to a server for some kind of processing.  Think about forms on
Amazon.com or Ebay.com or any other kind of web application. Think about
the <q>customer feedback</q> questionnaires we are constantly being asked
to fill out.  Even Facebook posts. All of those are forms being submitted
to servers.

We can write JavaScript code that gets triggered when a form is
submitted. In this chapter, the authors write some sophisticated, abstract
code for setting up some general-purpose code for handling
form-submission. In this part of the reading, we'll look at more concrete
examples, so that the abstract code will make a bit more sense.

Let's start with the following form

<form id="form1" method=GET
      action="https://cs.wellesley.edu/~cs204/form-echo-html.php">
      <p><label>What's the Ultimate Question of Life, the Universe and
            Everything
            <input type="text" name="ans">
            </label></p>
      <p><input type="submit"></p>
</form>

Go ahead and fill it out and submit it if you like.

## Submit Handlers

The first thing we want to do is add a JS function that will be invoked
when the form is submitted.  Form submission is a kind of event, so this
is a kind of event handler.

What should our function do? For now, let's just alert the user that they
submitted the form. A little bit of jQuery will suffice.

<form id="form2" method=GET
      action="https://cs.wellesley.edu/~cs204/form-echo-html.php">
      <p><label>What's the Ultimate Question of Life, the Universe and
            Everything
            <input type="text" name="ans">
            </label></p>
      <p><input type="submit"></p>
</form>

```
:::JavaScript
$("#form2").submit(function () { alert("form submitted!"); });
```

<script>
// $("#form2").submit(function () { alert("form submitted!"); });
$("#form2").on('submit', function () { alert("form submitted!"); });
</script>

The jQuery `submit` method is just a shortcut for using `on` and the name
of the event, which is what your book does:

```
:::JavaScript
$("#form2").on('submit', (function () { alert("form submitted!"); });
```

Note that the URL changes when you submit this form, with your form data
(key/value pairs) appearing in the URL.

## Preventing Defaults

Usually, we want to send the data to a server when a form's submit button
is clicked (or the user presses `enter` in a text field), but in this case
we don't. We want to *prevent* the default behavior, so we'll change our
event handler to get the event object and use the `preventDefault()`
method:

<form id="form3" method=GET
      action="https://cs.wellesley.edu/~cs204/form-echo-html.php">
      <p><label>What's the Ultimate Question of Life, the Universe and
            Everything
            <input type="text" name="ans">
            </label></p>
      <p><input type="submit"></p>
</form>

```
:::JavaScript
$("#form3").submit(function (evt) {
    evt.preventDefault();
    alert("form submitted!");
});
```

<script>
$("#form3").submit(function (evt) {
    evt.preventDefault();
    alert("form submitted!");
});
</script>

Note that the URL doesn't change with this event handler. Of course,
that's because we've prevented the default behavior.

## jQuery and its pitfall

What's wrong with the following combination of HTML and CSS and
JavaScript?

```
:::HTML
<form id="form3"> ...</form>
```

```
:::CSS
#from3 { border: 1px solid green; }
```

```
:::JavaScript
$("#from3").submit( function () { alert("submitted"); });
```

Right; spelling. In CSS, you won't get an error message; it's just a rule
that doesn't happen to apply to anything. Similarly, in jQuery, it'll look
up everything that matches that selector, and add the given function as a
submit handler. Alas, nothing matches that selector, but jQuery doesn't
give you an error message. It treats it as an empty set: valid but useless.

Sometimes, jQuery's behavior is exactly what you want, but often, you'd
like to know if you've done something wrong. So check the number of
matched items:

```
:::JavaScript
var $form = $("#from3");
if ($form.length === 0) {
    throw new Error("couldn't find form...");
}
$form.submit( function () { alert("submitted"); });
```

(In the code above, we've used a dollar sign in the name of the
variable. That's a common but not universal convention for variables that
contain jQuery results, since it helps you remember that you can use
jQuery methods on the value of that varible. But it's also a little
ugly. Your book chooses to use this convention; don't let it throw you.)

In fact, you might even create a higher-level function that will search,
check and then add the event handler.  Like this:

```
:::JavaScript
function addFormSubmissionHandler(selector, fn) {
    var $form = $(selector);
    if ($form.length === 0) {
        throw new Error("couldn't find form...");
    }
    $form.submit( fn );
}    
```

That's what they've done in this chapter.  Actually, they also know that
whatever submit handlers they write, they always want to prevent the
default behavior of submitting the form, so they do this:

```
:::JavaScript
function addFormSubmissionHandler(selector, fn) {
    var $form = $(selector);
    if ($form.length === 0) {
        throw new Error("couldn't find form...");
    }
    $form.submit( function(evt) {
        evt.preventDefault();
        fn();
     });
}    
```

One important thing to notice about the code above is how a function
(`fn`) is passed in. That function does the rest of the work of the form
submission handler. So, you can think of the `addFormSubmissionHandler`
function as:

1. find the form using a selector
1. if the selector didn't work, complain
1. set up a submission handler for that form
1. the submission handler will do some routine stuff and then,
1. invoke a function arg to do the specific stuff for this form

## Serializing Forms

In general, forms have several inputs and all of them get packaged up and
submitted to the server. To do that, the form inputs have to each be
converted into strings and those strings have to be concatenated
together. That process is called *serializing*. The key with serializing
is that it has to be *reversible*: all of it has to be done in a way that
the server can reverse the process and get back the original set of
name/value pairs.

jQuery has a method that will serialize a form for you. It's called,
unsurprisingly, `.serialize()`.  You can also get the inputs as an array
of objects; that's called `.serializeArray()`. Each object in the array
consists of a single name/value pair from the form. That is, a form asking
about pizza preferences:

```
:::HTML
<form id="pizza">
    <input name="kind">  <!-- e.g. pepperoni or veggie --> 
    <select name="size">
        <option>large (16 inch)</option>
        <option>medium (14 inch)</option>
        <option>personal (12 inch)</option>
    </select>
</form>
```

Might serialize like this:

```
:::JavaScript
$("#pizza").serializeArray();
[{name: 'kind', value: 'veggie'},
 {name: 'size', value: 'personal (12 inch)'}]
```

Check out [jQuery .serializeArray](https://api.jquery.com/serializeArray)
to learn more.

In this chapter, they arrange for all form submission handlers to
serialize the form into an array, and then collect all the form inputs
into a single object. Like this:

```
:::JavaScript
var data = {};
$(this).serializeArray().forEach(function (item) {
    data[item.name] = item.value;
    });
```

The earlier pizza form would serialize into an object like this:

```
:::JavaScript
{kind: 'veggie',
 size: 'personal (12 inch)'}
```

The form submission handler then invokes the callback function with the
form data object as its input.  So the overall plan is now:

1. find the form using a selector
1. if the selector didn't work, complain
1. set up a submission handler for that form
1. the submission handler will do some routine stuff namely
     a. prevent the default, and
     a. serialize the form into a single object
1. invoke a function arg with the form data object to do
the specific stuff for this form

Here's the code:

```
:::JavaScript
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
      fn(data); // invoke the callback with the form data
    });
  };
```

Re-read the code above keeping the abstract plan in mind.

## Bind

They've set up this very abstract code to attach a submission handler to a
form with the routine stuff factored from the specific stuff. The code for
the specific stuff will be passed in as a callback function. Now they'll
use this to attach a submission handler to a form.

Unfortunately, the callback function that they want to use is, in fact, a
*method*. It's the `createOrder` method of a `Truck` object. So, they'd
like to do:

```
:::JavaScript
var myTruck = new Truck('ncc-1701', new dataStore());
var formHandler = new FormHandler(FORM_SELECTOR);
formHandler.addSubmitHandler( myTruck.createOrder ); // doesn't work
```

The last line doesn't work. It doesn't work because `createOrder` is a
method, and it needs a value for `this`. We *could* do the following:

```
:::JavaScript
var myTruck = new Truck('ncc-1701', new dataStore());
var formHandler = new FormHandler(FORM_SELECTOR);
formHandler.addSubmitHandler( function (form_data) {
     myTruck.createOrder(form_data);
     });
```

but it works just as well do to the following:

```
:::JavaScript
...
var myTruck = new Truck('ncc-1701', new dataStore());
var formHandler = new FormHandler(FORM_SELECTOR);
formHandler.addSubmitHandler( myTruck.createOrder.bind(myTruck) );
```

The latter is what our book uses. Use whichever technique you understand
better. Using `bind` is also a little more concise, though that's not an
important reason.
