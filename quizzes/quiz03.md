<ol class="questions">

<li>I feel confused about the relationship between tags and their
children/siblings; which elements get affected and when?

<div class="ans">
<p>Depends on the CSS property. Some are inherited, some not. Usually
pretty intuitively:

<ul>
    <li>borders, margins, padding and such are not
        
    <li>fonts, background color are inherited
</ul>
</div>

<li>Flexboxes / Don't understand what exactly is flexbox?  / I would love
to go into more detail about flex box, and see some examples of it being
used.
/ Can we talk more about what Flexbox looks like?
/ More about flexboxes

<div class="ans"><p>The main ideas are choosing a direction for the
arrangement of your children and allocating space among them.

<p>In the page from our book, they end up with the following (scattered about)

<pre>
BODY display:flex flex-direction:column
    header.main-header  flex: 0 1 auto
    main.main-content display:flex flex: 1 1 auto; flex-direction: column
        ul.thumbnail-list: display:flex; flex: 0 1 auto; 
        div.detail-image-container: display:flex flex: 1 1 auto
</pre>

</div>

<li>Could you go over flex shorthand property?

<div class="ans">
<p>The parts are grow, shrink, and basis (how to measure size)
    
<p>also helpful are:

<a
href="https://developer.mozilla.com/en-US/docs/Learn/CSS/CSS_layout/Flexbox">https://developer.mozilla.com/en-US/docs/Learn/CSS/CSS_layout/Flexbox</a>

and

<a
href="https://developer.mozilla.com/en-US/docs/Web/CSS/justify-content">https://developer.mozilla.com/en-US/docs/Web/CSS/justify-content</a>
</div>


<li>further explanation of the pros and cons of using flexbox over float
/ Flexbox and Floats

<div class="ans">
<p>Float deals with just one item, removing it from the flow, allowing
later stuff to move up, then shoving it back in the page and forcing
inline-content to flow around it.
<p>Flexbox manages space, size and orientation of a set of children of
the <code>flex</code> parent. Generally, much more powerful.
</div>

<li>Spacing on flexbox (i.e, Flex-start, flex-end, up to space-around)
<div class="ans">
<p>Let's look at the MDN page: 
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items">https://developer.mozilla.org/en-US/docs/Web/CSS/align-items</a>

</div>

<li>Positioning especially how to apply absolute positioning / positioning
elements and when we might need that / More about placing items using a
coordinate system.
/I'd love to go over placing items using position:absolute and
position:relative a little more in class.
    
<div class="ans">
<p>Sure. We'll draw some pictures. The main ideas are to set an origin for
the coordinate system.
</div>

<li>Getting rid of white space
<div class="ans">
<p>In the page? It almost always comes from margins and padding. If it
comes from flexbox, we have to think about the sizes of containers and
such.
</div>

<li>Aren't there multiple ways to attain a certain result? How can we
determine which one is the right way?
<div class="ans">
<p>Great point!  We try to think about how the page will be used and what variations we will want. Flexbox allows us to think about rows/columns. Float allows us to treat block elements like words that will <em>flow</em>.
</div>    

<li>Could you explain the difference between display: block and display:
inline-block again?
<div class="ans">
<p>Sure. A block element is a container and "always" stacks vertically. An
inline-block element is a container that can flow like inline elements
(e.g. words).
</div>

<li>More practice in class on using flexboxes and the advantages and
disadvantages of using float.
<div class="ans">
<p>We'll try! 

</div>

</ol>
<div class="ans"></div>

## Suggestions

* [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
* [MDN flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
