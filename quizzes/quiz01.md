<ol class="questions">

<li>What are the differences between the different HTML versions?

<p>Different tags, different syntax (e.g. <code>&lt;img&gt;</code> versus <code>&lt;img/&gt;</code>). Very annoying.

<li>Are there specific rules on how to style the HTML code (such any rules
on indentation and which tags should be on a different line from their
contents)?

<p>Indentation is key. Distinguish between block elements and inline
elements, but the most important goal is readability.

<li>In this course, is it a good practice to rely on autocomplete features
when coding in HTML? Or is it better to manually type everything out so
that we can learn to code from scratch when needed (without autocomplete)?

<p>I think autocomplete is fine, but on an exam, you'll want to have a
fair amount in your head, so pay attention to what it is supplying for
you. But also, on an exam, I won't worry about the stuff that could be
done by auto-complete. The more important things will be what tag you choose.

<li>Not about this specific reading, but in general, I was wondering how much placement matters in the HTML code, for instance, if you want to put 2 different things in the body, does the order effect it?

   <p>Order is important. E.g., this list. Indentation and such won't be
   noticeable to the user, so that's used for your co-workers and yourself.

<li>In the textbook reading it used <code>&lt;span&gt;</code> multiple times in an unordered
list and I'm wondering why they used <code>&lt;span&gt;</code> instead of <code>&lt;p&gt;</code> since it's such
a short amount of text?

<p><code>span</code> is an inline element, while <code>p</code> is a block element. It also has
different semantics. Let's look at the examples you are thinking about.a

<li>Is the "alt" attribute necessary?

<p>For accessibility, yes.

<li> What is an alternative to DevTools in Chrome?

<p>Firebug is a free plug-in for many browsers. Firefox has its own developer
tools, as does Safari.

<li>What were some of the features in CSS 2.1 that were removed?

<p>Hunh. I don't know! But I found this page on <a href="https://www.thoughtco.com/css2-vs-css3-3466978">differences between CSS 2
and CSS 3</a>. There are some
new selectors; those can be useful.

<li>Interested in learning more about favicons

<p>Google for "mdn favicon" will get you more than I know!
Essentially, it's a small (usually like 16x16 image that the browser
requests with each page and is displayed in tabs and such). Very cool.               

<li>What is the importance of having a favicon.ico?

<p>Decoration only.

<li>What is a relative path?

<p>The sequence of folders from one file to another. We'll talk more about
that today.

<li>I'm still a little confused about relative paths, and how those work
for web pages which are out and about in the world.  Where do the html and
image files for web pages like the one I'm typing this into now reside?

<p>Relative paths
always refer to a file on the same machine. Look up in the URL. If it's
<code>sakai.wellesley.edu</code>, then all the images and such will probably come
from there, though of course they could use an absolute URL and refer to a
separate server. 

<li>It looks like the new tag additions that HTML5 uses (like "nav" and
"header") are used simply to streamline the process of styling different
parts of the document (via CSS), however the list provided in the website
reading doesn't necessarily encompass everything that might be on a
webpage so I'd expect that's when regular "div" tags to be used. My
question is, if we were (for example) to want to style two or more types
of "headers", is there the ability to designate multiple styles, or is the
header tag just a single style with no room for alternate versions (like
the way <div> is used).

<p>The most important purpose of semantic tags is for browsers to
understand what the meaning of some element is. So, if you use <code>&lt;nav&gt;</code>,
all browsers have the opportunity to make that easier to get to. <code>&lt;nav&gt;</code> has
no styling advantage over <code>&lt;div class="links"&gt;</code>, so it's not streamlined
in any way.

<p>Yes, you can style headers differently, by labeling them with different
classes (or putting them in different contexts).

<li>How exactly does the accessibility different when you don't wrap link texts around words? What is happening in the computer in each cases?

<p>Accessibility of image links is a good question. The image should have
an <code>alt</code> attribute, of course. See <a href="http://webaim.org/blog/alt-text-and-linked-images/">image
links</a>

<li>I think I just need to do everything with my own hands to fully comprehend all of this information! But so far so good!

<li>Nothing at this moment!


</ol>

## Suggestions

* [https://cloud9-sdk.readme.io/docs/code-formatter](https://cloud9-sdk.readme.io/docs/code-formatter)
* [https://www.codecademy.com/learn/learn-html-css](https://www.codecademy.com/learn/learn-html-css)
* W3schools
