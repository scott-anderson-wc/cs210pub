<ol class="questions">

<li>I think it would be nice to go over the structure of the codes
more. For examples, which parts of the code go before the others and which
kinds of changes to the code go before the others.

<div class="ans">
<p>CSS in the head or an external file, linked from the head. Body after
the head, containing a <em>tree</em> of elements.
</div>

<li>Elements and selectors. /
How the different selectors work and what their pros and cons are.
/ I'd like to go over structural selectors a bit more in depth!
/ Different selectors, especially IDs and attributes


<div class="ans">
<p>An element is a thing on the page. A selector is a bit of syntax to,
well, select some set of elements.  For example, every paragraph (P) or
every hyperlink (A) or every hyperlink in the NAV (NAV A) and so forth.

<p>We'll look at the most common ones.  MDN will tell you the complete set of <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors">CSS Selectors</a>
</div>

<li>I am also confused as to how ID might work with a structural selector
— I understand that you can ""Make up an ID, say george and use #george as
the selector"" but where do structural selectors factor into this? That is
where I am confused, sorry. 
/ When is it a good idea to use relationship selectors?

<div class="ans">
<p>No need to apologize. Here's an example:

<pre class="prettyprint lang-js linenums">
&lt;aside id="logged_in"&gt;
    &lt;p&gt;Jeanie ...&lt;/p&gt;
    &lt;p&gt;Connie ...&lt;/p&gt;
    &lt;p&gt;Holly ...&lt;/p&gt;
&lt;/aside&gt;

#logged_in p {
    border-top: 1px solid gray;
}
</pre>

<li>Could we see examples of how to use structural selectors? /
May you go over structural selectors and how it works in greater detail? 

<div class="ans">
    <p>See the previous question</p>
</div>

<li>IDs / I would like to know more about IDs and see more examples of them.
/ Could you touch more on ID's and the pound sign? 
    
<div class="ans">
<p>Many students are confused by IDs. Think of them as names, but unique.
<p>We use # in the CSS file to precede an ID (versus an class)
<p>An example is the <code>logged_in</code> example above: there's only
one part of the page where that content occurs, so let's <em>name</em> it.

</div>

<li>Doesn't the result of the width function being set to 100% depend on
what the height is set to?
    
<div class="ans">
    <p>No, they're pretty independent</p>
</div>

<li>I'm not sure I understand the difference between a browser, and a
container. If you change the width of the browser, the image should change
with it (directly smaller or bigger), but it will never be bigger than the
container? Which I am guessing is the browser at its maximum, from how the
textbook describes it on page 49.

<div class="ans">

<p>Great question. We nest many containers, the outermost of which is the
browser. If all of them are "elastic", changes will propagate. But if one
is fixed, that changes the effect of resizing the browser.
</div>

<li>what does it mean by “element selectors limit your abilities to reuse styles
    
<div class="ans">

<p>Yeah, that's not obvious. Suppose I have a rule that makes the text
green italics:
<pre class="prettyprint lang-js linenums">
{ font-style: italic; color: green; }
</pre>    
<p>What selector to use? If I say LI, that's an element selector for list items. But what if I have a paragraph (P) or a NAV element that I want to apply that same rule to. I have to copy/paste the rule.

<p>Alternatively, if I used a class, say <code>notice</code>, then I can apply the <code>class="notice"</code> attribute to any element I want.
</div>

<li>rgb(149, 194, 215) rgb(100%, 100%, 100%) what’s the different between giving numbers and giving percentages?

<div class="ans">personal preference</div>
    
<li>The different kinds of selectors and how to apply them to an HTML page.

<div class="ans">Sure. I'll write some on the board.</div>

<li>What are the rules around specificity?

<div class="ans">IDs are more specific than classes, which are more
specific than structural selectors which are more specific than
tags.</div>

<li>Totally unrelated, but does this class have an SI session that helps
with understanding these concepts?

<div class="ans">Alas not. </div>

<li>I am still confused about the correct and full syntax of using
structural selectors.

<div class="ans">Like this:

<pre>
X Y { rules; }
</pre>

<p>that means every Y that is a descendant of every X.  Specific examples:

<pre>
NAV A         // every hyperlink in the NAV
#logged_in P  // every P in the #logged_in element
SECTION .notice  // every .notice inside any SECTION
</pre>

</div>

<li>Integrating web fonts into the web page. / Also, I was extremely
confused about the font face syntax, I don't know exactly what it does and
why it's needed in order to get all the fonts into the project.
/ Google Font API

<div class="ans">
<p>Yeah, it's confusing.  I just follow the incantations in the book or go
    to <a href="https://fonts.google.com/">Google Fonts</a> and use the
    incantations there.
</div>

<li>Downloading and using fonts  -  when you say there are built-in values for font-family, does that mean you don't need to download these fonts? These values are built into what? platform?

<div class="ans">
<p>Build into the browser and the Mac or whatever it's running on. Comes with your OS, usually.
</div>

<li>Linking the CSS file itself

<div class="ans">
<p>Put the following in the HEAD:
<pre>
    &lt;link rel="stylesheet" href="../css/normalize.css"&gt;
</pre>
</div>

<li>Could you go over this again? "Width is the width of the contents of
the element, not including any padding, borders or margins."
/ The width property

<div class="ans">
    <p>Sure. Think of a wooden box, whose walls are 1/4 inch think. The
    width of the outside of the box is different from the width of the
    inside.
</div>

</ol>

## Suggestions

* [very clear explanation of ID and class](https://www.washington.edu/accesscomputing/webd2/student/unit3/module5/lesson1.html)
* [CSS dimensions](http://www.w3schools.com/css/css_dimension.asp)
