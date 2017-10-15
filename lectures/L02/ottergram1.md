# First Project: Ottergram

## Leftovers

We'll finish our discussion of URLs from last time.

In general, we may run out of time during class. Please finish work on
your own if you can. 

## Recap of Reading

We'll visit the [reading](../../reading/ch02.html) and quickly recap

* HTML template
* tags and tag syntax (attributes and values). Proper nesting.
* meaningless tags
* Chrome Developer (we'll spend some time on that today)
* other tags they didn't mention
* "here" links
* the `alt` attribute
* HTML comments
* validation and icons.  If there's time, we'll do that today
* meaningful tags

## Quiz Questions

One of the most important parts of the Sakai quiz is the chance for you to
ask me questions to cover in class. Please take advantage of this!  If I
think your question is too obscure to be of general interest, I will omit
it, but my experience is that if one person asks a question, there are
usually many others who are glad she did.

[Your questions](../../quizzes/quiz01.html)

## Cloud 9 clarification

Make sure you have two workspaces, one public and one private.

Share both with me and with Emily (`ewang10@wellesley.edu`)

## Cloud 9 startup

Here's our standard practice for the semester:

* Pair up with another student at one of the college Macs. 
* Introduce yourself. Each class, I'd like you to pair up with a different person.
Eventually, you'll meet everyone.
* It doesn't matter who logs in. Over the course of the semester, you should aim
to be the host and guest an equal number of times. You should take turns typing. There is evidence that shows that doing is better than watching.  Discuss 
* That person should login to their Cloud 9 account and
* start their *public* workspace
* make sure that public workspace is shared with me and with the tutor
* When you create or edit files, take a moment to put *both* names in the file. This is so that we can see who is here and working on stuff (for class participation credit).

## Book Exercise

I have never used the exercises in this book for class activities.

Some chapter activities may be too short. If so, we'll do the bronze and
silver challenges or supplement with our own activities or just leave
early. We'll try to avoid leaving early too often, but it's hard to know.

Some chapter activities may be too long. If so, we'll stop when we run out
of time, and I encourage you to complete them on your own. All the
completed activities are available on the class website under
[reference](../../reference.html)

We'll stop at intervals during the activity to see how people are doing,
answer questions, etc.

BTW, you'll be amused to know that the authors of the book named their
folders like `Chapter 02` with a space.  That failed as a URL in C9. I had
to rename them all to be like `Chapter-02`.  It's possible to have URLs
correspond to files and folders with spaces, but it's tricky. We will talk
about it later if there's time.

## Atom versus Cloud 9

You'll have to figure out how to do things in Cloud 9 instead of blindly
following their instructions for Atom. We also won't be using
`browser-sync`. (This won't be an issue in a chapter or two.)  Ask if you
can't figure any of these out:

* creating a folder
* creating a new file (from a template)

## Browser Caches

One of the things we learned last time is that reloading an HTML file
sometimes doesn't work. The reason is because of the *cache*.

Caches are used in a zillion places in computer science. It's a general
technique to avoid re-doing something you've already done. A brower is
trying to avoid re-loading a file from the internet when it's already done
so.

However, in web development, we often know that the cache is out of
date. Use one of the following options to make the browser ignore the
cache and really load the (updated) website:

* hold down the *shift* key when clicking on reload, or
* have the Chrome Development tools open

Let's do a demo of that, using the `hello-world.html` from last
time. Modify the `.css` file and then reload the page. Then shift+reload
it.

## Get started!

Go head and start on the chapter activities.

Stop when you get to the part about downloading the otter images from Big Nerd Ranch.

## Cloud 9 Downloading and Uploading

Take a few minutes to read this explanation of [Cloud 9 downloading and
uploading](https://docs.c9.io/docs/download-files)

For our course, you'll often have to download something to your local
machine, and then upload it to Cloud 9.  Twice the I/O, but Cloud 9
doesn't provide an easy way to upload from another server.

However, it does provide two command-line tools:

* [curl](https://linux.die.net/man/1/curl)
* [wget](https://linux.die.net/man/1/wget)

Try one of the following in your *bash* shell:

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

## Downloading from Big Nerd Ranch

The whole [book's
solutions](http://bignerdranch.com/downloads/front-end-dev-resources.zip)
are available at that link.  You can also use wget or curl to copy it
directly to your workspace. It's a `.zip` file, so use the `unzip` command
to convert it to a directory tree.

## Continue!

Continue the exercise.  Stop when you get to the Chrome Inspector part

## Chrome Development Tools

I really like the Chrome DevTools, and I use it (them?) *constantly* when
I'm developing.

We'll take a minute to poke around together with it, we'll talk about the
DOM, and then I'll let you get back to it

## DOM: Document Object Model

An HTML file starts out as a string of text, but we know it represents a
structured thing. It's a *tree* with:

* nodes with a parent and maybe some children
* rules that apply to different nodes (more on this next time)
* a box model for block elements

Okay, return to the activity, and play around with the inspector.  

## Extra Time?

* try the silver challenge
* add a hyperlink using an absolute URL, say to `http://www.nytimes.com/` or to a page of fun facts about otters
* Use `em` or `strong` or add a paragraph to the otters page
* add a comment
* Add a validation icon from our [reference page](../../reference.html) and
* validate the page

## Spaces in URLs

Odd or special characters in URLs have to be *encoded* using their ASCII
(probably Unicode) codepoints.  For example, `Chapter%4002` to do `Chapter
02` where the `%40` is the UTF-8 codepoint for the space character.

See, for example, [Stack Overflow on Unicode characters in URLs](http://stackoverflow.com/questions/2742852/unicode-characters-in-urls)

## End of Class

At the end of each class, I'll hand out 3x5 cards. On it, please write
your name and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

## Conclusion

Here is our [solution to chapter
  2](https://sample-scottdanderson.c9users.io/front-end-dev-resources/book-solutions/Chapter-02/ottergram/index.html)

We'll look at the solution in terms of:

    * files,
    * folders
    * links/urls
    * DOM
    * Chrome Developer Tools

