# The DOM: The Document Object Model

One of the key things that you can do with JavaScript is to modify the
contents of the browser: changing the structure of the document, including
adding and removing content.  You can also alter the style of the
elements, dynamically changing the CSS classes of elements or directly
altering the CSS rules.

The API or Application Programming Interface by which JavaScript can
modify the document is called the Document Object Model, or DOM for short.

The DOM entails a lot, but one thing to know is that your document is a
<em>tree</em> of nodes.  So, for example, this paragraph is a child of the
<code>BODY</code> element, and the <code>em</code> tag earlier is child of
this paragraph.  Next in this section is a <code>UL</code> (unordered
list), which is the <em>nextSibling</em> of this paragraph, and has
several child elements, each of which is a <code>LI</code> (list item).
And so on.

## DOM References

Many of the following are excellent introductions to the DOM, but they
will use the native JavaScript API.  The raw DOM is actually not that hard
to use from JS, but the jQuery library makes it even easier, so rather
than learn two ways to modify the DOM, we'll skip over this and modify the
DOM via JQ.

The following is a list of useful but <em>optional</em> references, but
you don't need to learn the raw JS API to the DOM, so feel free to ignore
those parts.

<aside style="margin: 10px 2em; border: 2px solid gray; background-color: #eee;">
    <p>The following are optional, supplemental readings, if you want:</p>
    <ul>
        <li><a href="http://www.javascriptkit.com/javatutors/dom.shtml">http://www.javascriptkit.com/javatutors/dom.shtml</a> &larr; I like this one a lot.e
        <li><a href="http://www.brainjar.com/dhtml/intro/">http://www.brainjar.com/dhtml/intro/</a> This one looks nice, too.
        <li><a href="http://www.w3schools.com/dom/default.asp">http://www.w3schools.com/dom/default.asp</a> I always like the material at W3Schools.
        <li><a href="http://www.quirksmode.org/dom/intro.html">http://www.quirksmode.org/dom/intro.html</a> There's a lot of good info here.
        <li><a href="http://www.w3schools.com/jsref/dom_obj_all.asp">http://www.w3schools.com/jsref/dom_obj_all.asp</a> &larr; Complete reference for the properties and methods for nodes.

        <li><a href="http://www.w3schools.com/js/js_ex_dom.asp">JavaScript
                HTML DOM Examples</a>.  Ajax uses JavaScript to manipulate
              s  the HTML document a lot, so these examples can be
                interesting.  Don't try to read all of these; but you
                might click on a few that look interesting to you.
</ul>
</aside>
  
## <span id="raw-h2">The DOM in raw JavaScript</span>

Your book uses the JavaScript DOM API that is built into the browser. We
will use jQuery instead, but let's take a minute to look at the built-in
API first.  Specifically, we'll look at these three methods:

<ul>
    
    <li><code>document.querySelector()</code> takes a CSS-style selector
    as a string argument, and returns the selected node. (If more than one
    matches, it returns the first.)

    <li><code>document.querySelectorAll()</code> is just like the previous
        method but it returns an array-like list of selected nodes.

    <li><code><em>node</em>.textContent</code> is an property that
    corresponds to the content of the selected node. You can set it to replace whatever is
    there. You can only set it to text, not arbitrary HTML.
        
    <li><code><em>node</em>.addEventListener(type,function)</code> takes
    an event type (such as "click") and a function as its arguments. When
    the specified event type happens to the node (e.g. someone clicks on
    the node), the function is invoked. That function can
    then <q>handle</q> the event in any way it wants to.
</ul>

<script id="rawScript">
var rawh2 = document.querySelector("#raw-h2");
rawh2.addEventListener("click",function () {
    rawh2.textContent = "Stayin' Alive";
});
</script>

The following code implements a click handler for the header for this
section, so that you click on the header, it will change. Try it!

<pre id="rawScriptDisplay" class="codehilite"></pre>

<script>
document.getElementById("rawScriptDisplay").textContent = document.getElementById("rawScript").textContent;
</script>

Because jQuery makes manipulating the DOM easier, let's learn jQuery.

## jQuery

jQuery is a JavaScript library of useful methods for manipulating the
document, by which I mean things like this:

    <ul>
        <li>Adding structure. For example, the back-end sends some new
        Facebook content; JQ can add that to the page.
            
        <li>Removing structure. You finish composing a Gmail message in a
        little sub-window of your browser window and you click
        on <em>send</em>. JQ can remove the sub-window and put the focus
            back on your main Gmail window.
            
        <li>Modifying style. You type some stuff into a Google Doc, and
        moments later, the phrase "all changes saved" appears at the top
        of the window, then fades to gray and disappears over the course
        of several seconds. JQ not only inserts the text, but sets its
        color and animates its changing color and opacity.
    </ul>

