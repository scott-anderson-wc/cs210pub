# jQuery UI

jQuery itself is a JavaScript library for manipulating the DOM in a
convenient way. We've used it many times this semester.

However, there are lots of common user interface (UI) widgets and effects
that people commonly want to do that jQuery doesn't do. Fortunately, many
of these UI widgets and effects are packaged up in something called jQuery
UI.

In this reading, I'll ask you to look at a selection of these. There is
nothing particularly special about the ones I've chosen except that I have
used most of them in the past and found them helpful and relatively easy
to use. 

## jQuery UI Overall

First, take a few minutes to look over the home page and look at the
options:

[jqueryui.com](https://jqueryui.com)

Then, take the time to read the *about* page:  [about
jQueryUI](https://jqueryui.com/about)

Next, I'll ask you to look at several specific items. Each item has a main
page with a demo. In fact, it usually has several demos; make sure you
study at least the default demo. The demoe will have a way to look at the
source code of the demo. Please look at the source code.

You'll notice that the source code usually loads quite a few files and
other code, such as

* jquery-ui.css
* some additional custom CSS
* some example-specific CSS in a `style` tag
* jquery itself
* jquery UI
* some example-specific JavaScript, that puts these libraries into action.

So, when you're reading the code, don't neglect to notice all these parts.

You'll see that these jQuery UI features have "API documentation" that
shows how they can be customized in a bewildering number of ways. We
typically won't be using these customizations; we'll try to stick to the
most common cases.  You're welcome to look at the API documentation, but I
am not asking you to do that on this first reading. Let's get the
high-level view down first. Still, it's good to know that if a jQuery UI
feature is *close* to what you want but *not* quite right, it's probably
customizable in the way that you want.

In class, we'll get some more experience with using these.

* [sortable](https://jqueryui.com/sortable/) We'll use this in the final project
* [autocomplete](https://jqueryui.com/autocomplete/) Developers should
always use this for state name when giving addresses.
* [datepicker](https://jqueryui.com/datepicker/) So easy and useful. We'll
use this in the final project as well
* [tabs](https://jqueryui.com/tabs/) A nice way to organize a page without
having lots of scrolling or switching to other pages. jQuery Mobile is
based on this idea.

Four features should be enough to get us started, but if there is
something else that you see that you think is cool, let me know and we'll
see if we can learn about it.


