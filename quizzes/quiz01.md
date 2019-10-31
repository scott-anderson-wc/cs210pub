<ol class="questions">

<li>(From last time): by moving the files into the folder, does that make them relative URLs? Or is there another step to this?
    
<div class="ans">
    <p>We can tell whether a URL is relative or not by looking at it: an
    absolute URL starts with "HTTP" or with "/". A relative URL
    doesn't.

    <p>The act of moving the two files into to the folder demonstrated the
    weakness of absolute urls, because the absolute url
    (<code>/fred.html</code>) broke, but the relative one
    (<code>geore.html</code>) continue to work, <em>because we had moved
    the two files together</em>.
</div>        


<li>Not much about the reading, just questions about this quiz. I wasn't super clear on what readings we were supposed to do for this. I read the FEWD Ch. 2 but it didn't have all the info covered on this quiz. Are we also expected to read the notes from the website? Are the quizzes open notes? I'm just a bit confused about this process.
    
<div class="ans">Yes, the supplemental information is on the
website. That's information that I think is important but the book omits.
    <p>the quizzes are open notes, though hopefully the material is fresh
    in your mind and won't require any lookup. </div>

<li>It is a little hard to understand the reading if I don't actually do
the practice again myself since I am a slow learner.

<div class="ans">By all means, practice, if you find it useful or
necessary. But we will take some class time for that, because I want to be
available to help if necessary.</div>

<li>Why is there such a thing as "useless" tags?

<div class="ans">Not useless, but <em>meaningless</em>. That is, P is a
paragraph, H2 is a second level header. SPAN is a span of "stuff"</div>

<li>Why not just hyperlink the entire text in statements such as "Here are some apple pie recipes" (as in, beginning at "Here")? When do you know when to start?
    
<div class="ans">Perfectly good. As long as the text is useful. Avoid
making it excessively long, because the user has to listen to it to
navigate.</div>

<li>I am still really confused about the use of different levels of
headers like the difference between ""h1"", ""h2"" and ""h6"". Also, what
does it mean by ""level""?

<div class="ans">Like an outline. H1 is a chapter, H2 is a section, H3 is
a sub-section, etc:

<pre class="prettyprint lang-js linenums executable">
H1 Phylum
   H2 Order
      H3 Class
          H4 Genus
              H5 Species
                  H6 Sub-species
                  H6 Another sub-species
              H5 Another Species
          H4 Another Genus
      H3 Another Class
   H2 Another Order
H1 Another Phylum
</pre>


</div>

<li>How familiar we should be with those tags? Do we have to memorize them
or we could pull them out from the internet every time we code?

<div class="ans">You will accidentally memorize them with practice. But
this is not a course about memorizing.</div>

<li>I'm still not too clear on how to save the image in the folder. Do we
save it as a zip file or as a normal jpeg then move it in a folder?

<div class="ans">Save it as a normal jpeg and move it into the folder</div>

<li>How do you check if two different pages are "talking to each other?" 

<div class="ans">The references should "work", so if there are hyperlinks
from fred to george and back, we should be able to click on the link and
get to the other file.</div>

<li>I am a bit confused about the environment setup and am not sure if I'm
doing it correctly. Are we supposed to create the same webpage as the
textbook? Or are we observing the process?

<div class="ans">We'll do it differently (different editor, different
environment), but with the same result.</div>

<li>Could we have examples with all the tags and different ways to link
different types of content?

<div class="ans">We will see most of them in action, and you'll be able to
generalize from there. If you have any trouble, please ask!</div>
    
<li>What is the difference between DIV and P? Do they both split the
webpage or have different functionalities?

<div class="ans">They are similar, but DIV is "bigger" and more powerful,
because it can contain any element, while P can only contain inline
elements (that is, paragraph stuff). To use tree terminology, a DIV is any
node, while a P can only be a leaf.</div>

<li>In the reading, it says that P can not contain other block elements,
does the block elements stand for the ones like SPAN and DIV or just
generic containers?
    
<div class="ans">DIV is a block element, but SPAN isn't. A block element
is something that makes a rectangle on the page (DIV, P, OL, LI, SECTION,
ARTICLE, etc.), while an inline element (SPAN, A, EM, STRONG, etc.) might
wrap around and have ragged edges.</div>

<li>I'm confused on the section in the chapter where it touched on using the terminal to open the page we created with the otter. Mostly on what the terminal means when it says Access URLS: Local ... External... and UI ... and UI External. 

<div class="ans">Yeah, that's confusing. Fortunately, we'll be using the
CodeAnywhere environment and the preview feature.</div>

<li>This is more of a general question, but there are different commands
used in the terminal for Macs and for Windows computers. For instance, ls
on a Mac and dir on a Windows computer both list the files in the current
directory. Should we focus on the Mac commands since we use Macs in lab,
or should we be knowledgeable about both versions of the commands for
tests?

<div class="ans">Yes, there are huge differences, though the world is
seeing some "convergent evolution".  For this class, focus on Mac
commands. If you have a personal Windows laptop, you'll have to learn how
to be bi-lingual.</div>
    
<li>My question is how much does indexing matter in HTML?

<div class="ans">Indexing matters if you'd like users to find your page
using search engines. Indexing is the term for a search engine deciding
what your page is "about" so that it knows what queries should lead to
your page. There's a whole field of Search Engine Optimization (SEO) to
increase the ranking of web sites.</div>

<li>I don't have many questions about the reading, but would like to practice using these tags in practice.

<div class="ans">For sure!</div>    

<li>In the last page it states that after saving the resulting favicon.ico
file in the same folder as the index.html file the browser, when reloaded,
will make that the favicon. Does that happen automatically? Is it because
of the file type and name that the browser knows to set that image next to
the browser tab? What if there are more than one images saved in the same
folder? (Chapter 2 page 32, under Silver Challenge: Adding a favicon.ico)

<div class="ans">The browser automatically asks for a favicon file. If one
is returned (there can be only one), it'll get used.</div>

<li>How would I upload a video through HTML code? Would it be very similar
to uploading an image?

<div class="ans">Just the same. A video is stored in a file, just like a
image, or indeed, anything else.</div>

<li>How do you embed videos? Gifs (looping series of images)? How similar is it to linking images?

<div class="ans">
<p>Here, Google is our friend. Search for "MDN video" and
find <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video">The
Video Embed Element</a>
</div>

</ol>

## Suggestions

* [https://cloud9-sdk.readme.io/docs/code-formatter](https://cloud9-sdk.readme.io/docs/code-formatter)
* [https://www.codecademy.com/learn/learn-html-css](https://www.codecademy.com/learn/learn-html-css)
* W3schools
