# Cloud 9

Cloud 9 is a service that allows you to create virtual machines
(workspaces) and Integrated Development Environments (IDEs) that are based
in the cloud. There is a free service which limits the power of your
machine (cpu, ram, disk) and also limits the number of private workspaces
you can have, but these are sufficient for our course.

## Signup

Signup is free and is like many other web accounts. You won't have any
difficulty with it.

Please use your wellesley email address, so that I will have an easier
time matching your account with my records.

* Go to <https://c9.io>

* Give it your Wellesley College email address, so that I will have an
  easier time matching your account with my records

* Then it will ask for your name. Please give an accurate name, though
  you can use your preferred name (e.g. Meg Smith rather than Margaret
  Smith)

* Choose a username. Since this will be part of a domain name, it has some
  extra constraints. Again, it helps to be accurate here, so I don't get
  confused.

* tell them about yourself

* Confirm your details

* Give them a credit card number. They won't charge you, but I think they
  want to know that you have one (that is, you're not a 13-year-old). If
  this is a burden to you, contact me.

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
*

## URLs




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

