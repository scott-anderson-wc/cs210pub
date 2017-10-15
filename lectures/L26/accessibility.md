# Accessibility

Today we'll look at some principles for making our websites accessible to
as wide an audience as possible.

We'll also look at my solution to A10 (Jelly Blobs)

## Plan

1. Admin
1. Questions on A11?
1. Discuss Accessibility
1. Answer your questions
1. Explore Taskmin

## Admin

* Return A10 today
* Printouts of A10 solution available now
* Printouts of A11 solution on Friday
* Come to the CS 304 showcase on Friday 10-12
* The final project can be done solo if you wish, for any reason.

## Accessibility

We'll switch to the reading for a while, to discuss/review those ideas:

[reading](../../reading/accessibility.html)

## Navigating without a mouse

Try to get around a website using just the keyboard:

* `tab` to go to the *next* control (link, input, button, etc)
* shift `tab` to go backwards
* `enter` to *click*
* arrow keys, sometimes.

## Buttons vs SPANs

Here are two different things with click handlers:

<button id="button1">click me</button>
<span id="span1">click me</span>

<script src="random.js"></script>

<style>
#button1:focus, #span1:focus { box-shadow: 3px 2px blue; }

#span1 { border: 1px solid gray; padding: 1ex 2em; border-radius: 3px }
</style>

<script>
function changeColor(elt) {
    $(elt).css("background-color",random.color());
}
$("#button1").click( function() { $(this).css("background-color",random.color()) });
$("#span1").click( function() { $(this).css("background-color",random.color()) });
</script>

Here's the HTML:

```
:::HTML
<button id="button1">click me</button>
<span id="span1">click me</span>
```

Here's the CSS. Note how we mark elements that are in focus.  However, the
SPAN can't be in focus; it's not focusable, since it's not a control.

```
:::CSS
#button1:focus, #span1:focus {
    box-shadow: 3px 2px blue;
}

#span1 {
    border: 1px solid gray;
    padding: 1ex 2em;
    border-radius: 3px
}
```

Here's the JS:

```
:::JavaScript
function changeColor(elt) {
    $(elt).css("background-color",random.color());
}
$("#button1").click( function() { changeColor(this); })
$("#span1").click( function() { changeColor(this); })
```

But the button can be used with the mouse, and the span can't.

## ARIA

If you create your own widgets (like our button-like span, above), you can
make them accessible via ARIA.

See [Using the button
role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniquest/Using_the_button_role).

## Buttons vs SPAN buttons

This time, the SPAN uses some extra attributes to make it more like a button.

<button id="button2">no, click me</button>
<span id="span2" role="button" tabindex="0">no, click me</span>

<style>
#button2:focus, #span2:focus { box-shadow: 3px 2px blue; }

#span2 { border: 1px solid gray; padding: 1ex 2em; border-radius: 3px }
</style>

<script>
$("#button2").click( function() { changeColor(this); })
$("#span2").click( function() { changeColor(this); })
$("#span2").on('keypress', function () { changeColor(this); });
</script>

Here's the HTML:

```
:::HTML
<button id="button2">no, click me</button>
<span id="span2" role="button" tabindex="0">no, click me</span>
```

JavaScript is the mostly the same, except for `keypress` handling:

```
:::JavaScript
$("#button2").click( function() { changeColor(this); })
$("#span2").click( function() { changeColor(this); })
$("#span2").on('keypress', function () { changeColor(this); });
```

## Your Questions

I'll answer [your questions](../../quizzes/quiz22.html)

## Alt

There are some interesting quizzes here; we'll do them.

[alt text](http://webaim.org/techniques/alttext)

## Assignment 10

We'll look at the code of Assignment 10 (Jelly Blobs)

First, some concepts and a sketch:

* Interaction between the HTML document and JavaScript
* methods
* the `progress` callback

## Code Review

* We'll start with the HTML file and notice
    * the initial buttons and text
    * the way the files are loaded and used
* We'll look briefly at the CSS file; there's not much there
* We'll look at the JS files, in order.

## Final Project

Our final project is not a game but a practical app that you can use on
your phone. It's not a *native* app, but a web app.

There's a jQuery plugin that can turn [touch movements into mouse
movements](http://touchpunch.furf.com/): 

```
<!-- Thanks to http://touchpunch.furf.com/ -->
<script src="jquery.ui.touch-punch.min.js"></script>
```

You don't have to use this, but playing with the app on your touch-screen
device might be fun.

I will write this assignment up and try to slim down the
requirements. It's significantly difficult, though, so it will take some
effort. Still, I think this is better than a 

## Summary

Accessibility is important.  

* alt text
* figures and figcaptions
* targets that are big enough
* labeled controls
* perspicuous link text
* buttons
* ARIA roles
* tabindex

There's so much more to learn about this. I'm just a beginner myself.

Accessibility principles are high-level and succinct. The devil is in the
details. Accessibility is a thousand tiny details that make your web page
a bit better for someone who often is neglected. Sometimes, those details
differ from time to time.  But don't give up, just because perfection
can't be achieved.
