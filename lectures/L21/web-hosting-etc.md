# Web Hosting and Other Topics

A grab-bag of hopefully interesting topics

## Plan

1. Web hosting on Tempest
1. Unicode
1. Inclusivity and Internationalization

## Web Hosting

C9 is really great for development, but doesn't make a good place for
permanent web hosting. That's not what it's for.

You have many options:

* Host on `cs.wellesley.edu`
* Create a GitHub account and host on `github.com`. Many employers expect
something like this, but other possibilities exist, such as `bitbucket.com`
* A private web hosting company. I personally use `dreamhost.com` but
that company is just one of many.

## Hosting on `cs.wellesley.edu`

Your account on `cs.wellesley.edu` AKA `tempest` is a general purpose Unix
account.

In it is a directory called `public_html`. Any file in that directory is
*on the world-wide web*. That is, Apache is willing to respond to a
request for that file by delivering it to the requesting browser.

How do you put something on the web? Copy it to that directory. 

How do you remove it from the web? Move it out of that directory (or change
the permissions so that Apache can't read it).

## Privacy Barrier

The previous section wasn't exactly right. Because we know that students
are still learning about web pages and often have pages that are "under
construction," we have implemented a default "privacy barrier."

That privacy barrier is simple:  access to a file is granted if either:

1. the requesting browser is on-campus (defined as having a wellesley.edu
IP address, so "on-campus" also means anyone using the VPN).
1. the requesting browser has some guest credentials (a username and password)

I will give these credentials in class. You can email me if you forget.

You can give out the guest credentials to friends and family. They don't
allow any power to modify anything on the server; they merely allow the
ability to read pages. Still, you need to be careful with them, since
giving them out allows the person to ready every student's web pages, not
just yours, so don't post them for the world to read.

## .htaccess

The privacy barrier is implemented by a magic file in your `public_html`
called `.htaccess`. Yes, the filename starts with a dot. That makes it
invisible for most directory listings. However, you can see "dot files" by
including the -A option (for *all* files):

<div class="codehilite"><pre>
[wendy@tempest public_html]$ ls
[wendy@tempest public_html]$ ls -A
.htaccess
[wendy@tempest public_html]$ ls -lA
total 4
-r--r-----. 1 wendy apache 515 Feb  4  2016 .htaccess
</pre></div>

Apache looks for a file of that name in your `public_html` for additional
configuration information, and the contents of that specifies the
protection barrier. 

Because the name of that file is special, all you need to do to remove the
privacy barrier is to rename that file. You can rename it back if you want
to restore the barrier:

<div class="codehilite"><pre>
[wendy@tempest public_html]$ ls -A
.htaccess
[wendy@tempest public_html]$ mv .htaccess dot.htaccess
[wendy@tempest public_html]$ ls 
dot.htaccess
</pre></div>

## index.html

Another special filename is `index.html`. If the requested URL omits the
filename, Apache looks for a file named `index.html` and if it exists,
that's the file that is delivered.  It's the *default* page in that
directory.

Consequently: `https://cs.wellesley.edu/~wendy/` gets the `index.html`
file from Wendy's `public_html`.

Note that `public_html` is *not* in the URL. That's because it's
*implicit*. 

## Exercise

Create a simple home page for yourself on Tempest. Develop the page using
C9 just the way we've done a zillion times:

1. make a folder for this work, say `homepage`
1. create an `index.html` in that folder. Put some non-trivial content
in it, like your name and a greeting
1. you could create a home.css file and link it to the index.html
1. create a folder for some images and search the web for some
appropriate images, like kittens to put in the folder
1. show an image on your page

First, test it on C9 to make sure it works. That's the point of a
development environment.

## Deployment

Now, make the page go live.  In a C9 shell do the following. Your C9
workspace probably already has a shell (usually entitled "bash"). If it
doesn't, use "Window > New Terminal" to create one

<div class="codehilite"><pre>
wendy:~/workspace $ scp -r homepage/* wendy@cs.wellesley.edu:public_html/
</pre></div>

The command you type is the part after the dollar sign.

If you already have a homepage and you don't want to overwrite it, omit
the `/*` at the end.

You may get a challenge about the authenticity. It will look like this:

<div class="codehilite"><pre>
wendy:~/workspace $ scp -r homepage/* wendy@cs.wellesley.edu:public_html/
The authenticity of host 'cs.wellesley.edu (149.130.15.5)' can't be established.
RSA key fingerprint is ae:53:ce:76:03:10:a9:23:ee:89:14:5a:23:3f:fb:32.
Are you sure you want to continue connecting (yes/no)?
</pre></div>

Type "yes" and press return to proceed. (Ideally, check that fingerprint
against a reference; the one above is correct for `cs.wellesley.edu`)

That command copies the files to your `public_html`.

If all goes well, you will then be able to visit the following URL
(substituting your own account for `wendy`) to see the page:

`https://cs.wellesley.edu/~wendy/`

## Errors

There are lots of mistakes you can make, all fixable. Here are some I
thought of:

* You copied the files to the wrong place.  
* The files have the wrong permissions
* The folders (directories) have the wrong permissions

## SFTP

If you need to move files or fix permissions, you can use SFTP.  Some
sample commands:

<div class="codehilite"><pre>
cd
pwd
ls
ls -l
chmod
rename
get
put
</pre></div>

I'll demo this with my own C9 account

## SSH

You can also *login* to Tempest, if your account permits it.  Try this
from either a Mac Terminal or from C9:

<div class="codehilite"><pre>
ssh youracct@cs.wellesley.edu
</pre></div>

The `ssh` command gives you a shell that is running *on* Tempest!

## Edit/Refresh

Let's sample the work flow:

1. Edit your file in C9
1. Check in C9 if it's right
1. re-deploy it (re-copy it to Tempest)
1. Check the deployed version in a browser

That's the development loop. You'll notice there are no exit conditions. 😀 &#x263A;

How did I get the smilies? Two different ways:

* insert a Unicode character (codepoint U+1f600)
* use an [HTML entity reference](https://www.w3schools.com/html/html_entities.asp) (codepoint U+263A)

See [white smiling face](http://www.fileformat.info/info/unicode/char/263a/)

See [grinning face](http://www.fileformat.info/info/unicode/char/1f600/)

## Unicode

When we talked about regular expressions, we introduced the notion of
characters from other languages.  So, let's take a little time to talk
about Unicode

## Unicode References

I strongly encourage you to read the following:

[Joel Spolsky's Unicode Introduction: the absolute minimum every software
developer absolutely positively must know about unicode and character sets
no
excuses](https://joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/)
If the title doesn't get you to read it, I don't know what else to say.
Well, I could tell you that Joel Spolsky is the co-founder and CEO of
Stack Overflow.

[Mathias Bynens: JavaScript has Unicode
Problem](https://mathiasbynens.be/notes/javascript-unicode) Some lovely
examples there.

[Mathias Bynens: Unicode-aware Regular Expressions in ECMAScript
6](https://mathiasbynens.be/notes/es6-unicode-regex)

[Unicode sampler](http://kermitproject.org/utf8.html)

## Unicode Concepts

* What is a *character*?
* What is a *font*?
* What is an *encoding*?
* What is ASCII?
* What is BMP?
* What is an Astral character?

## Some Practical Stuff

How to type Kölling on a Mac:

* K option+u o l l i n g

You can type it here:

<textarea rows=3 cols=40">Kölling</textarea>

```
Let's put that in a JavaScript variable and test it with some regular expressions:
```



<div class="codehilite"><pre>
var name = "Kölling";
name;
name.length;
/\w+/.text(name)
/[A-Za-z]+/.test(name);
</pre></div>

## Astral Characters


Cool!  But o-with-umlaut is from the BMP. Let's try an astral character:

[pile of poo](https://emojipedia.org/pile-of-poo/)

Check out the codepoint.

<div class="codehilite"><pre>
var poo = "\u{1F4A9}";
poo;
poo.length;
/\w+/.test(poo);   // word character
/^.$/.test(poo);   // single character
/^.$/u.test(poo);   // single unicode character
</pre></div>

Let's try a very new character, namely
[Colbert](https://emojipedia.org/face-with-one-eyebrow-raised/)

Again, check out the codepoint.

<div class="codehilite"><pre>
var colbert = "\u{1F928}";
colbert;
colbert.length;
/\w+/.test(colbert);   // word character
/^.$/.test(colbert);   // single character
/^.$/u.test(colbert);   // single unicode character
</pre></div>

## Combining Forms

Note that the letter ([latin small letter o with diaeresis](https://en.wikipedia.org/wiki/Ö) is actually
ambiguous:

* U+00F6
* U+0308 U+006F (the second is a lowercase ASCII o)

From Wikipedia:

<blockquote>
The Unicode code point for ö is U+00F6. It can also be created by
compositing the character U+0308 "COMBINING DIAERESIS" with an "o" or "O".
</blockquote>

So that ambiguity is *also* a problem, because the "same" text can be
written in two different ways!

[thumbs up with skin
tone](https://emojipedia.org/thumbs-up-sign-type-1-2/)

Good? Bad?

From XKCD:

[Vomiting Emoji](https://xkcd.com/1813/)

## Inclusivity

Let's discuss inclusivity if we have time.

We can also talk about [internationalization](~cs304/lectures/i18n/i18n.html)

## Summary

* Web Hosting is not too hard
* Unicode is important to know a little about
* Inclusivity is also important
  
## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

