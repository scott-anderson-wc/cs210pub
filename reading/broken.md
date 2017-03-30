   <style>
    TH.exp, TD.exp {font-family: monotype; font-size:110%; color: green;}
    TH.val, TD.val {font-family: monotype; font-size:110%; color: blue;}
    TH.note, TD.note {font-family: Verdana, Arial, sans-serif; font-style: italic; color: black;}
    table {margin: 0 auto;}

  </style>

# JavaScript Methods

In this reading about JavaScript methods, we will be *using* methods for
several kinds of objects, but not defining or implementing methods. We'll
also talk about JS object literals as collections of data, but not yet in
the sense of supporting method invocation.

Our first example will be to use the JavaScript `Date` object, which is
built into the language.

## Displaying the Date Dynamically

We can display the current date and time on a web page. For example:

<div id="date_today">You loaded this page on <span class="date"></span>
  at <span class="time"></span></div>
<script>
// create and store a Date object representing this moment
var dateObj = new Date();

// format info about the day
var the_day = dateObj.getDate();
var the_month = dateObj.getMonth() + 1; // Add 1 because Jan is 0, etc.
var the_year = dateObj.getFullYear();
var current_date = the_month + "/" + the_day + "/" + the_year;

// format info about the time
var the_hour = dateObj.getHours();
var the_minute = dateObj.getMinutes();
var the_second = dateObj.getSeconds();
var current_time = the_hour + ":" + the_minute + ":" + the_second;

$("#date_today .date").text(current_date);
$("#date_today .time").text(current_time);
$("#date_today").css({border: "2px solid green",width: "80%",margin: "0.5em auto",padding: "0.5em"});
</script>


If you reload this page, you'll notice that the date and time change appropriately. 

Before we explain the JavaScript code that can do this, we need to
understand how time is represented in JavaScript.  We begin by creating a
`Date` object:

```
:::javascript
var dateObj2 = new Date(); 
```

As we've seen before, the keyword `var` in `var dateObj2` creates a new
variable named `dateObj2` for storing a value.  What we haven't seen
before is the keyword `new`, which causes a JavaScript <em>object</em> to
be created.  In this case, the object represents the current date and
time.  JavaScript comes equipped with lots of pre-defined object types
like <code>Date</code>.

We can extract information from a <code>Date</code> object by invoking
<em>methods</em> on it. The table below shows some of the important
methods that <code>Date</code> objects understand.  The elements of the
<b>Value</b> column are dynamically computed by evaluating the JavaScript
expressions in the <b>Expression</b> column, so reloading the page will
update these appropriately.

<table id="date_examples" class="border">
      <tr>
        <TH class = "exp">Expression</TH>
        <TH class = "val">Value</TH>
        <TH class = "note">Notes</TH>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getFullYear()</TD>
        <TD class = "val"></TD>
        <TD class = "note">Full year</TD>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getYear()</TD>
        <TD class = "val"></TD>
        <TD class = "note">Avoid this! Varies from browser to browser</TD>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getMonth()</TD>
        <TD class = "val"> </TD>
        <TD class = "note">0=Jan, 1=Feb, ..., 11=Dec</TD>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getDate()</TD>
        <TD class = "val"> </TD>
        <TD class = "note">1 to 31</TD>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getDay()</TD>
        <TD class = "val"> </TD>
        <TD class = "note">0=Sun, 1=Mon, ..., 6=Sat</TD>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getHours()</TD>
        <TD class = "val"> </TD>
        <TD class = "note">0 to 23</TD>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getMinutes()</TD>
        <TD class=val> </TD>
        <TD class = "note">0 to 59</TD>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getSeconds()</TD>
        <TD class = "val"> </TD>
        <TD class = "note">0 to 59</TD>
      </TR>
      <TR>
        <TD class = "exp">dateObj2.getTime()</TD>
        <TD class = "val"> </TD>
        <TD class = "note">Milliseconds since Jan 1, 1970 (the "epoch")</TD>
      </TR>
