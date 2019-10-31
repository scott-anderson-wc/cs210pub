# First Project: Ottergram

## Leftovers

We'll finish our discussion of URLs from last time.

In general, we may run out of time during class. Please finish work on
your own if you can. 

## Status

Have you ordered a book or teamed up with someone to share a copy? I know
finances can be tight for some of us, so sharing is okay as long as you
have ready access so you can do the reading.


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
usually many others who are glad they did.

[Your questions](../../quizzes/quiz01.html)

## Coding startup

Here's our standard practice for the semester:

* Pair up with another student at one of the college Macs. 
* Introduce yourself. Ideally, I'd like you to pair up with a different person.
Eventually, you'll meet everyone.
* It doesn't matter who logs in to CodeAnywhere. Over the course of the semester, you should aim
to be the host and guest an equal number of times. You should take turns typing. There is evidence that shows that doing is better than watching.  Discuss 
* That person should login to their CodeAnywhere account and

## Book Exercises

Some people prefer to try to work through the activities as part of doing
the reading. That's okay, but you'll end up re-doing it in class. Most
people read for concepts and defer the activities to class time.

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

## Developing Locally versus in the Cloud

The book shows a good way to develop your code *locally*, meaning on your
desktop/laptop computer. The downsides:

* You'd have to go back to this exact computer to pick up from where you
  left off. That's fine for your personal laptop, but not great for a
  classroom computer.
* You can't easily share your code with a partner.
* You can't easily share your code with me or a tutor
* We'd have to figure out a way for you to submit your code for grading
* Et cetera

If CodeAnywhere lets us down, we will probably go to the book's model, but
hopefully it won't. Fingers crossed!

## Atom versus CodeAnywhere

You'll have to figure out how to do things in CodeAnywhere instead of
blindly following their instructions for Atom. We also won't be using
`browser-sync`. (This won't be an issue in a chapter or two.)  Ask if you
can't figure any of these out:

* creating a folder (you can use the context menu for this)
* creating a new file (CodeAnywhere doesn't seem to have templates....)

## Browser Caches

One of the things we will learn is that when you are developing an HTML
file, reloading it in the browser sometimes doesn't work. That is, the
browser shows you the old version, not the updated one. The reason is
because of the *cache*.

Caches are used in a zillion places in computer science. It's a general
technique to avoid re-doing something you've already done. A browser is
trying to avoid re-loading a file from the internet when it's already done
so (it saved a copy in the "cache").

However, in web development, we often *know* that the cache is out of
date. Use one of the following options to make the browser ignore the
cache and really load the (updated) website:

* hold down the *shift* key when clicking on reload, or
* have the Chrome Development tools open

Let's do a demo of that, using the `hello-world.html` from last
time. Modify the `.css` file and then reload the page. Then shift+reload
it.

## How to Use the Book in Class

You have two options:

* follow the book page by page, re-reading the text and doing the
  actions. This will be pretty reliable, but possibly boring, and not as
  good a way to learn.
* Look at the goal and try to implement it, using your knowledge from the
  reading. Dip into the book as necessary to remind yourself.

The latter will be more difficult but is a better learning activity.

## Today's Goal

Here is today's [implementation
goal](../../front-end-dev-resources/book-solutions/Chapter-02/ottergram)

* the page has an empty CSS file in a subdirectory called `stylesheets`
* the page content has header text of `Ottergram` and 
* an unordered list of items, each of which is
* a clickable hyperlink around
* an image and a name for that otter
* the otter images are in a sub-folder called `img`
* the names are:
    1. Barry
    1. Robin
    1. Maurice
    1. Lesley
    1. Barbara

That's it!

## Get started!

Go head and start on the chapter activities.

### Setup (from Chapter 1)

1. Make a folder called `front-end-dev-book`
1. `cd` into it
1. In it, make a folder called `ottergram`
1. `cd` into that
1. In it, make a folder called `stylesheets`

### initial stylesheet

Create an (empty) `styles.css` file in the `stylesheets` folder


### index.html

In the `ottergram` folder, create an `index.html` file containing this:


```
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>ottergram</title>
    </head>
    <body>
        <header>
            <h1>ottergram</h1>
        </header>
    </body>
</html>
```

Run it to see it work

### stylesheet

Add the following into the HEAD of the file:

```
<link rel="stylesheet" href="stylesheets/styles.css">
```

re-run the file to see it work. You can add the following to the
`styles.css` file:

```css
body { background-color: gray; }
```

and reload (or shift+reload) the `index.html`

### Add the content

Add the content they describe.

Stop when you get to the part about downloading the otter images from Big
Nerd Ranch on page 24.

## Downloading and Uploading

How do we get a file or collection of files into our CodeAnywhere
container? Copy/paste would be tedious and error prone and doesn't work
well for images. However, most civilized Unix environments provide at
least one of the following command-line tools:

* [curl](https://linux.die.net/man/1/curl)
* [wget](https://linux.die.net/man/1/wget)

Try one of the following in your *ssh* terminal:

`wget https://cs.wellesley.edu/~cs204/downloads/otter-images.tar`
`curl -O https://cs.wellesley.edu/~cs204/downloads/otter-images.tar`

That's a capital letter O in the `curl` command, not a zero.

## Tar

The otter images are in a file format called `tar` (tape archive -- this
format has been around for a *while*). It allows a directory tree to be
contained in a single file, which is much easier to copy around.

`tar xf otter-images.tar`

will create the folder from the tar file. You can then copy/move it
wherever you need to.

## Refreshing the File Browser

The left hand pane has a clickable directory tree to allow you to easily
navigate your workspace and open files. When we upload a collection of
files using curl and tar, the CodeAnywhere editor doesn't know about
them. So, we need to tell it to refresh its knowledge of the workspace.

Do that with the context menu on the container.

## Downloading from Big Nerd Ranch

The whole [book's
solutions](https://bignerdranch.com/downloads/front-end-dev-resources.zip)
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

Topics:

* DOM tree view
* styles pane
* arranging the DevTools
* dynamically changing styles

## DOM: Document Object Model

An HTML file starts out as a string of text, but we know it represents a
structured thing. It's a *tree* with:

* nodes with a parent and maybe some children
* rules that apply to different nodes (more on this next time)
* a box model for block elements

Okay, return to the activity, and play around with the inspector.  

## Extra Time?

* try the silver challenge
* add a hyperlink using an absolute URL, say to `https://www.nytimes.com/` or to a page of fun facts about otters
* Use `em` or `strong` or add a paragraph to the otters page
* add a comment
* Add a validation icon from our [reference page](../../reference.html) and
* validate the page

## Spaces in URLs

Odd or special characters in URLs have to be *encoded* using their ASCII
(probably Unicode) codepoints.  For example, `Chapter%4002` to do `Chapter
02` where the `%40` is the UTF-8 codepoint for the space character.

See, for example, [Stack Overflow on Unicode characters in URLs](https://stackoverflow.com/questions/2742852/unicode-characters-in-urls)

## End of Class

At the end of each class, I'll hand out 3x5 cards. On it, please write
your name and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

## Conclusion

Here is our [solution to chapter
  2](../../front-end-dev-resources/book-solutions/Chapter-02/ottergram/index.html)

We'll look at the solution in terms of:

    * files,
    * folders
    * links/urls
    * DOM
    * Chrome Developer Tools

