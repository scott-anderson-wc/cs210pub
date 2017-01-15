# Environment, HTML and URLs

This is our first class, so we'll talk about the course, and then get
started setting up our environment and getting under way.

## About this Course

The history is told on the [home page](../../index.html). In a nutshell:

* Like CS 110 (HTML, CSS, JS, JQ), but for those who know some programming
* Prereqs are *either* CS 111 *or* CS 115
* I expect that you know programming basics:
    * variables and scope
    * conditionals
    * loops
    * functions
    * methods
    * arrays and dictionaries (Python) or arrays and objects (JavaScript)
* I do *not* expect that you know much HTML or CSS. It always helps if you do, of course.
* The plan is for this course to be renumbered CS 210 and be offered every year, maybe more.
    
## Target Audience

Intended to be a class for *beginners* in either CS or MAS, with just one prior course.

Similar to CS 230 rather than CS 304.

However, this semester, due to its newness and the fact that seniors get
first dibs, that isn't really the case.

So, one difficulty is the range of skill and experience in the class.

* the course may be boring for some and challenging for others
* I hope to avoid it being too boring and too challenging.
* my aim is to aim for the lower end, so boring is more likely
* you have been warned. :-)

## Course Development

Since this is a new course, I will be asking you to fill out lots of
feedback surveys about whether a reading assignment or problem set is too
hard, too easy, or just right.

I'll try to keep these brief, but they are important

## About the Course

Web Applications have a front-end and a back-end. The front-end is
everything that happens in the browser.  In general, sticking just to the
front-end is not much of a limitation. Many powerful applications are
*mostly* front-end, except for long-term storage of data:

* FaceBook
* Gmail
* Google Docs

We will learn:

* HTML
* CSS
* JavaScript
* the DOM, which is how JavaScript controls the page, including HTML, CSS
and event handling

## Syllabus issues:

* Communication: please read/use email every day. I'm old; it's what I use
* Sakai for quizzes and for distributing grades
* 

## Environment

Cloud 9 is a platform where you get your own virtual machine in the Cloud:

* command line (we won't use this much)
* files and folders
* built-in editor (Ace)
* variety of backend servers; we'll use the default, which is Apache
* uniform development environment, whether you're a Mac, PC or Linux person
* 1 private workspace, that ...
* you will share with me and with the tutor

Login now, please!

## Orientation

## Workspace Creation

We'll do this in class together, but if you want to do it beforehand,
that's good too.

* put in a workspace name. Call in cs210

* make it *private*

* the default template is okay

* create the workspace by clicking the big green button

## Looking around Workspace

Here's what the workspace looks like:




* Menus on the top like a desktop Integrated Development Environment (IDE)
  application. That will all you to create, edit, and save files,

* files and folders on the left hand side

* right hand side has links to share, collaborate, etc

* shell on the bottom, for executing commands. We won't use that a lot.

* A JavaScript REPL is there on the bottom, too. We'll use that a lot.

## Using a Workspace

* They have some "getting started" info. It's worth doing:

    1 Open the hello-world.html file by double-clicking
    2 Click on Preview button to see it live
    3 Change something, save, and watch the preview
    4 have fun!

## Stuff to Notice

* yellow triangles in the margin are warnings
* red circles in the margin show errors (none yet; we'll make one)

## Stuff To Do

1. Create a new file: File > New From Template > CSS file
1. Copy/paste the CSS code (the contents of the `style` tag, from line 9
to line 44 to the new file
1. Save the file as `hello-world.css`:  File > Save As 
1. In `hello-world.html` after the `<title>` type `link` and hit `tab`
1. put `hello-world.css` as the value of the `href` attribute. You can try
right-clicking on the filename in the file browser and choosing "copy file
path" then pasting it in
1. Click on the circle-arrow in the upper left of the hello-world.html
view to refresh it.

## Edit the HTML to create some more files

1. right after `body` type `<h1>` and notice it puts in the closing tag
1. Give it a different name, like `Fred`
1. Save the file as `fred.html`: File > Save As
1. Repeat to create `george.html`
1. Return to `hello-world.html` and put in links to fred and george:

```html
<a href="/fred.html">Fred</a>
<a href="george.html">George</a>
```

The lack of a slash in the second is intentional. We'll see why in a
moment.

Note that `amailto` interferes with using the autocompletion nicely. What
I do is type `<a>` which gives me the closing tag, and then I backspace
one step and type `href="` to start the URL.

Save the result and try it. Do both links work?

## Running an Application

* Note that you'll have to *run* the application to get the links to work;
the preview shows structure and style, but isn't quite complete.

* Click on the `Run` menu then look in the console at the bottom.

* Click on the URL shown there

* Click on `open` not `open in preview`

## Relative URLs

Both links should work.

Now, we're going to move this stuff out of our way, for some other day

1. Close the editor panes you have open to these files
1. Click on the "bash" tab in the bottom console
1. type `ls`
1. type `ls -l` for more info
1. type `mkdir hello`
1. type `mv *.html hello` and `mv *.css hello`
1. type `ls` to see what happened

Now, we'll look at the new location:

1. open the `hello` folder in the file browser
1. open the `hello-world.html` file
1. run it (click on the green circle with the white arrow)
1. open the file in a new browser tab by clicking on the URL in the lower
console
1. notice that the URL now has `/hello/` spliced in
1. try both the `fred` and `george` links. Which one worked? Why?

## URLs

URLs are used within websites and web applications to connect pieces
together, including
* supporting files (CSS, JavaScript),
* images, and
* links to other web pages

There are two main kinds:
* Absolute URLs work from anywhere
* Relative URLs work when starting from current page

Examples of Absolute:
    * `https://www.wellesley.edu/cs/curriculum` includes protocol, domain and path
    * `//www.wellesley.edu/cs/curriculum` uses default protocol (same as referencing page)
    * `/cs/curriculum` uses default protocol and domain

Examples of Relative:
    * `curriculum` is a sibling of current page
    * `cs/curriculum` is a child of a sibling
    * `../mas` is a sibling of a parent

The reason that `george.html` worked and `/fred.html` didn't work is that
the latter is an absolute URL, so that when we moved the files, the
absolute URL was no longer correct, but the relative one *was*.

In general, use relative URLs for related parts of a project.

[Learn more about URLs](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)
