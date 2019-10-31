# JavaScript Methods

## Announcements

## Outline

In a few minutes, we'll go to where we left off last
time.

1. Quiz questions
1. Exercise 3: Arrays and Loops
1. Exercise 4: Sorting Arrays
1. Methods
1. Exercise on Date Methods
1. Exercise on Array Methods
1. JSON
1. Shallow versus Deep copying

## Other things we learned:

* Open the `stuff.html` file in a new browser tab
* Use the console.log from the `stuff.html` browser tab

## Quiz Questions

[your questions](../../quizzes/quiz06.html)

## Resume

Now, let's go to [where we left off last time](../L06/js1.html#arrays)

## Functions

Functions can be passed more or fewer arguments than they are defined to
take. JavaScript won't throw an error. This gives you the flexibility of
having *optional* arguments, but at the cost of less error checking.

```
:::javascript
function add2(x,y) {
    console.log('x is '+x+' and y is '+y);
    if( x == null ) {
        throw new Error("x can't be null");
    }
    if( y == null ) {
        y = 1;
    }
    return x+y;
}
```

Try with the following:
```
add(3,4);
add(3,4,5);
add(3);
```

## Methods

* Syntax:  `var.meth(arg1,arg2,...)`
* Syntax:  `(object returning expression).meth(arg1,arg2,...)`
* Can modify the object, return values, or both

## Date Methods

Here's a reference for [date methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Do the following setup steps:

```
cd ~/public_html/cs204/
mkdir js2
cp ~cs204/pub/lectures/L07/starter.html js2
cd js2
code starter.html
```

Write a function named `uk_date` that returns a string using
day/month/year notation for the given date (an argument).

<div class="solution">
<pre class="codehilite">
function uk_date(date) {
     return date.getDate()
            +'/'+(date.getMonth()+1)
            +'/'+date.getFullYear();
}
</pre>
</div>

Test it like this:

```
:::javascript
uk_date(new Date());           // today!
uk_date(new Date(2018,11,25)); // Christmas, 2018
uk_date(new Date("2/14/2017")); // Valentine's day, 2017
```

Note that the argument is *not* a string. It's a *date* object. The
constructors above should make that clear, since only one of them has a
string, and that one is an argument to `Date` not to our `uk_date`
function.


## Array Methods

Here's a reference for [array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

Write a function to replace the `computeCurve` function using `forEach()`

Here's the original that we want to replace:

```
:::javascript
function computeCurve(inputs, func) {
    var outputs = [];
    for ( var i = 0; i < domain.length; i++ ) {
        outputs[i] = func(inputs[i]);
    }
    return outputs;
}
```

Here's an example of it in action:

```
:::javascript
computeCurve([1,4,9,16], Math.sqrt) => [1,2,3,4]
```

<div class="solution">
<pre class="codehilite">
function computeCurve2a(inputs, fun) {
     var results = [];
     function push1 (input) {
         // invoke the user's function on one input 
         var output = fun(input);
         // report the input/output pair
         console.log(input+ " maps to "+output);
         // add it to the accumulated results
         results.push(output);
     }
     inputs.forEach( push1 );
     return results;
}
</pre>
<p>Look in <a href="solved.html">solved.html</a>
</div>

Here's a version using an anonymous function:

<div class="solution">
<pre class="codehilite">
function computeCurve2d(inputs, fun) {
     var results = [];
     inputs.forEach( function (input) { results.push(fun(input)); });
     return results;
}
</pre>
</div>

Code like this is quite common in certain operations on the DOM.

You can copy `~cs204/pub/lectures/L07/solved.html` to get the solutions.


## Object Literals

* You can package a heterogeneous collection of data into an object using
  an object literal
* syntax: `{prop1: val1, prop2: val2 }`
* be careful about commas versus semi-colons!
* syntax to get a value: `var.prop`
* syntax to set a value: `var.prop = val;`

<div>
<textarea rows=10>
  var fred = {name: "fred", twin: true, dob: new Date("5/21/1995 2:00 am")};
  console.log("fred's dob: "+fred.dob);
  fred.hair = "red";
  console.log("fred's hair color: "+fred.hair);
  fred["brother"] = "George";  
  console.log("fred's brother: "+fred.brother);
  console.log("currently fred is: %o",fred);
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</form>
</div>
  
## loop over properties:

<div>
<textarea rows=7>
var fred = {name: "fred", twin: true, dob: new Date("5/21/1995 2:00 am")};
console.log("Fred's properties");
for( var p in fred ) {
    console.log(p);
}    
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</form>
</div>

Loop over values:

<div>
<textarea rows=7>
var fred = {name: "fred", twin: true, dob: new Date("5/21/1995 2:00 am")};
console.log("Fred's values");
for( var p in fred ) {
    console.log(fred[p]);
}    
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</form>
</div>

## JSON

JSON handles lots of primitive datatypes (numbers, strings, booleans), and
compound datatypes (arrays and objects) but *not* custom objects like
dates.

<div>
<form>
<textarea rows=8>
  var fred = {name: "fred", twin: true, dob: new Date("5/21/1995 2:00 am")};
  var str = JSON.stringify(fred);
  console.log(str);
  var again = JSON.parse(str);
  console.log('dob same? '+(fred.dob === again.dob));
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</form>
</div>

Notice that:

* properties are in string quotes (so no worries about spaces and such)
* excess space is squeezed out
* date objects are converted to strings

## JSON and stringify/parse

JSON is a *notation* for a data structure. The data structure might be
dynamically generated.

```
data = ["a" ];
data[1] = Math.random();
data[2] = data[1] > 0.5;  // true or false
data[3] = (new Date()).toDateString();

console.log(typeof data);  // an object

str1 = JSON.stringify(data);

console.log(typeof str1);  // a string

data2 = JSON.parse(str1);

data === data2;
```

## Shallow versus Deep Copying

If you read carefully in the documentation on copying an array using
`.slice()` it says it's a *shallow* copy. That means it's a new array with
the same old elements in it.

Let's start with a slightly easier example:

<div>
<form>
<textarea rows=5>
  var fred = {name: "fred", twin: true }
  var george = fred;
  fred.hair = "red";
  alert(george.hair);
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</form>
</div>

If we do a shallow copy of an array, we just point to the same objects:

<div>
<form>
<textarea rows=10>
  var fred = {name: "fred", twin: true};
  var a = ["one", true, 3, fred];
  var b = a.slice();
  b[1] = false;
  console.log('element 1 same? '+(a[1] === b[1]));
  fred.hair = "red";
  console.log('element 3 same? '+(a[3] === b[3]));
  console.log('b[3] is '+JSON.stringify(b[3]))
</textarea><br>
<input type=button value="Execute it" 
       onclick="eval(this.parentNode.firstElementChild.value)">
</form>
</div>

## == versus ===

Those with sharp eyes noticed that we used `===` instead of `==` to
compare.

* The triple-equal is strict. The two operands have to be of the
same type and value.
* The double-equal is loose: the operands are coerced
to the same type, if possible, and then compared.

Usually, we use strict equality. There are many subtleties to the loose
equality (though it's useful above, where we check for missing
arguments). Here's what the Mozilla Developers Network has to say about
[equality
comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

<script>
var revealAt = "9/26/2017 5:00 pm";
</script>
