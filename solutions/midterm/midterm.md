# Midterm Exam

People did pretty well. Some common errors:

## Q1 two col CSS

Have to set widths on the children (the two columns). Many people forgot
that the default width of block elements is 100%

flex will work. `display:flex` on the *parent* and `flex:1 0 auto` on the
*children* 

`display:inline-block` will work.

`float:left` will work

`position:absolute` will work but shouldn't be used.

There were some selector errors. I gave you lots of options:

```
<main>
<aside id="menu" class="options">
<ul>
    <li>ABC</li>
    <li>CBS</li>
    <li>NBC</li>
    <li>CNN</li>
</ul>

</aside>
<article id="content" class="story">
Lorem ipsum dolor sit amet, ...
</article>
</main>
```

Tags: `main`, `aside` `article`

IDs: `#menu` `#content`

classes:  `.options`, `.story`

## Q3 CSS Hover

Describing something in English is a skill. You have to think
abstractly. Summarize the overall effect or behavior. Try to ignore the
implementation details.

A common, good student response:

```
the class fred first has an opacity of 0, meaning it is not
opaque.  When the user hovers her mouse over the "fred"
element, it will turn perfectly opaque in a span of 3 seconds
```

What I had in mind:

```
The CSS causes elements of class fred to fade in when hovered
over. They fade out when the mouse leaves. The transition
takes 3 seconds.
```

Very few people used the word "fade"

## Q4 Holidays

People did well on this, but generally the coding was wordy. Here's how I
solved it:

```
:::JavaScript
(function () {
    var today = new Date();
    var m = today.getMonth()+1;
    var d = today.getDate();
    if( (m == 10 && ( d == 10 || d == 11 )) ||
        (m == 11 && ( d >= 22 && d <= 27 ))) {
        alert("no class today");
    }
})();
```

There were lots of clever solutions using date strings and such, so the
preceding isn't the only way.

IIFEs were a problem though. Many people defined a function and then
didn't invoke it, or invoked it without an argument that it needed:

```
:::JavaScript
(function isBreak(today) {
   ...
})();
```

Sometimes people didn't invoke it.

## Q5 Frenemies Lists

People did reasonably well on this, particularly given the complexity of
the problem. (I think this was the hardest problem.)

First: Distinguish between a click handler on `UL` versus each
`LI`.  Think about the otters! We put the click handler on *each*
thumbnail, not on the parent element.

Imagine the HTML:

```
:::HTML
<ul id="friends">
   <li data-name="Harry">Harry</li>
   <li data-name="Ron">Ron</li>
   <li data-name="Hermione">Hermione</li>
</ul>
<ul id="enemies">
   <li data-name="Draco">Draco</li>
   <li data-name="Snape">Snape</li>
   <li data-name="Voldemort">Voldemort</li>
</ul>
```

Use a *descendant selector* to get the LI elements. Here's what I
intended:

```
:::JavaScript
$("#friends > li")
    .click(function () { alert("They are awesome"); });
```

If you leave out the `> li` (which many of you did) it works, but for
reasons we won't get to until later.

For the second part:

```
:::JavaScript
$("#enemies > li").each(function (index,elt) {
     var name = $(elt).attr('data-name');
     $(elt).click(function () { alert("I hate "+name); });
});
```

If you don't put the event handler on the `LI`, there's no `data-name`
attribute to use.

Remember how to do `alert()`.

To see it in action; here is a [jsfiddle](https://jsfiddle.net/hv4r47ss/)


## Q6. Code Description

As I said before, describing something in English is a skill. Try to
distinguish process from result. Typically, we would describe just the
result.

```
:::JavaScript
var pts = [{x: 10, y: 50}, {x: 20, y: 30} ... ];

function foo() {
    var z = 0;
    function bar(e) {
        if( e.x > z ) {
            z = e.x;
        }
    }
    pts.forEach(bar);
    return z;
}
```

Which do you like better. This:

<div style="border: 1px solid black; padding: 2ex 1em"> <p>For each
element (coordinate pair) in the pts array, the function bar(e) will be
called on it, and x will be evaluated and subsequently this may or may not
change the value of z, depending on x is greater than foo's variable
z. The function foo asks it to return the value of z for each element of
the array.</p> </div>

Or this:

<div style="border: 1px solid black; padding: 2ex 1em">
<p>The function returns the largest x coordinate in the array of points.</p>
</div>

If you were *naming* this function, you would name it something like
`largestX` or something like that. Good function names are usually about
results, not process.

## Q7. Objects and Methods

Here's the intended solution:

```
:::JavaScript
function Point(x,y) {
    this.x = x;
    this.y = y;
}

var p0 = new Point(10,50);   // example point

Point.prototype.isQuadrantI = function () {
     return this.x > 0 && this.y > 0;
};

console.log(p0.isQuadrantI()); // true
```

Common errors included

* not assigning the method to the prototype
* using arguments instead of `this` (so it's not a method)
* omitting examples


## Q8 Mobile-Friendly

People did *very* well on this, and I wasn't too picky. An ideal answer:

1. The page should be designed for small devices by default
1. The page should use media queries so that layout can be improved on
large devices
1. The page should be *responsive*
1. Where appropriate, elements should scale with the size of the
browser, using widths that are in percentages.
1. images, in particular, should scale with the page

## Q9. HTML/URLs

People did great on this, except for the URLs.

Given:

```
hogwarts
    houses
        gryffindor.html
    students
        hermione.html
        images
            granger.jpg
        students.html
```

What are links from `hermione.html` to:

* `granger.jpg`
* `gryffindor.html`
* `students.html`
* `www.facebook.com`

