# Handling Events in JavaScript

This will be a busy day, but be patient; we'll get there.

## Plan

1. Discuss assignment 3 and assignment 4 (next)
1. Answer questions from last Friday
1. Recap concepts and techniques for Chapter 6
1. Draw a picture of what is happening
1. Activity from Chapter 6
1. Review the code from Chapter 6

## Assignment 3 (Zodiac)

People seem to do pretty well. FAQs:

<ol class="questions">
   <li>When do I load jQuery?
            <p>Before you load <code>zodiac.js</code></p></li>
   <li>Why does the IDE report an error when I use <code>$</code>?
            <p>It's not an error; it's a warning</p></li>
   <li>Okay, why is there a warning?
            <p>Because the IDE doesn't know whether $ is a mistake or defined in some other file</p></li>
   <li>Is it all right to have $ defined in another file?
            <p>Yes</p></li>
</ol>

What other questions do you have?

Admonition: be sure to name your work-in-progress `-work` and only rename
it to `-done` when you're finished. That lets us know whether you're done.

## Assignment 4 (Rock-Paper-Scissors Game)

[RPS Game](../../assignments/a04/rps.html)

I'll also demo this.

## Questions from last Friday

[questions](../../quizzes/quiz07.html)

## Recap of Chapter 6

Conceptually, what we are doing in Chapter 6 is

1. Add some hyperlinks to each thumbnail. We won't actually be using them
as hyperlinks, but we'll be using the clickability of their hyperlink
nature
1. Each hyperlink will also have extra `data-` attributes that will record
useful information about it, such as the URL and title for the detail image
1. We'll define a function that can extract the URL from the thumbnail and another that can
extract the title
1. We'll define a function that can, given a URL and title, will change those values for the detail image
1. We'll define a function that will add a function literal (an anonymous function) to a thumbnail as an event handler
1. We'll map along the list of thumbnails and attach an event handler to each one.

Once we do this, the user will be able to click on a thumbnail to see the details.

Very cool!

## Picture

I'll try to draw a picture that covers

* the DOM (thumbnails and detail)
* the attributes
* the event handler(s)

## Questions from last night

[questions](../../quizzes/quiz08.html)

## Activity

Go! Do this!  If you need a starting point, you can download an install this tar file:

* [tarfile](../../downloads/ch05b.tar)
* `curl -O http://cs.wellesley.edu/~cs210/downloads/ch05b.tar`
* `tar xf ch05b.tar`

## Code review