</TABLE>


## Objects

Dates are examples of objects.  In JavaScript, an <em>object</em> is a
kind of value that has two important characteristics:

<ul>
  <li><strong>state</strong>, which is given by what JavaScript calls
      <em>properties</em>.
  <li><strong>behaviors</strong>, which are specified by what JavaScript calls
      <em>methods</em>. 
</ul>

Both properties and methods are selected from an object using <em>dot
notation</em>.  In the examples above, the variable <code>now</code>
contains a date object. The expression to the left of the dot in
<code>dateObj2.getDate()</code> is a variable, <code>now</code>, that
contains a date object.  To the right of the dot is the name of the thing
we want to compute based on the object.  In this case, we invoke the
<code>getDate()</code> method, which returns the numerical day of the
month in a date object.  (You can tell we're calling a method rather than
selecting a property by the presence of parentheses after the name.)

W3 Schools has a [complete list of Date
methods](http://www.w3schools.com/jsref/jsref_obj_date.asp)

<h2 id="date_formatting">Date Formatting</h2>

Now let's return to our date and time display.  A date object contains a
collection of information about the date and time, but for
human-readability, we will need to <em>format</em> that data in some
conventional way, using, for example, slashes and commas to separate the
various numbers.

Here is JavaScript code that creates the correct string. (Next time,
we'll look at how to insert it into the document using the DOM).

<form>
<div>
<textarea rows=20 cols=80>
// create a Date object, representing this moment, and store it
var dateObj = new Date();

// format info about the day
var the_day = dateObj.getDate();
var the_month = dateObj.getMonth() + 1; // Add 1 because Jan is 0, etc.
var the_year = dateObj.getFullYear();
var current_date = the_month + "/" + the_day + "/" + the_year;

// format info about the time
var the_hour = dateObj.getHours();
var the_minute = dateObj.getMinutes();
var the_second = dateObj.getSeconds();
var current_time = the_hour + ":" + the_minute + ":" + the_second;

alert("current_date is "+current_date);
alert("current_time is "+current_time);
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

Let's examine the code. The first statement creates a <code>Date</code>
object representing the current date and time, and stores it in a variable
named <code>dateObj</code>.  Subsequent statements extract components of
this <code>Date</code> object and piece them together.

As shown below, we could get by with only the single variable
<code>dateObj</code>. Although the other variables are not strictly
necessary, they can help to make the code more readable.  Note that
there's nothing special about naming the variable <code>dateObj</code>.
We could have called it anything else, such as <code>today</code> or
<code>now</code> or <code>fred</code> (but <q>fred</q> would not be a good
name, since it wouldn't suggest the meaning or value of the data).

<pre class="codehilite">
var dateObj = new Date();

var current_date = ( (dateObj.getMonth() + 1) + "/"
                             + dateObj.getDate() + "/"
                             + dateObj.getFullYear());
var current_time = ( dateObj.getHours() + ":"
                             + dateObj.getMinutes() + ":"
                             + dateObj.getSeconds());
</pre>

## Other Date Methods

We've used the example of dates to teach you about:

* Objects (encapsulations of data and methods to operate on it)
* methods (ways to extract or modify the data in an object)

Lots of other objects and methods exist in JavaScript.  

Here's another method, this time on <em>numbers</em>, the
<code>toFixed()</code> method. Note that you'll have to open the
JavaScript console to see the output.
  
<form>
<div>
<textarea rows=8 cols=80>
var radius = 10;
var circumference = 2*radius*Math.PI;
console.log("circumference is "+circumference);
console.log("circumference is "+circumference.toFixed(1));
console.log("circumference is "+circumference.toFixed(2));
console.log("circumference is "+circumference.toFixed(3));
console.log("circumference is still "+circumference);
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

The <code>toFixed()</code> method returns a string representation of the
number, with the number of decimal places given by the argument.  It does
not change the value of the variable, as the last step shows.

## Other Date Functions

The earlier date manipulation code was all numerical.  That's partly
because JavaScript is global, and they decided not to have a built-in
function to map month zero to <q>January</q> when it could just as easily
have been Janvier (French), Enero (Spanish) or Styczen (Polish).

Despite this, we decided to implement a simple function that maps
month-numbers (ranging from 0 to 11) to English month-names. Try it out:

<form>
<div>
<textarea rows=10 cols=80>
function monthName(index) {
    var names = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return names[index];
}    

alert(monthName(0));
var dateObj = new Date();
var this_month = dateObj.getMonth();
alert(monthName(this_month));
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

How would you print the name of the month 10 months from now?

## Array Methods

Here are some handy [methods for JavaScript arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

* `push` adds a new element onto the end of an array
* `pop` removes and returns the last element of the array
* `shift` removes the first element of an array
* `unshift` adds an element onto the front
* `indexOf` searches for an element and returns its index (-1 if not found)
* `splice` optionally removes some elements from the middle and optionally inserts some
* `slice` copies an array

Try them out. The following uses `JSON.stringify` to convert an array into
a string, so that we can print it easily. We'll learn more about that
function later.

<form>
<div>
<textarea rows=10 cols=80>
var weekdays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];

console.log(weekdays.pop())
console.log(weekdays.unshift());
console.log(weekdays.length);
console.log(weekdays.indexOf('Wed'));
console.log(weekdays[weekdays.indexOf('Wed')]);
weekdays.splice(2,1,"Odin's Day");

console.log(JSON.stringify(weekdays));
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

## the `forEach` method

Arrays also have a `forEach` method that takes a *function* as its
argument, invoking the function for each element of the array. The
function is invoked with 3 arguments: the array item, its index in the
array, and the array.  (You don't usually need the last argument.)

<form>
<div>
<textarea rows=10 cols=80>
var shopping = ['Apples','Bananas','Chocolate'];

shopping.forEach(function (item,index) {
    console.log(index+": "+item);
    });

</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>


## JavaScript Object Literals

It's now time to return to talking about <a
href="http://www.w3schools.com/js/js_objects.asp">JavaScript objects</a>
in general rather than just date objects.

In JavaScript, an object is a collection of data (properties and methods.
This collection can be arbitrarily complex, including having other objects
inside the containing object (much like a folder can contain other
folders), but for now let's keep it simple:

<blockquote> A object is a
collection of <em>properties</em> (also called <em>keys</em>) and
<em>values</em>.  We use the properties (keys) to look up the values.
We'll use the terms <q>properties</q> and <q>keys</q> interchangeably
</blockquote>

We'll ignore methods for now and focus on properties.

Let's be concrete.  Imagine that we have an object to keep track of a
user's info, including their name, year of graduation and whether they're
going to the party.  So, the three properties will be:

1. `name`
1. `gradYear`
1. `going`

We'll begin with a particular person, Alice, who is the class of 2019 and
is going to the party.  We'll store all that info in a single object and
we'll store the object in a variable called <code>person1</code>.  We can
make a second object about another person, Betty.

<p>Consider the following JavaScript code:
  
<pre class="sh_javascript">
var person1 = {name: "Alice", gradYear: 2019, going: "yes"};
var person2 = {name: "Betty", gradYear: 2020, going: "no"};
</pre>

<p>Try copy/pasting that code into a JavaScript console.  Look at the
  resulting objects:
<pre class="sh_javascript">
>>> person1
>>> person2
</pre>

JavaScript even has a cool <code>dir</code> feature that breaks out all
the properties into separate, clickable things.  This is particularly
useful for big, complicated objects, such as windows.  Try it:
  
<pre class="sh_javascript">
>>> dir(person1)
>>> dir(window)
</pre>

Let's repeat those assignment statements, together with an abstraction:

<pre class="sh_javascript">
  var person1 = {name: "Alice", gradYear: 2019, going: "yes"};
  var person2 = {name: "Betty", gradYear: 2020, going: "no"};
  var person2 = {prop1: value1, prop2: value2, prop3: value3};
</pre>

The things on the right hand side are called <em>object literals</em>.
The syntax of an object literal is an opening brace, a series of
property/value pairs separated by commas, and a closing brace.  Each
property/value pair consists of a property (which follows the same rules
as the names of variables), a colon, and a value.  The value can be any
JavaScript value, such as a number, string, or another object.  Each of
these object literals has three property/value pairs, but a JavaScript
object can have any number of pairs, including none:

<pre class="sh_javascript">
  var empty_person = {};
</pre>

## JSON

The JavaScript Object Notation is pretty simple and easy to read:

* braces around key:value pairs
* key:value pairs separated by commas
* keys separated from values with a colon
* keys are strings
* values are either
    * atomic data like strings, numbers, and booleans, or
    * compound data like arrays or objects

Because of this simplicity and readability, JavaScript Object Notation
(JSON) has become very popular for passing data around the web.  To turn a
data structure into a JSON string, use `JSON.stringify()`. To reverse that
operation, use `JSON.parse`:

<form>
<div>
<textarea rows=10 cols=80>
var shopping = ['Apples','Bananas','Chocolate'];

var s = JSON.stringify(shopping);

console.log("s is "+s);

var again = JSON.parse(s);

console.log(typeof again);
console.log(again[1]);

</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

## Object Operations

Given an object, there are a few things you might want to do to it:

* Retrieve the value associated with a property
* Modify the value associated with a property
* Add a new property/value pair
* Remove a property/value pair

Here are some specific examples of those operations with the `person1`
object:
  
<form>
<div>
<textarea rows=25>
var person1 = {name: "Alice", gradYear: 2019, going: "yes"};

// retrieving two values:
console.log(person1.name+" will graduate in "+person1.gradYear);

// modifying one value
person1.going = "no";  // something came up

// see what the result is:
console.log("after first mod: "+JSON.stringify(person1));

// add a new property/value pair
person1.dorm = "Pom";
console.log("after adding dorm: "+JSON.stringify(person1));

// retrieve two values:
console.log(person1.name+" lives in "+person1.dorm);

// remove a property/value pair
delete(person1.dorm);
console.log("after removing dorm: "+JSON.stringify(person1));
</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

You'll notice that the way we add a new property/value pair is identical
to the way we modify an existing property/value pair: just an assignment
statement.  That's because JavaScript creates the property if necessary,
and then updates the value.  In practice, removing a property/value pair
is rarely done, so we really only need to remember two operations:
<em>getting</em> and <em>setting</em>.

Here are two assignment statements that demonstrate both getting and
setting.  On the right hand side, we <em>get</em> a value out of one
object and on the left hand side we <em>set</em> a value of an object.

<form>
<div>
<textarea rows=10>
var person1 = {name: "Alice", gradYear: 2019, going: "yes", dorm:"Pom"};
var person2 = {name: "Betty", gradYear: 2020, going: "no", dorm:"Caz"};
// Betty moves to Alice's dorm
person2.dorm = person1.dorm;
alert(JSON.stringify(person2));

// Alice decides to delay her graduation by a year:
person1.gradYear = person1.gradYear + 1;
alert(JSON.stringify(person1));
</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

The syntax for getting and setting look the same: a variable, a dot, and a
property.

The markers on a Google Map are another example of objects.  Those markers
are objects with properties like <code>lat</code> and <code>lng</code>
(latitude and longitude), along with other info.  For example, something
like:

<pre class="sh_javascript">
  var marker1 = {lng: 42.296612,lat: -71.301956}; // Wellesley
</pre>  

** Unknown or Odd Properties

The syntax we learned above to get and set a value in an object
(<code>variable.property</code>) is simple and effective but fails in two
cases: if the property is unknown and if the property contains odd
characters, such as spaces or hyphens.

<p>For example, suppose instead of calling the property <code>gradYear</code>,
  we wanted to call it <code>grad year</code> (with a space in it).  The
  following doesn't work at all:

<pre class="sh_javascript">person1.grad year = 2020;</pre>

Usually, we can get around this very simply by limiting ourselves to
property names that don't have spaces, hyphens, semi-colons and other
oddities.

A slightly more difficult case comes where we don't know the property in
advance.  For example, we have an object that stores the dimensions of an
image, with properties <code>width</code> and <code>height</code>.  We
want to retrieve the larger dimension, and we've stored the property in a
variable called <code>larger_dim</code>.  The following fails, because it
tries to look up a property named <code>larger_dim</code> instead of one
named <code>height</code>.

<form>
<div>
<textarea rows=5>
  var rect1 = {height: 200, width: 100};
  var larger_dim = "height";
  var dim = rect1.larger_dim;
  alert("the "+larger_dim+" is "+dim);
</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

There is a solution to both problems: the syntax to get/set a value in an
object can be a string in square brackets.  Here's an example that works.
Note that the expression in the square brackets is a literal string.

<form>
<div>
<textarea rows=4>
var person3 = {name: "Cathy",dorm: "Tower"};
person3["grad year"] = 2021;
alert(JSON.stringify(person3));
</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

Here's the same syntax used to solve the second problem of an unknown
property.  Note that here, the expression in the square brackets is a
<em>variable</em> (<code>larger_dim</code>) that contains a string.
  
<form>
<div>
<textarea rows=6>
  var rect1 = {height: 200, width: 100};
  var larger_dim = "height";
  var dim = rect1[larger_dim];
  alert("the "+larger_dim+" is "+dim);

</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

In fact, if you want to, you can always use the square bracket notation,
and ignore the dot notation.  For example:

<form>
<div>
<textarea rows=6>
var person1 = {};
person1["name"] = "Debbie";
person1["grad year"] = 2016;
person1["dorm"] = "Stone D";
alert(JSON.stringify(person1));
</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

However, most programmers appreciate the brevity and reduced punctuation
of the dot notation, so you will see it a lot.

## Looping over an Object's Properties

Sometimes it's useful to be able to loop over all the properties of an
object.  JavaScript has a built-in syntax, a special kind of loop, for
doing just that.  For example, the following will alert all the properties
in an object:

<form>
<div>
<textarea rows=5>
var person1 = {name: "Alice", gradYear: 2019, going: "yes"};
for(var prop in person1) {
   console.log(prop);
}
</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

The following variation alerts all the values in an object. Note that
using the square bracket notation is necessary here, because each time
through the loop the variable <code>prop</code> has a different value.

<form>
<div>
<textarea rows=5>
var person1 = {name: "Alice", gradYear: 2019, going: "yes"};
for( var prop in person1) {
   console.log(person1[prop]);
}
</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

The syntax for this loop is

<pre class="sh_javascript">
for ( var P in OBJ ) {
    // loop body here
}
</pre>

The <code>P</code> is a <em>new</em> variable and we declare it here to
avoid creating a global variable.  It is given a value (as if by an
assignment statement) before each time through the body of the loop. Those
values will the properites of the object.  The <code>OBJ</code> is an
<em>existing</em> variable that holds an existing object.

Here's one last example, which counts the number of properties in an
object.  

<form>
<div>
<textarea rows=7>
var person1 = {name: "Alice", gradYear: 2019, going: "yes"};
var prop_count = 0;
for ( var prop in person1 ) {
    prop_count++;
}
console.log("That object has "+prop_count+" properties.");
</textarea><br>
<input type=button value="Execute It" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</div>
</form>

<script>
(function () {
    var dateObj2 = new Date();
    $("#date_examples tr").each(function(index,elt) {
         console.log(elt);
         var $elt = $(elt);
         var exp = $elt.find("td.exp").text();
         var val = eval(exp);
         $elt.find(".val").text(val);
     });
})();
</script>