It does a few other things as well, including Ajax. For example, those
Facebook updates, sending mail from Gmail, and sending the document
changes in Google Docs are all done via Ajax.

jQuery has a small footprint, which means it doesn't take a long time to
download to your browser and doesn't take up too much memory once it is
loaded.  It's well-supported and extremely popular.  Google, Facebook, and
many other tech companies use and support it.

For extreme brevity, everything in the jQuery library is accessed by via
one function whose name is <code>$</code> &mdash; yes, the dollar sign
character.  A synonym of the <code>$</code> variable/function is
<code>jQuery</code>, but that's rarely used.  After all, it may be
clearer, but it's six times as much typing!

## <span id="jq-h2">Click Handling Example</span>

As a point of comparison, let's compare jQuery code equivalent to the
example we saw using the raw API.

<script id="js-script">
$("#jq-h2").click(function () {
    $(this).text("Stayin' Alive");
});
</script>

<pre id="js-ScriptDisplay" class="codehilite"></pre>

<script>
document.getElementById("js-ScriptDisplay").textContent = document.getElementById("js-script").textContent;
</script>

(Later in the course, we'll learn more about the special variable
`this` in the above code, but for now, you can think of it as the element
that got clicked.)

You can see that jQuery is a bit more terse than the raw API, which is
nice, but not decisive. It also tries to work the same in all browsers,
hiding their idiosyncracies. It's extremely popular for those reasons.

## jQuery Usage

There's a pattern to most jQuery usage:
  
<pre class="codehilite">
$(selector).method(arg);
</pre>

The <code>selector</code> argument uses CSS syntax to select some set of
nodes in your document to operate on.  The <code>method</code> then
operates on that set in some way.  If the method needs to know additional
info, that's supplied in the arguments.

Here are some examples:
  
<pre class="codehilite">
// change the CSS of all paragraphs (P elements)
// to make the text blue:
$("P").css("color","blue");

// change the CSS of all elements of class "important"
// to have red text:
$(".important").css("color","red");

// change the CSS of the navbar to be red on white.
// Notice the use of an object literal to package up two changes
$(".important").css({"color":"red","background-color":"white"});

// add the class "important" to all H2 elements:
$("h2").addClass("important");

// change the text of all H1 elements to "Cool Stuff"
$("h1").text("Cool Stuff");

// change the HTML of the copyright notice to this year
var d = new Date();
$("#copyright").html("&amp;copy; "+d.getFullYear());

// add bananas to the grocery list.
$("ul#groceries").append("&lt;li&gt;bananas");

// delete all H3 elements from the document
$("h3").remove();

// hide (make invisible via CSS display: none)
// all paragraphs in the sidebar
$("#sidebar p").hide();    
</pre>

We could go on, but you get the idea.

## jQuery API

The jQuery API is well documented.  Here are some of the methods we
used above:

  <ul>
    <li><a href="http://api.jquery.com/css">css</a>
    <li><a href="http://api.jquery.com/addClass">addClass</a>
    <li><a href="http://api.jquery.com/text">text</a>
    <li><a href="http://api.jquery.com/html">html</a>
    <li><a href="http://api.jquery.com/append">append</a>
    <li><a href="http://api.jquery.com/remove">remove</a>
    <li><a href="http://api.jquery.com/hide">hide</a>
  </ul>

You can learn a lot just by poking around in there and reading some of
their examples and notes.

## Method Chaining

The implementation of jQuery uses a clever trick that can create a great
deal of efficiency and brevity.  Supplying a selector to the jQuery
function and invoking it returns a object that represents the set of
matched elements.  That object supports the methods like the ones we
looked above.  Furthermore, most of those methods return <em>the same
object</em> as their return value, which means that we can keep operating
on the same set, just by invoking another method, chaining them together.

That's all very abstract, so let's see some examples.

This first example is how a novice might do a series of things with some
selected objects:

<pre class="codehilite">
$(sel).addClass('important');        // make them important
$(sel).css('color','red');           // make them red
$(sel).append("&lt;em&gt;really!!&lt;/em");   // add an exclamation
$(sel).hide();                       // and hide them??
</pre>

That works fine, but the trouble is that jQuery has to keep finding all
the objects, so it wastes a lot of work.

A more experienced or efficiency-conscious person might do the following:

