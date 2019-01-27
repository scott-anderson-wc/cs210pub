# Slideshows and Drop-downs

Today, we'll look at some fun and useful techniques. It won't be a lot of
JavaScript, but it'll interact with the HTML and CSS, so you have to pay
attention to all the pieces.

We'll also look at the next programming assignment.

## Plan

1. Slideshows recap
1. Dropdowns recap
1. Answer your questions
1. Build a page with a slideshow and dropdown menu
1. Jelly Blobs of DOOM!

## Slideshows

The essential ideas are these:

* all the images are there in the HTML when the page loads
* all the images but one are *hidden*
* there are buttons/icons/arrows that have click handlers to change to next/prev slide
* the JS changes which image is shown, hiding all the rest
* there are buttons/icons/dots that have click handlers to jump to that
particular slide

The CSS ensures that there is a container that all the slides, buttons and
other stuff are positioned relative to.

## W3Schools Code

We'll spend some time walking through this code

[slideshow](https://www.w3schools.com/howto/howto_js_slideshow.asp)

## Criticisms

I like the W3Schools example. It looks nice, the code is reasonably clear,
and it works.  I have a few objections to the JS code:

First, modern practice is to separate the JS code from the HTML, so avoid `onclick="jscode"` in favor of adding an attribute and then attaching the event handler:

```
:::HTML
<a class="next" onclick="plusSlides(1)">&#10094;</a>
```

becomes

```
:::HTML
<a class="next">&#10094;</a>
```

with this JS/JQ:

```
:::JavaScript
$("a.next").click(function (event) { plusSlides(1); });
```

Second, I dislike code that has side-effects in arguments:

```
:::JavaScript
var slideIndex;

function plusSlides(n) {
    showSlides( slideIndex += n );
}    
```

I'd rather see:

```
:::JavaScript
var slideIndex;

function plusSlides(n) {
    slideIndex += n;
    showSlides( slideIndex );
}    
```

Third, they use global variables, so you can't have multiple slideshows on
one page.  (But this makes the code simpler and clearer, and it's easy
enough to wrap all this up in an IIFE.)

Fourth, they did it in raw JS instead of JQ. 

None of these are fatal flaws, just minor objections.

## Alternatives

Here's another way to do the slideshow, in which all the slides are
arranged left to right within a container that is only big enough to show
one at a time. By sliding the whole ensemble to the left, you can advance
the slides in a nice way:

[cs110 f15 animation
slideshow](http://cs.wellesley.edu/~cs110f15/reading/animations.html)

Here's yet another way, using a lightbox:

[cs110 s16 animation slideshow](http://cs.wellesley.edu/~cs110s16/reading/galleries-and-drop-downs.html)

[cs110 s16 lightbox gallery](http://cs.wellesley.edu/~cs110s16/project/min-reqs/gallery/gallery.html)

There are dozens of JS libraries to do slideshows. Google for one and see
what you like. Now that you understand the basic principles, you can teach
yourself other slideshow or gallery implementations.

## Automatic Slideshows

Given a function like `nextSlide`, we can just invoke it every time interval:

```
:::JavaScript
setInterval(nextSlide, 2000);  // every 2 seconds
```

## Clickable Dropdowns

The main ideas are these:

* the dropdown menu is positioned using absolute positioning so that it can overlap other content
* the z-index is used to make sure it's *in front* of other content
* the dropdown is hidden
* the dropdown is shown by clicking on some kind of header
* clicking anywhere closes the dropdown (though nested drop-downs are more complex)

The JS code toggles whether the dropdown is shown or not.

We add a click handler to the window that catches every click that bubbles
up to it. Unless the target is the header (`.dropbtn`), the handler closes
every dropdown.

[W3 Schools clickable dropdown](https://www.w3schools.com/howto/howto_js_dropdown.asp)

## Your Questions

I'll answer [your questions](../../quizzes/quiz19.html)

## Exercise

Copy one of these to your C9 workspace, if you don't already have them.

```
curl -O https://cs.wellesley.edu/~cs204/downloads/otter-images.tar 
curl -O https://cs.wellesley.edu/~cs204/downloads/rps-images.tar
curl -O https://cs.wellesley.edu/~cs204/downloads/hp-images.tar
```

The first is pictures of otters, the second Rock-Paper-Scissors, and the
last is images of Harry Potter characters.

Create a slideshow.

Create an automatic slideshow.

Add a drop-down menu going to three places

[my solution](exsol/exsol.html)

That has some useful abstractions that are worth looking at.

## Assignment 10

We'll look at Assignment 10, Jelly Blobs. In particular, I'll talk about:

* The correspondence between the *model* and the CSS
* The `progress` callback
* Enemies do the checking for collisions, not the player
* Two testing functions I defined

## Summary

Galleries, Slideshows, and clickable drop-down menus are common and the
menus are particularly useful.  The ottergram from Chapter 6 is a nice
gallery.

They are based on hiding an element and revealing it later, triggered by
some event, such as a click or a 

Clickable drop-downs are the modern way because of touch-screen devices.


## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

