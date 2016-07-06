# Accessibility

A website is *accessible* if it can be used effectively by people who have
disabilities, such as blindness, deafness, or paraplegia.  We've mentioned
accessibility many times in this course, and we've made it an important
part of the way we build web sites. This reading will cover a lot of what
we haven't yet covered, though we won't be able to cover everything we
would like to.

## Motivation

Overall, the web has been good for accessibility. Because the text is
already in computer form, it can be easily processed by a screen reader
for the blind (as opposed to print, which would first require optical
character recognition). Nevertheless, many modern websites can be
frustratingly difficult for people with disabilities.

We can assume that the designers who made the inaccessible websites didn't
set out to do so. Most of us see the need and responsibility for building
designers to allow for wheelchair ramps and curb cutouts to allow access
to public buildings, along with braille signs in elevators and many other
accommodations. Furthermore, the [Americans with Disabilities Act or
ADA](https://www.ada.gov) requires that many websites be accessible in the
same way that public buildings must be accessible.  See the website [Web
Accessibility in Mind](http://webaim.org/) for much more
information. Much of what is covered in this reading is drawn from that
resource. Their materials are copyright &copy; 1999-2016 WebAIM (Web
Accessibility in Mind).

## The POUR Principles

Having decided to build an accessible website, we have to figure out what
that means. First, consider different kinds of disabilities:

* Visual: people can be blind, have low-vision, be color-blind, and more
* Auditory: people can be deaf or hard of hearing
* Motor: people can be unable to use a mouse, be slow or lack fine motor control
* Cognitive: people can have learning disabilities or poor ability to focus

To make a website accessible, we want to keep four guidelines in mind:

<dl>
<dt>Perceiveable</dt>
<dd>The information should be accessible by the visitor's working senses, so, for example, information should not be presented solely by sound (a video with narration but no captioning).</dd>

<dt>Operable</dt>
<dd>The website shouldn't require the use of a mouse in order to access the information</dd>

<dt>Understandable</dt>
<dd>The content is clear, at least to the target audience.</dd>

<dt>Robust</dt>
<dd>The website should be accessible to a wide range of assistive technologies</dd>
</dl>

These make the acronym POUR.

## Checklist Dozen

These are wonderful principles, but our task in this reading is to see how
to achieve them.  Let's start with a list of the dozen most important
principles. I've copied this list from the WebAIM website, and I've
included links to their elaboration on each principle. You're encouraged
to go to their site to learn more.

<dl>
		<dt><a href="http://webaim.org/techniques/alttext/">Provide appropriate alternative text</a></dt>
		<dd>Alternative text provides a textual alternative to non-text content in web pages. It is especially helpful for people who are blind and rely on a screen reader to have the content of the website read to them.</dd>
		<dt><a href="http://webaim.org/techniques/semanticstructure/">Provide appropriate document structure</a></dt>
		<dd>Headings, lists, and other structural elements provide meaning and structure to web pages. They can also facilitate keyboard navigation within the page.</dd>
		<dt><a href="http://webaim.org/techniques/tables">Provide headers for data tables</a></dt>
		<dd>Tables are used online for layout and to organize data. Tables that are used to organize tabular data should have appropriate table headers (the <code>&lt;th</code>&gt; element). Data cells should be associated with their appropriate headers, making it easier for screen reader users to navigate and understand the data table.</dd>
		<dt><a href="http://webaim.org/techniques/forms">Ensure users can complete and submit all forms</a></dt>
		<dd>Ensure that every form element (text field, checkbox, dropdown list, etc.) has a label and make sure that label is associated to the correct form element using the <code>&lt;label&gt;</code> element. Also make sure the user can <a href="http://webaim.org/techniques/formvalidation/">submit the form and recover from any errors</a>, such as the failure to fill in all required fields.</dd>
		<dt><a href="http://webaim.org/techniques/hypertext">Ensure links make sense out of context</a></dt>
		<dd>Every link should make sense if the link text is read by itself. Screen reader users may choose to read only the links on a web page. Certain phrases like &quot;click here&quot; and &quot;more&quot; must be avoided.</dd>
		<dt><a href="http://webaim.org/techniques/captions/">Caption and/or provide transcripts for media</a></dt>
		<dd>Videos and live audio must have captions and a transcript. With archived audio, a transcription may be sufficient. </dd>
		<dt>Ensure accessibility of non-HTML content, including <a href="http://webaim.org/techniques/acrobat/">PDF files</a>, <a href="http://webaim.org/techniques/word/">Microsoft Word</a> documents, <a href="http://webaim.org/techniques/powerpoint/">PowerPoint</a> presentations and <a href="http://webaim.org/techniques/flash">Adobe Flash</a> content.</dt>
		<dd>In addition to all of the other principles listed here, PDF documents and other non-HTML content must be as accessible as possible. If you cannot make it accessible, consider using HTML instead or, at the very least, provide an accessible alternative. PDF documents should also include a series of tags to make it more accessible. A tagged PDF file looks the same, but it is almost always more accessible to a person using a screen reader.</dd>
		<dt><a href="http://webaim.org/techniques/skipnav/">Allow users to skip repetitive elements on the page</a></dt>
		<dd>You should provide a method that allows users to skip navigation or other elements that repeat on every page. This is usually accomplished by providing a &quot;Skip to Main Content,&quot; or &quot;Skip Navigation&quot; link at the top of the page which jumps to the main content of the page.</dd>
		<dt><a href="http://webaim.org/articles/visual/colorblind">Do not rely on color alone to convey meaning</a></dt>
		<dd>The use of color can enhance comprehension, but do not use color alone to convey information. That information may not be available to a person who is colorblind and will be unavailable to screen reader users.</dd>
		<dt><a href="http://webaim.org/techniques/writing/">Make sure content is clearly written and easy to read</a></dt>
		<dd>There are many ways to make your content easier to understand. Write clearly, <a href="http://webaim.org/techniques/fonts/">use clear fonts</a>, and <a href="http://webaim.org/techniques/semanticstructure/">use headings and lists appropriately</a>.</dd>
		<dt><a href="http://webaim.org/techniques/javascript/">Make JavaScript accessible</a></dt>
		<dd>Ensure that <a href="http://webaim.org/techniques/javascript/eventhandlers">JavaScript event handlers</a> are device independent (e.g., they do not require the use of a mouse) and make sure that your page does not rely on JavaScript to function.</dd>
		<dt>Design to standards</dt>
		<dd>HTML compliant and accessible pages are more robust and provide better search engine optimization. <a href="http://webaim.org/techniques/css/">Cascading Style Sheets</a> (CSS) allow you to separate content from presentation. This provides more flexibility and accessibility of your content.</dd>

</dl>

<p>This list does not present all accessibility issues, but by addressing these basic principles, you will ensure greater accessibility of your web content to everyone. You can learn more about accessibility by browsing our <a href="http://webaim.org/articles/">articles</a> and <a href="http://webaim.org/resources/">resources</a>. </p>

## Images

There are generally two kinds of pictures on a website: informative and
decorative. If a picture is informative, you *must* provide some way for a
blind user to get equivalent information in a textual form.  The usual way
to do this is to provide an ALT attribute on the image:

<div>
<div class="example">
    <img src="/images/harry-potter-thumb.jpeg"
         alt="Daniel Radcliffe as Harry Potter">
</div>
<pre class="example-code">
    &lt;img src="/images/harry-potter-thumb.jpeg"
         alt="Daniel Radcliffe as Harry Potter"&gt;
</pre>
</div>

Note that this ALT is often incorrectly called an "alt tag" but of course
it's an attribute not a tag. The general concept of providing a textual
alternative is called "alt text," so that's probably the easiest and best
way to describe this.  Also, the alt text doesn't say "picture of ..."
because that will be clear from the screen reader.

However, sighted people won't (typically) read this alt text. Maybe the
text preceding this image says that Daniel Radcliffe plays Harry Potter,
but a better way to do this would be to use a FIGURE and a CAPTION:

<div>
<div class="example">
    <figure>
        <img src="/images/harry-potter-thumb.jpeg" alt="">
        <figcaption>Daniel Radcliffe as Harry Potter</figcaption>
    </figure>
</div>
<pre class="example-code">
    &lt;figure&gt;
        &lt;img src="/images/harry-potter-thumb.jpeg" alt=""&gt;
        &lt;figcaption&gt;Daniel Radcliffe as Harry Potter&lt;/figcaption&gt;
    &lt;/figure&gt;
</pre>
</div>

In this case, the screen reader software can use the caption as the ALT
text, so we explicitly leave the ALT attribute empty, so that the blind
visitor isn't read the same text twice.

This figure with a caption is now better for both blind and sighted
visitors, an example of where accessibility can improve the experience for
everyone.

What about other uses of images, say with slideshows and galleries?  In
most cases, a similar approach will work: if the sighted visitor is
expected to get some information from the picture, you should provide that
same information in textual form. A gallery of pictures showing the
executive board of your club, should have each person described with a
caption. If the pictures are somewhat generic, it's reasonable to give a
common caption ("picture from our annual soccer game") that will apply to
all the pictures in the slideshow.

If a picture is purely decorative (a picture of a soccer ball on the page
describing the annual soccer game), the ALT text can be explicitly set to
the empty string.  Alternatively, you can make the image be a background
image using CSS:

<div>
   <style scoped>
   #soccerball {
      width: 240px;
      height: 240px;
      background-image: url(/images/240px-Soccer_ball.svg.png);
   }
   </style>

   <div id="soccerball"></div>
   <pre>
   #soccerball {
      width: 240px;
      height: 240px;
      background-image: url(/images/240px-Soccer_ball.svg.png);
   }

   &lt;div id="soccerball"&gt;&lt;/div&gt;
