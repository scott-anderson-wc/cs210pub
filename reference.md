## Reference Material

* [Mozilla Developer Network](https://developer.mozilla.org) This is an
  excellent resource. Most of the time, you can look up anything you want
  by including "MDN" in your Google search term. For example, Google for
  "MDN console.log" to find out more about JavaScript's `console.log`
* [W3Schools](http://www.w3schools.com/) has tutorials and reference
  material on many topics, including everything in our course. W3Schools
  is more novice-friendly than MDN, though not quite as comprehensive. It
  often has a very nice "try this" way of experimenting with code elements
* [jQuery](https://jquery.com) and [JQuery API](https://api.jquery.com) is
  the canonical source of information about jQuery
* [Quirks Mode](https://quirksmode.org) has some nice information and essays
* more to come. Please send me your suggestions

## Template

You can use this [template](reading/template.html) as a starting point for
your web pages. It includes the validator icons (you can remove them if
you want, or use CSS to hide them) and the `meta charset` tag and such.

## Validators

<ul>
              <li>The nu W3C Validator for <a href="https://validator.w3.org/nu/">HTML 5</a>.</li>
              <li>The old W3C Validator for <a href="http://validator.w3.org/">HTML</a>.</li>
              <li>The W3C Validator for <a href="http://jigsaw.w3.org/css-validator/">CSS</a>.</li>
              <li>Adding validation icons to your pages for HTML and CSS.</li>
              <pre>
&lt;p&gt;
  &lt;a href="http://validator.w3.org/check?uri=referer"&gt;
     &lt;img 
       src="http://cs.wellesley.edu/~cs110/Icons/valid-html5v2.png"
       alt="Valid HTML 5"
       title="Valid HTML 5"  
       height="31" width="88"&gt;
  &lt;/a&gt; 
&lt;/p&gt;
</pre>

<pre>
&lt;p&gt;
  &lt;a href="http://jigsaw.w3.org/css-validator/check/referer"&gt;
     &lt;img 
       src="http://cs.wellesley.edu/~cs110/Icons/vcss.gif"
       alt="Valid CSS"
       title="Valid CSS"  
       height="31" width="88"&gt;
  &lt;/a&gt; 
&lt;/p&gt;
</pre>              
</ul>
              
## Google Fonts

The list of [Google Fonts](http://www.google.com/fonts).

## Book Solutions

The whole [book's
solutions](http://bignerdranch.com/downloads/front-end-dev-resources.zip)
are available at that link.  Individual projects are here:

* For [Chapter 2](https://sample-scottdanderson.c9users.io/front-end-dev-resources/book-solutions/Chapter-02/ottergram/index.html)
* For [Chapter 3](https://sample-scottdanderson.c9users.io/front-end-dev-resources/book-solutions/Chapter-03/ottergram/index.html)

## Cloud 9 Downloading and Uploading

Take a few minutes to read this explanation of [Cloud 9 downloading and
uploading](https://docs.c9.io/docs/download-files)

For our course, you'll often have to download something to your local
machine, and then upload it to Cloud 9.  Twice the I/O, but Cloud 9
doesn't provide an easy way to upload from another server.

However, it does provide two command-line tools:

* [curl](https://linux.die.net/man/1/curl)
* [wget](https://linux.die.net/man/1/wget)

Try one of the following commands in your bash shell:

`wget http://cs.wellesley.edu/~cs204/downloads/otter-images.tar`
`curl -O http://cs.wellesley.edu/~cs204/downloads/otter-images.tar`

That's a capital letter O in the `curl` command, not a zero.

## Tar

The otter images are in a file format called `tar` (tape archive -- this
format has been around for a *while*). It allows a directory tree to be
contained in a single file, which is much easier to copy around.

`tar xf otter-images.tar`

will create the folder from the tar file. You can then copy/move it
wherever you need to.