<pre class="codehilite">
var $elts = $(sel);                 // get some DOM objects
$elts.addClass('important');        // make them important
$elts.css('color','red');           // make them red
$elts.append("&lt;em&gt;really!!&lt;/em");   // add an exclamation
$elts.hide();                       // and hide them??
</pre>

That's efficient, but a bit tedious to type.  (Note that it's a common
convention, but not required, to name variables that hold jQuery object
with a dollar sign). An experienced and terse jQuery coder might do the
following:

<pre class="codehilite">
$(sel).addClass('important').css('color','red').append("&lt;em&gt;really!!&lt;/em").hide();
</pre>

Of course, that's really ugly and hard to read, all in one line like that.
The important point is that each method is just called on the return value
of the one to its left. The layout of the code isn't important, so we are
free to lay out the code nicely, maybe with comments.  So, the true jQuery
expert writes the following (notice the lack of semi-colons, which would
interrupt the chain by ending the statement):

<pre class="codehilite">
$(sel)                           // get some DOM objects
   .addClass('important')        // make them important
   .css('color','red')           // make them red
   .append("&lt;em&gt;really!!&lt;/em")   // add an exclamation
   .hide();                      // and hide them??
</pre>

The preceding is concise, efficient, and easy to read.

**Note:** One drawback of this technique of returning a <q>set of matched
elements</q> is that the empty set is a perfect valid set, so jQuery is
perfectly happy to do all those operations above on an empty set of
elements, thereby doing nothing, and never give you a peep of complaint or
warning.  So if your jQuery isn't working and there's no error message,
scrutinize your selector expressions.  In fact, I often end up doing
something like this when I'm debugging:

<pre class="codehilite">
var x = $(sel);
console.log("matched "+x.length+" elements");
</pre>

If that shows that the number of matched elements is zero, operating on
the set will be pointless.  

## <span id="building">Building Structure</span>

Before we get to events, we should take few minutes to look at operating
on the structure of the document. We'll use jQuery to do this. We'll start
with adding a list of prime numbers to the web page. First, we need to
have a destination for them:

<pre class="brush: html">
  &lt;div id="prime-container"&gt;
    &lt;p&gt;Our primes:
    &lt;ul id="prime-list"&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
</pre>

Now the code to add some primes to that list:

<pre class="codehilite">
function addPrimes( primes ) {
    primes.forEach(function(p) {
             $('&lt;li&gt;').text(p).appendTo('#prime-list')
         });
}

addPrimes( [2, 3, 5, 7, 11, 13, 17] );
</pre>

Here it is:

  <div id="prime-container">
    <p>Our primes:
    <ul id="prime-list">
    </ul>
  </div>

<script>
$(function () {

function addPrimes( primes ) {
    primes.forEach(function(p) {
         $('&lt;li&gt;').text(p).appendTo('#prime-list')
         });
}

/*
    function addPrimes( primes ) {
        var i;
        for( i=0; i < primes.length; i++ ) {
            $('<li>').text( primes[i] ).appendTo('#prime-list');
        }
    }
*/

    addPrimes( [2, 3, 5, 7, 11, 13, 17] );
});
</script>

You might wonder what the '&lt;li&gt;' does as the argument of the jQuery
function, since it's not a CSS selector. What happens is that jQuery
creates the given element, but it is not (yet) attached to the
document. Here, we attach it to the document with <code>appendTo</code>
method.

An alternative way to do this is to build the entire list up and only
attach it to the document at the end. This is more efficient, since the
document only has to be re-rendered once for the list, as opposed to once
for each element.

<pre class="codehilite">
  &lt;div id="prime-container2"&gt;
    &lt;p&gt;Our primes:
  &lt;/div&gt;
</pre>

Here's the variant JS/JQ code:
  
<pre class="codehilite">
function addPrimes2(primes) {
    var $ul = $('&lt;ul&gt;');
    primes.forEach(function (p) {
        $('&lt;li&gt;').text(p).appendTo($ul);
    });
    $ul.appendTo('#prime-container2');
}
addPrimes2( [2, 3, 5, 7, 11, 13, 17] );
</pre>

<script>
$(function () {
    /*       
    function addPrimes2( primes ) {
        var i;
        var listElt = $('&lt;ul&gt;');
        for( i=0; i &lt; primes.length; i++ ) {
            $('&lt;li&gt;').text( primes[i] ).appendTo(listElt);
        }
        listElt.appendTo('#prime-container2');
    }
    */
    function addPrimes2(primes) {
        var $ul = $('<ul>');
        primes.forEach(function (p) {
            $('<li>').text(p).appendTo($ul);
        });
        $ul.appendTo('#prime-container2');
    }
addPrimes2( [2, 3, 5, 7, 11, 13, 17] );
});
</script>

