# JavaScript DOM

## Outline

1. Object Literals
1. JSON
1. DOM
1. Events
1. Event Handlers

First, let's go to [where we left off last time](../L07/js2.html#object-literals)

## DOM

The DOM is a bridge from JavaScript to the document. It's a set of
objects, properties, and methods that allow JavaScript to modify the
document.

In raw JavaScript:

    
* `document.querySelector()` takes a CSS-style selector
as a string argument, and returns the selected node. (If more than one
matches, it returns the first.)
* `document.querySelectorAll` is just like the previous
method but it returns an array-like list of selected nodes.
* `<em>node</em>.textContent` is an property that
corresponds to the content of the selected node. You can set it to replace whatever is
there. You can only set it to text, not arbitrary HTML.
* `<em>node</em>.addEventListener(type,function)` takes
an event type (such as "click") and a function as its arguments. When
the specified event type happens to the node (e.g. someone clicks on
the node), the function is invoked. That function can
then <q>handle</q> the event in any way it wants to.

## jQuery

* you have to *load* jQuery. Typically from a CDN (like we did with `normalize.css`)
* it defines a global function `jQuery` and a synonym `$`
* technique is usually to *select* some elements and then operate on them
with *methods* like this:

```
:::javascript
$(selector string).method(arg1, arg)
```

## loading jQuery

Here's one example:

```
:::html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
```

or

```
:::html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
```


## Chaining

jQuery methods typically return the same *wrapped set* so that further
methods can be *chained* on:

```
:::javascript
$(selector string).meth1().meth2().meth3();
```

or

```
:::javascript
$(selector string)
    .meth1()
    .meth2()
    .meth3();
```

Notice that the semi-colon to end the statement is *only* on the last line.

## Content Methods:

There are lots of jQuery methods to insert nodes and content and otherwise modify the structure of the document. 

Here are some examples. We'll talk through them.

```
:::javascript
$("<li>").text('apples').appendTo("#groceries");
$("#groceries").append("<li><em>lots</em> of chocolate</li>");
$("#sec1").html("<b>important</b> stuff");
$("#fred > li").remove();
$("#pic").attr("src","fred.jpeg");
```

* The first creates an LI element (notice the angle brackets around it --
  omitting the angle brackets would mean to select all existing LI
  elements). Then, change the text inside the list item to 'apples' and
  append the LI element to the existing element whose ID is `groceries`
* This example shows a different way to attach an LI to an existing
  element.
* The `.html()` method allows any HTML to be inserted, replacing whatever
  content is already there.
* This code removes every LI that is a direct child of the element whose
  ID is `fred`.
* This code changes the `src` attribute of an element, presumably
  something that supports `src` such as an IMG tag. This code allows
  jQuery to dynamically change the *pictures* on a page.  

There are lots more (check the [api.jquery.com](https://api.jquery.com/)
site), but the general idea is what's important. 

Note that if you do a `view source` you *won't* see these changes, because
`view source` is the *original*, not the *current* document.

## Style Methods:

There are also lots of jQuery methods to work with CSS:

```
:::javascript
$("h2").css('color','purple');
$("h2").addClass('important');
$("h2").removeClass('optional');
```

These do pretty much what you'd guess they do.

## Events

When a user does certain actions, they count as *events*:

* click on something
* mouse over something
* change the value of a form input
* submit a form

and many others.

## Event Handlers

The browser has normal actions that it does when an event occurs, but it
can *also* run some of your code. It does that by *invoking* a function
that you set up earlier.

Example:

```
:::javascript
function handleClickOnFred() {
    ....
}    

$("#fred").click(handleClickOnFred);
```

Or, as an anonymous function:

```
:::javascript
$("#fred").click(function () { ... });
```

Note that:

1. Neither of these do anything until the element is clicked on
1. The function is run when the click event happens, not before
1. If the user clicks several times, the function runs each time
1. The function is passed in without putting parentheses after it, which
would invoke it.

## Exercises

We'll walk through these:

<p>Here's a starter web page: <a href="colors1.html">colors1.html</a>. We'll
  view the source (it's short) to make sure we are comfortable with it.

<h2>Exercise 1: Color Rotation</h2>

<p>As you saw, we have the following code:
  <pre><code class="codehilite">
var mainColors = ["red","green","blue","yellow","cyan","magenta"];
var currColorIndex = 0;
</code></pre>

<div class="exercise">
<p>Write a function named <code>nextColor</code> to return the next color
(a string), treating the array as circular. Implement the function using
the JS console. Test it the same way. Note that this won't modify the
document in any way.
</div>

<p>Here's my solution:
<div class="solution">
  <pre><code class="codehilite">
function nextColor() {
    currColorIndex++;
    if( currColorIndex > mainColors.length - 1 ) {
        currColorIndex = 0;
    }
    return mainColors[currColorIndex];
}
</code></pre>
  <p><a href="colors2.html">colors2.html</a>. Test it by opening the
  console and invoking the function a few times.</p>
</div>

<h2>jQuery</h2>

<p>Using jQuery, we can change the CSS for any set of elements by using a
  <em>selector</em> (a string using the same language as for CSS files),
  the <code>.css</code> method, and arguments comprising a CSS
  property-value pair:

  <pre><code class="codehilite">$(sel).css(prop,val);</code></pre>

<p>For example, to change every H2 element to have a line under it, we
    could do:
    
<pre><code class="codehilite">$("h2").css("border-bottom","1px solid green");</code></pre>

<h2>Exercise 2: Setting the Color</h2>

<div class="exercise">
<p>Write a function name <code>setNextColor</code> to set the color of all
  the LI elements in the list of colors to the new color, as returned
  by <code>nextColor</code>. Implement and test it using the JS console.
</div>

<p>Here's my solution:
<div class="solution">
  <pre><code class="codehilite">
function setNextColor() {
    var color = nextColor();
    $("#colorList li").css("color",color);
}
</code></pre>
  <p><a href="colors3.html">colors3.html</a> Test it by opening the
  console and invoking the <code>setNextColor()</code> a few times</p>
</div>

<h2>Events and Event Handlers</h2>

<p>Events are things that happen in the browser, often triggered by the
  user, such as an element being clicked on or the page finishing loading.

<p>The DOM allows developers like us to attach JavaScript functions to be
  invoked when certain events occur.

<p>jQuery makes it easy to do this:
  <ul>
    <li>To attach a function named <code>fred</code>, do this:
      <pre><code class="codehilite">$(sel).click(fred);</code></pre>
      
    <li>To attach an anonymous function, do this:
      <pre><code class="codehilite">$(sel).click(function () {...});</code></pre>
      
  </ul>

<h2>Exercise 3: Attach the Function</h2>

<div class="exercise">
<p>Attach the <code>setNextColor</code> function to the button. Click the
  button to test it.
</div>

<p>Here's my solution:
<div class="solution">
  <pre><code class="codehilite">
$("#nextColorButton").click(setNextColor);
</code></pre>
  <p><a href="colors4.html">colors4.html</a></p>
</div>

<h2>Exercise 4: Change an image</h2>

<div class="exercise"> <p>Given this <a
href="colors4-flowers.html">starting page with flowers</a>, write some
code to replace the roses with violets (`violets.jpeg`).
</div>

<p>Here's my solution:
<div class="solution">
  <pre><code class="codehilite">
$("#flower").attr('src','violets.jpeg');
</code></pre>
  <p><a href="colors4-flowers-solved.html">colors4-flowers-solved.html</a></p>
</div>


<script>
var revealAt = "2/17/2017 5:00 pm";
</script>
