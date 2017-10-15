# Form Validation and Regular Expressions

<style>
form { 
    border: 2px solid deepskyblue;
    border-radius: 20px;
    padding: 20px;
    background-color: #d3f2f8;
}
</style>

Form validation is an important filter to make sure

1. Users know when they've made an incorrect request and
1. The main functionality doesn't have to check for (as many) errors

## Plan

1. Recap Form Validation
1. Answer your questions
1. Discuss solution to A7
1. Explore Regular Expressions
1. Book Activities

## Recap Form Validation

We have several levels of validation:

1. Make an input *required*. This is pretty basic, but catches simple
omissions.
1. Use HTML5 types like email or url. These are essentially pre-defined
patterns
1. Use patterns (regular expressions)
1. Run arbitrary JavaScript code using the [Constraint Validation
API](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation#The_HTML5_constraint_validation_API)

## Required

This couldn't be easier. Just add the `required` attribute, and you're done.

```
:::HTML
<form>
   <p><label>
         <span class="label-body">Name</span>
         <input type="text" name="name" required>
      </label></p>
</form>
```

<form>
   <p><label>
         <span class="label-body">Name</span>
         <input type="text" name="name" required>
      </label></p>
</form>

Note the multiple uses of `name` above. *sigh*

## HTML5 types

HTML5 added a bunch of types like email, date, datetime, month, range,
tel, url and others. See [INPUT
element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)

```
:::HTML
<form>
   <p><label>
         <span class="label-body">email</span>
         <input type="email" name="email" required>
      </label></p>
</form>
```

<form>
   <p><label>
         <span class="label-body">Email</span>
         <input type="email" name="email" required>
      </label></p>
</form>

This is nice, but not very smart. Note that `a@b` passes the validation check.

## Patterns

We'll learn more about regular expressions in a minute. For now, let's
look for `wellesley.edu` email addresses:

```
:::HTML
<form>
   <p><label>
         <span class="label-body">email</span>
         <input type="email" name="email" required
                pattern="[\w\.]+@wellesley\.edu$">
      </label></p>
</form>
```

<form>
   <p><label>
         <span class="label-body">Email</span>
         <input type="email" name="email" required
                pattern="[\w\.]+@wellesley\.edu">
      </label></p>
</form>

Now we're getting somewhere!

## Constraint API

For each form input (control), there is a `setCustomValidity()` method,
taking a string as its argument.

If that string is the empty string, it clears the error, allowing the form
to submit.

Otherwise, the string will be reported to the user when they attempt to
submit the form.

Our authors suggest that the event to attach the processing to is the
`input` event, which fires when the `value` changes.

Here, let's use the constraint API to check for a value that is not a
regular expression or anything else that is easy to check for:

```
:::HTML
<form>
   <p><label>
         <span class="label-body">Triple</span>
         <input type="number" name="num" id="num1">
      </label></p>
</form>
```

<form>
   <p><label>
         <span class="label-body">Triple</span>
         <input type="number" name="num" id="num1">
      </label></p>
</form>
<script>
$("#num1").on('input', function(event) {
     var n = parseInt(event.target.value,10);
     // arbitrary processing of the value
     if( n % 3 == 0 ) {
          event.target.setCustomValidity('');
     } else {
          event.target.setCustomValidity('Sorry, that is not divisible by 3');
     }
});
</script>

Here's the code:

```
:::JavaScript
$("#num1").on('input', function(event) {
     var n = parseInt(event.target.value,10);
     // arbitrary processing of the value
     if( n % 3 == 0 ) {
          event.target.setCustomValidity('');
     } else {
          event.target.setCustomValidity('Sorry, that is not divisible by 3');
     }
});
```

## Regular Expressions

Regular expressions are very cool and powerful, but they are a whole
different language.

Let's start simple, and look at a regexp that tests for a string containing
"by" (like "good-bye"):

<form>
   <p><label>
         <span class="label-body">by</span>
         <input type="text" name="by" id="by1">
      </label></p>
   <p>String and result: <output id="out1" aria-live="polite"></output></p>
</form>

<script>
$("#by1").on('input', function (event) {
    var sp = ' ';
    var str = event.target.value;
    $("#out1").text(str+sp+/by/.test(str));
    if( /by/.test(str) ) {
         event.target.setCustomValidity('');
    } else {
         event.target.setCustomValidity("doesn't match /by/ pattern");
    }         
});
</script>

The method `.test()` is a method on regular expressions, which are
delimited by slashes:

`/by/.test("bye")`

Here is the full code:

```
:::JavaScript
$("#by1").on('input', function (event) {
    var sp = ' ';
    var str = event.target.value;
    $("#out1").text(str+sp+/by/.test(str));
    if( /by/.test(str) ) {
         event.target.setCustomValidity('');
    } else {
         event.target.setCustomValidity("doesn't match pattern");
    }         
});
```

Alternatively, you can use `.match()` which is a method on *strings*. Try
copy/pasting these into a JS console:

```
:::JavaScript
/by/.test("gbye");
"gbye".match(/by/);
```

The `.match()` method returns a bit more information. There are many other
methods we could look at, but we won't.  Instead, let's learn more about
the regexp language

## Regular Expression Language

From now on, we'll use the following form to test our regular expressions.

<form id="regexp-string">
   <p><label>
         <span class="label-body">regexp</span>
         <input type="text" name="pattern" id="pattern">
      </label></p>
   <p><label>
         <span class="label-body">string</span>
         <input type="text" name="string" id="string">
      </label></p>
   <p>String and result: <output aria-live="polite" id="result"></output></p>
</form>

<script>
$("#regexp-string").on('input', 'input', function (event) {
    var sp = ' ';
    var pat = $("#pattern").val();
    var str = $("#string").val();
    var regexp = new RegExp(pat);
    var result = regexp.test(str);
    $("#result").text(str+sp+result);
});
$("#regexp-string").on('submit',
                       function(event) {
                            event.preventDefault();
                       });
</script>

Here's the code. Because the regular expression is dynamic, we can't use
the `/literal/` notation, and we have to use the more long-winded `new
RegExp()` notation:

```
:::JavaScript
$("#regexp-string").on('input', 'input', function (event) {
    var pat = $("#pattern").val();
    var str = $("#string").val();
    var regexp = new RegExp(pat);
    var result = regexp.test(str);
    $("#result").text(result);
});
$("#regexp-string").on('submit',
                       function(event) { event.preventDefault();}
                       );
```

First, try "by" against the strings "goodbye" and "hello".

Suppose we want to allow 1 letter to separate the b and y.  We can match
it with a category, like [a-z]:

`b[a-z]y`

Suppose we want zero or more such characters:

`b[a-z]*y`

Suppose we want 1 or more such characters:

`b[a-z]+y`

Suppose we want to allow letters (upper and lower) and digits in there:

`b[A-Za-z0-9]+y`

If we include underscore in the set, we have characters that we could use
for variables and properties, and there's a shorthand: `\w`

`b\w+y`

What if we want *any* character between the b and y, including punctuation
and spaces and stuff?  The dot (period) matches any single character:

`b.+y`

What if we want to match a dot and only a dot?

`b\.+y`

Suppose we want to make sure the string starts with the b. We can match
the beginning of the string with a caret.

`^b\.+y`

Suppose we also want the string to end at the y. Use $

`^b\.+y$`

## Exercise:

Match a Wellesley Unit number (four digits)

<div class="solution">
<pre>
[0-9][0-9][0-9][0-9]
\d\d\d\d
[0-9]{4}
\d{4}
</pre>
</div>

## Balancing Validation and Permissiveness

* Regular expressions are cool, but it's easy to get too restrictive.
* The world is a complex place
* People's names are *not* all in [a-z]+. E.g. Michael Kölling or Jennifer 8. Lee
* Find a good balance between protecting your application and being permissive

<script>
var mk = "Michael Kölling";
console.log(/^\w+$/.test(mk));
</script>

## Your Questions

I'll answer [your questions](../../quizzes/quiz16.html)

## Exercise: Implement Coffee Run form validation

Do the activities from Chapter 12.

You can use the solution to chapter 11 as your starting point:
[downloads/ch11.tar](../../downloads/ch11.tar)

```
curl -O https://cs.wellesley.edu/~cs204/downloads/ch11.tar
tar xf ch11.tar
```

## Their Code

Let's review their JavaScript code. (There are also added CSS rules and
HTML attributes).

`Validation.js`

```
:::JavaScript
(function (window) {
  'use strict';
  var App = window.App || {};

  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@bignerdranch\.com$/.test(email);
    }
  };

  App.Validation = Validation;
  window.App = App;
})(window);
```

In `formhandler.js`:

```
:::JavaScript
  FormHandler.prototype.addInputHandler = function (fn) {
    console.log('Setting input handler for form');
    this.$formElement.on('input', '[name="emailAddress"]', function (event) {
      var emailAddress = event.target.value;
      var message = '';
      if (fn(emailAddress)) {
        event.target.setCustomValidity('');
      } else {
        message = emailAddress + ' is not an authorized email address!';
        event.target.setCustomValidity(message);
      }
    });
  };
```

Note that they are trying to be generic here, adding a general `input`
handler, but it's actually very specific.

Finally, in `main.js`

```
:::JavaScript
  formHandler.addInputHandler(Validation.isCompanyEmail);
```



## Summary

We learned about form validation:

* the `require` attribute
* the HTML5 input types
* the `pattern` attribute
* the `.setCustomValidity()` method on form controls
* we learned to add an event handler to the `input` event to do validation

We also learned about regular expressions.  Regular expressions can be
used to parse simple languages and in general can be very powerful.

