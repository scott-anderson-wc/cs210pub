<ol class="questions">

<li>I still don't entirely understand ID's, so it would be nice to go over them again!
    / Selectors, and more specifically, the topic of IDs
    / I would like to learn more about IDs, and how they relate to relative URLS. 

<p>To uniquely identify a place with a document that is the destination
for a URL, we have to give the place a unique ID.

<li>What is the difference between an id and a class?

<div class="ans">
<ul>
        <li>Both are <em>labels</em> for an element
        <li>an <em>ID</em> is <em>unique</em>, like a SSN
        <li>a <em>class</em> can be non-unique, like major, dorm, or graduating class
</ul>
</div>

<li>Can you please elaborate more on why we should avoid using ID
selectors as the book previously mentions towards the end of the chapter?
I was led to believe in a previous class that they were super useful and
important, and now my world has been turned upside down.

<p>I don't agree with our book here. I think IDs are fine. The only
disadvantage is that if you decide later that you want to apply that rule
to other elements ("gee, I want the list of figures to look just like the
table of contents"), you can't reuse the ID ("Oh, I can't label the LOF as
#TOC, because then the label is not unique")

<li>Linking CSS, and becoming more confident with formatting.

<p>Use the <code>link</code> tag to link an external CSS file. Confidence
will come with practice.

<li>I'm a little confused about how to modify elements that are siblings
(as opposed to all the elements in a class).  I'd like to talk a little
more about structural selectors, I'm still a little confused.

<div class="ans">
<p>Imagine an unordered list of hyperlinks within a NAV element. Now consider these selectors:
<pre>
    nav { ... }
    nav ul { ... }
    nav li { ... }
    nav li + li { ... }
    nav a { ... }
</pre>
</div>

<li>relationship selectors

    <p>See previous</p>

<li>I'm still confused with [href].

    <p>Selects elements with that attribute. So, <code>A</code> and <code>LINK</code> tags ...

<li>Why is border not inherited while font-size and background color are?

    <p>Let's look back at our NAV example, and consider wanting to put a
    box around it and give it a font-size and background color.

<li>What is another way to use web fonts without having to save them on your computer?

    <p>Google Fonts are great.

<li>What does it mean to add %7C?

    <p>It's the hex-encoded equivalent for a vertical bar, which isn't
    supposed to appear in a
    URL. See <a href="https://www.asciitable.com/">ASCII table</a>

<li>i can't for the life of me remember the inheritance symbols, is there an easier way to remember?? please??

    <p>Don't memorize. Look 'em up. With practice, you'll remember the
    ones you use often. I still look up + and ~.

</ol>

## Suggestions

* [very clear explanation of ID and class](https://www.washington.edu/accesscomputing/webd2/student/unit3/module5/lesson1.html)
* [CSS dimensions](http://www.w3schools.com/css/css_dimension.asp)
