# Form Validation

Chapter 12 on form validation is pretty clear, except that it doesn't
explain much about regular expressions.

Regular expressions are a powerful and efficient way to match a pattern
against a *string*. Most civilized programming languages have them
available, either built-in or as an easily loaded module.

You should think of regular expressions as a whole new language with its
own syntax and grammar. It's not a programming language, but it definitely
changes the meaning of different characters. Unfortunately, there are
often variations in the regular expression languages from Java to Python
to JavaScript and so forth.

The MDN article on [regular expressions in
JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
is good and comprehensive, probably more comprehensive than we need.  Read
the book chapter first, so you understand the role that regular
expressions will play, then read part of the MDN article to learn a bit
more. Specifically, read from the beginning, up until it explains the
meaning of the decimal point. That will explain all the stuff going on the
the chapter.

## What is Form Validation?

Later in the course, we'll talk about submitting the form data to a
server for more elaborate processing, but before we do that, we should
discuss <em>validation</em>.  What is form validation?  Essentially, it
means checking to see that the form has been filled out correctly (as far
as we can tell).

Form validation could be used to ensure that someone hasn't overlooked
  a text input, menu or radio button group, and can check that, for
  example, the zip code is 5 digits (or 9) and that a telephone number is
  10 digits, and that an email address looks like an email
  address.

Form validation can actually cancel the submission of the form, so that
the data never leaves browser.  The reason we validate forms is twofold:
to give the user immediate feedback that they've missed something, instead
of waiting for the server to respond, and to protect the server from
having to handle all those invalid forms.  Of course, a determined
nefarious person can simply disable our form validation JavaScript and
hammer our server with invalid forms, but that's rare. The vast majority
of invalid forms are just human error.

Obviously, the browser can't tell whether you entered your correct
phone number, but it can check that you typed the right number of digits
(and only digits).  Similarly, it can't check that your spelled your name
correctly (and whether your name really is <q>Mickey Mouse</q>), but it
can check that you didn't leave that input blank.

With HTML5 and modern web browsers, form validation has gotten a lot
easier.  In the past, web developers would write JavaScript code that
would look at the values in the form to check for bogus values.  They
wrote libraries and jQuery plug-ins to make the job easier for others.

However, the vast majority of form validation can be done with a few
  simple things:

* Add the attribute <code>required</code> to any input that you want
to require the user to fill out. 
* Use the fancy new form input types that HTML5 has added, such as:
    * tel, for telephone numbers
    * email, for email addresses
    * date, for just a date (year, month, day)
    * time, for time (hour, minute, seconds)
    * datetime, combining date and time inputs
    * and others

Here's a demonstration:

<pre class="prettyprint lang-html">
&lt;form action="/cgi-bin/dump.cgi"&gt;
  &lt;p&gt;Username: &lt;input required name="username"&gt;
  &lt;select required name="hogwarts_house"&gt;
    &lt;option value=""&gt;Hogwarts House&lt;/option&gt;   
    &lt;option&gt;Gryffindor&lt;/option&gt;
    &lt;option&gt;Hufflepuff&lt;/option&gt;
    &lt;option&gt;Ravenclaw&lt;/option&gt;
    &lt;option&gt;Slytherin&lt;/option&gt;
  &lt;/select&gt;
  &lt;p&gt;Email address: &lt;input required name="email" type="email"&gt;
  &lt;p&gt;Birthday: &lt;input required name="birthday" type="date"&gt;
  &lt;p&gt;&lt;input type="submit" value="submit form"&gt;
&lt;/form&gt;
</pre>  
  
<p>Here's the actual form, so you can change the values of inputs:
</p>

<form class="exercise" action="/cgi-bin/dump.cgi">
  <p>Username: <input required name="username">
  <select required name="hogwarts_house">
    <option value="">Hogwarts House</option>   
    <option>Gryffindor</option>
    <option>Hufflepuff</option>
    <option>Ravenclaw</option>
    <option>Slytherin</option>
  </select></p>
  <p>Email address: <input required name="email" type="email"></p>
  <p>Birthday: <input required name="birthday" type="date"></p>
  <p><input type="submit" value="submit form"></p>
</form>

<p>Try to submit an incomplete form!</p>