</div>

The advantage of a background image is that, using media queries, you can
easily omit these decorative images when the screen size is small.

## Videos and Audios

Video and audio elements pose the same issues as still images. Blind
visitors won't be able to see your video, so it should have a textual
transcript. Deaf visitors won't be able to hear the narration or speakers,
so the video should have captioning.  This is not always easy or
inexpensive. However, there is a benefit that search engines will be able
to do a better job with indexing this content if the textual equivalent
exists.

## Hyperlinks

We already know that hyperlinks shouldn't have "here" or "more" as the
click text. Screen readers often read links out of context, so the link
text should stand on its own. However, there's a lot more to know about
hyperlinks. Here are just a few items:

* People expect that links are underlined. Unless the context makes the
  link obvious (a navigation bar), don't use CSS to remove the default
  underline

* An image that is a hyperlink will use the ALT text as the description of the hyperlink.

* Don't say "link to X" or "go to Y"; the screen reader will indicate that the element is a hyperlink

* 



If you want to learn even more, I suggest [Making Accessible Links: 15
Golden Rules for
Developers]{https://www.sitepoint.com/15-rules-making-accessible-links/}.

## Labels for Form Controls

## Avoid Color



## Non-HTML Content

## Skip Links

## Standards

## Accessible JavaScript

* don't use mouseover, mouseout and hover, since those are mouse-only
* use :focus for links that are in focus

## Accessible jQuery

Many jQuery methods, such as `.hide()` and `.slideUp()` use the CSS
setting `display:none` to achieve the hiding. That method means the
resulting content is inaccessible to a screen reader.  If you don't
want that, a better idea is to add an after-event handler to the
jQuery code to display the content but offscreen (or using one of the
other techniques for hiding content).


## Accessible Drop-down Menus

## Accessible Slideshows




## Conclusion

Assistive software and hardware are always evolving, as are the CSS
techniques that attempt to help them while not hindering other
visitors. The main thing is to consider accessibility when you are
considering coding some fancy new interface: will it work if the user only
has a keyboard? will it work if the user is blind? Will it work if the
user has limited motor control? Sometimes, this will mean foregoing that
fancy feature, but the goal of making our website for all instead of the
lucky few is worth the price.
