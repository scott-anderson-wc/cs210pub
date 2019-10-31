# Handling Events in JavaScript

This will be a busy day, but be patient; we'll get there.

## Plan

1. Announcements
1. Solutions to assignments 1 and 2
1. The colors JQ exercises from last time
1. Recap concepts and techniques for Chapter 6
1. Draw a picture of what is happening
1. Your questions
1. Review the code from Chapter 6

## Solutions

[assignment 1 solution](../../solutions/a01/a01.html) and 
[assignment 1 notes](../../solutions/a01/notes.html)

[assignment 2 solution](../../solutions/a02/a02.html) and
[assignment 2 notes](../../solutions/a02/notes.html)

## JQuery exercises

We'll go back to last time's exercises and spend time on them.

## Recap of Chapter 6

[Demo](../../front-end-dev-resources/book-solutions/Chapter-06b/ottergram/index.html)

Conceptually, what we do in Chapter 6 is

1. Add some hyperlinks to each thumbnail. We won't actually be using them
as hyperlinks, but we'll be using the clickability of their hyperlink
nature
1. Each hyperlink will also have extra `data-` attributes that will record
useful information about it, such as the URL and title for the detail image
1. We'll define a function that can extract the URL from the thumbnail and
another that can extract the title
1. We'll define a function that can, given a URL and title, will change those values for the detail image
1. We'll define a function that will add a function literal (an anonymous function) to a thumbnail as an event handler
1. We'll map along the list of thumbnails and attach an event handler to each one.

Once we do this, the user will be able to click on a thumbnail to see the
details.

Very cool!

## Picture

I'll draw a picture that covers

* the DOM (thumbnails and detail)
* the attributes
* the event handler(s)

## Questions from last night

[questions](../../quizzes/quiz08.html)

## Code review

We'll look at the code for this. Don't panic. It's less than 70 lines of
JS, including comments.

The code is organized bottom-up, so that each function builds on the
earlier ones.

[Solution](../../front-end-dev-resources/book-solutions/Chapter-06b/ottergram/index.html)

<div class="solution">
<pre class="prettyprint lang-js linenums">
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';

/* Makes an image and caption appear in the detail (big) picture */
function setDetails(imageUrl, titleText) {
  'use strict';

  var detailImage =
      document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle =
      document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

/* pulls out the image URL from a thumbnail */
function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

/* pulls out the image title from a thumbnail */
function titleFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title')
}

/* sets the URL and title of the detail (big)
 * picture from a thumbnail.
 * The first arg is a DOM node. */

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail),
             titleFromThumb(thumbnail));
}

/* adds a click handler to the given thumbnail,
 * a DOM node. The click handler causes the
 * detail (big) picture's attribute to be
 * set from the thumbnail's attributes
 */

function addThumbClickHandler(thumb) {
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);  // non-local var
  });
}

/* return a real array of all the thumbnail nodes. */

function getThumbnailsArray() {
  'use strict';
  var thumbnails =
      document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

/* sets everything up, by getting all the thumbnails and
 * adding an event handler to each one. */

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
}

initializeEvents();   // set everything up
</pre>
</div>

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement
