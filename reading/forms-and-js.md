# Forms and JavaScript

This reading supplements Chapter 10, which introduces JS code to process
data that is entered into forms.  We'll look at the following topics:

* `bind` (this is from Chapter 9, but re-occurs in Chapter 10)
* submit handlers
* preventing defaults
* jQuery and its pitfall
* serializing forms
* resetting forms

## Binding `this`

Last time, we looked at a simple OOP system of bank accounts.

<script src="bank-accounts.js"></script>

Some observations:

* `toString` is a method that returns a descriptive string
* `print` is a method that uses `console.log` to print the description

Suppose that we want to invoke the `print` method but not right away,
maybe in about 5 seconds.  (Not a plausible scenario, but simpler than the
realistic scenarios that your book presents in chapter 9 and chapter 10 --
we'll discuss those in class.)

To do that, we'll use the `setTimeout` function, which takes two
arguments: a function to invoke, and a time delay in milliseconds.  So, to
print ron's account 5 seconds from now, we can do the following:

```
:::JavaScript
fn = function () { ron.print(); };
setTimeout( fn, 5000 );
```

That works fine. You might think, though, that since `setTimeout` just
needs a function of no arguments, and `ron.print` is a function of no
arguments, inherited from `Account.prototype`, we could do the following:

```
:::JavaScript
fn = ron.print;
setTimeout( fn, 5000 );
```

Alas, that doesn't work (try it!). That's because the magic variable
`this` doesn't have the correct value. However, there's something called
`bind` which can take a method and return a function that has the correct
value for `this`.  (In general, to give a value to a name is called
*binding*, so `bind` gives a value to `this`.)

So, the following *does* work:

```
:::JavaScript
fn = ron.print.bind(ron);
setTimeout( fn, 5000 );
```

## Bind in method definitions

What if we wanted to make delayed printing a general feature of bank
accounts, so we provide a method for it. Here's our first draft:


```
:::JavaScript
Account.prototype.print = function () {
    console.log(this.toString());
}

Account.prototype.print5seconds_bad = function () {
    // the following won't work, because 'this' gets rebound to 'window'
    setTimeout( this.print, 5000);
}
```

Feel free to try it, and all these examples, in the JS console, say by
invoking `ron.print5seconds_bad()`

As the comment says, our `_bad` version doesn't work because the magic
variable 'this' only has meaning within the method, not in the setTimeout,
when it changes back to `window` (its meaning outside method invocations).

Our next attempt is to use a closure over `this`:

```
:::JavaScript
Account.prototype.print5seconds_this = function () {
    // the following won't work, because we can't close over 'this'
    // it tries to print the window!
    var closure = function () { this.print(); };
    setTimeout( closure, 5000);
}
```

This idea is a good idea, but it turns out that the name `this` is
special and changes its meaning.  If you want to capture its value, you
have to assign it to a non-magical name. The convention in JavaScript is
to use `that` as the non-magical name. So the following *works*:

```
:::JavaScript
Account.prototype.print5seconds_that = function () {
    // the following *does* work, because we can close over 'that'.
    var that = this;
    var closure = function () { that.print(); };
    setTimeout( closure, 5000);
}
```

Compare it carefully with the previous example.

This technique of creating a special closure just to capture the value of
`this` for use by a method is common enough that the `bind()` feature was
created.  The following solution works the same way as the previous
example, but it's just a bit more succinct:


```
:::JavaScript
Account.prototype.print5seconds_bind = function () {
    //  the following also works, using 'bind' to create a closure where
    //  'this' has the correct value.
    var closure = this.print.bind(this);
    setTimeout( closure, 5000);
}
```

If you'd like to explore `bind` with more examples, check out the [MDN
explanation of
bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## Form Submission

Now let's turn from the language theory of `bind` and talk about
forms. HTML forms were invented so that a page could collect information
from the user and allow it to be packaged up and submitted to a server for
some kind of processing.  Think about forms on Amazon.com or Ebay.com or
any other kind of web application. Think about the <q>customer
feedback</q> questionnaires we are constantly being asked to fill out.
All of those are forms being submitted to servers.

We can write JavaScript code that gets triggered when a form is
submitted. In this chapter, the authors write some sophisticated, abstract
code for setting up some general-purpose code for handling
form-submission. In this part of the reading, we'll look at more concrete
examples, so that the abstract code will make a bit more sense.

Let's start with the following form

<form id="form1" method=GET
      action="https://cs.wellesley.edu/~cs210/form-echo-html.php">
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
      action="https://cs.wellesley.edu/~cs210/form-echo-html.php">
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


## Preventing Defaults

Usually, we want to send the data to a server when a form's submit button
is clicked (or the user presses `enter` in a text field), but in this case
we don't. We want to *prevent* the default behavior, so we'll change our
event handler to get the event object and use the `preventDefault()`
method:

<form id="form3" method=GET
      action="https://cs.wellesley.edu/~cs210/form-echo-html.php">
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
like to know if you've done something wrong. So check:

```
:::JavaScript
var $form = $("#from3");
if ($form.length === 0) {
    throw new Error("couldn't find form...");
}
$form.submit( function () { alert("submitted"); });
```

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
of objects; that's called `.serializeArray()`.

More on this later. Or check out [jQuery
.serializeArray](https://api.jquery.com/serializeArray)



