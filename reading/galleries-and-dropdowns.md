# Galleries and Drop-downs

Our topic for the next class is learning how to do two very common tasks
on websites:  image galleries (slideshows) and drop-down menus.

There are many solutions for these problems, including fancy transitions
between slides and much more. We're going to keep it fairly basic, though.

Rather than write up how to do this, I'm going to defer to two
descriptions that are on [W3Schools](https://www.w3schools.com/). Let me
know whether you find the links below reasonably clear.  We will talk
about them in class and implement some examples.

## Slideshows

A slideshow displays one of a set of images, rotating through them. It has
arrows to advance the slideshow or move it backwards, little buttons to
indicate where we are in the set and lots of other eye candy. 

[slideshow](https://www.w3schools.com/howto/howto_js_slideshow.asp)

## Automatic Slideshows

To have a slideshow automatically advance, it's sufficient to have a
function that will manually advance the slideshow, and then have the
browser invoke that function every few seconds. That's easily done with
the built-in JavaScript `setInterval` function.

Learn more about `setInterval` from MDN:  [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

## Clickable Dropdowns

We want to be mobile-friendly and old-fashioned drop-down menus typically
drop-down when the mouse is hovered over them. But we can't "hover" on a
touch-screen device. Instead, we will click to open/close a drop-down
menu. Here's one way:

[clickable dropdown](https://www.w3schools.com/howto/howto_js_dropdown.asp)

