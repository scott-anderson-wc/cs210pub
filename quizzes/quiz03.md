<ol class="questions">

<li>To clarify: the "auto" in, for example, the shorthand "flex: 0 1
auto;" tells the container to calculate the element's size rather than the
developer specifying it?

<p class="ans">Exactly.

<li>Flexbox is just really confusing! Looking forward to practicing in class.

    <p class="ans">For sure!

<li>Flexbox vs. Float (just more detail on why we use one over the other, pros and cons)

    <p>Float predates Flexbox. It's not as easy to work with. Flexbox was
    basically invented to supercede float.  Still, there are times when
    float is convenient, say for images inset into paragraphs.

<li>What is the difference between flex and float?

    <p>Huge. A floated element is removed from the flow, allowing stuff to
    move up to where it was, and then shoved back into the layout,
    causing <em>inline</em> stuff to flow <em>around</em> it.  Flex
    explicitly talks about directions: row vs column, and allows you to
    allocate space (grow/shrink).

<li>What does it mean when flex items can ""grow and shrink""?

    <p>If the browser is resized (or the page is viewed on a different
    device) there are more pixels to allocate. Grow and shrink allows the
    size of items to adjust to the window.

<li>The supplemental reading mentioned that flex containers can be nested.
What does that look like?

    <p>We can draw this.  Think of the NY times page.

<li>What attributes can flexbox have other than positioning and size? Is
there a page somewhere with all the attributes you can use?

    <p>I'd go to the MDN reference pages. Let's do that. Also, see
    suggestion below.

<li>I'm still confused with absolute positioning and relative positioning.

<p>They have different <em>origins</em>. Relative is a <em>delta</em> from
where it would land "normally."  Absolute doesn't care where something
would "normally" have been. Instead it has a different <em>origin</em>.

<li>why is it important to explicitly declare position property?

    <p>For <code>position:absolute</code>, the rule is that the origin is
    determine by the closest ancestor that has a position that is not the
    default of <code>static</code>. So, something that
    has <code>position:relative</code> is the standard practice.

<li>Absolute and relative positioning. Flex vs. flexbox.

<li>I'm curious to learn about the purpose of other position values, such
as fixed. Additionally, I would like to learn a bit more about float!

<p>Fixed is useful rarely. I think of it as <code>position:absolute</code>
but relative to the <em>glass</em>, rather than the document. Nice, say,
for menus that can't scroll away. Let's talk more about this at the end of
class or in office hours.

<li>nothing in particular! No questions on this section!

</ol>

## Suggestions

* [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