Here it is:

  <div id="prime-container2">
    <p>Another list of our primes:
  </div>

## <span id="events">DOM Events</span>

<script>
$(function () {
function turnEventsRandomColor() {
    var colors = ['red','orange','green','blue','purple'];
    var randIndex = Math.floor(Math.random()*colors.length);
    var randColor = colors[randIndex];
    // jQuery magic to turn it a random color:
    $("#events").css('color',randColor);
}

$("#events").click(turnEventsRandomColor);
});
</script>

In addition to letting us work with the DOM, jQuery lets us work with
<em>events</em>.  Events are important ways of hooking into user behavior:
a user clicking on something or mousing over something is an
<em>event</em>, and we can make things happen when that event occurs.

The way that event-handling in the DOM works is that you can say:

  <blockquote><p><q>when event E occurs to DOM element D, please invoke
        function F</q>.
  </blockquote>

Here's a partial list of some common <a
    href="http://en.wikipedia/wiki/DOM_events">DOM events</a>:

    <ul>
        <li>click:  when you click on something</li>
        <li>dblclick: when you double-click something</li>
        <li>mouseover: when your mouse is moved onto an element</li>
        <li>keypress:  when a key on the keyboard is pressed</li>
        <li>load: when the document or an object like an image finishes loading</li>
        <li>submit: when a form is submitted</li>
    </ul>

Let's make that more concrete.  The H2 header for this section has an ID
and the ID is <code>events</code>. Let's write some code that would turn
that element a random color:

<pre class="codehilite">
var colors = ['red','orange','green','blue','purple'];
var randIndex = Math.floor(Math.random()*colors.length);
var randColor = colors[randIndex];
// jQuery magic to turn it a random color:
$("#events").css('color',randColor);
</pre>

Okay, very nice, but that's not yet what we want.  We'd like the user to
be able to turn the header a random color just by clicking on it.  So, one
step on the way to do that is to package up that code into a function, say
<code>turnEventsRandomColor</code>:

<pre class="codehilite">
function turnEventsRandomColor() {
    var colors = ['red','orange','green','blue','purple'];
    var randIndex = Math.floor(Math.random()*colors.length);
    var randColor = colors[randIndex];
    // jQuery magic to turn it a random color:
    $("#events").css('color',randColor);
}
</pre>

Then, whenever we want to turn that header a random color, we just invoke
the function:

<pre class="codehilite">
turnEventsRandomColor();
</pre>

However, we want the user to be able to have that function invoked by
clicking on the header.  More precisely, we want to say that whenever the
<code>#events</code> element gets a <code>click</code> event, we'd like
that function invoked. jQuery provides a very easy way do to this, using
the same pattern we've seen many times:

<pre class="codehilite">
$("#events").click(turnEventsRandomColor);
</pre>

Scroll back and try it!

Now, there are some <em>very</em> important points to make: we are
<em>not</em> invoking the <code>turnEventsRandomColor</code> function
right now.  Instead, we are giving it to the <code>click</code> method,
much like we gave the <code>'color'</code> string and the value of the
<code>randColor</code> variable to the <code>css</code> method above.
That is, the function is merely a piece of data that is being passed as an
argument.  It is not being invoked now.
  
To invoke a function we give its name (or, equivalently, a variable whose
value is the function) followed by parentheses containing any arguments to
be passed.  Since we are not invoking <code>turnEventsRandomColor</code>
now, it's not followed by parentheses.

When does it get invoked?  The browser will invoke it when the event
happens.  The function is an <em>event handler</em>.

The function is also an example of a <a
href="http://en.wikipedia.org/wiki/Callback_(computer_programming)"><em>callback</em></a>.
A callback is a general Computer Science term for a function that is
invoked <em>later</em>, when something happens or has happened.  They're
used in graphics programming, processing data, GUI programming and lots of
other situations.

By the way, an experienced jQuery programmer wouldn't bother to devise
that cumbersome name (<code>turnEventsRandomColor</code>) for a function
that she is never going to refer to again after handing it to the
<code>click</code> method.  Instead, she uses an <em>anonymous</em>
function literal, putting all the important code right where she needs it:

<pre class="codehilite">
$("#events").click(function () {
    var colors = ['red','orange','green','blue','purple'];
    var randIndex = Math.floor(Math.random()*colors.length);
    var randColor = colors[randIndex];
    // jQuery magic to turn it a random color:
    $("#events").css('color',randColor);
});
</pre>

The whole function literal is the argument of the <code>click</code>
method &mdash; notice the close paren on the last line, after the closing
brace of the function literal.
