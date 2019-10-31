# Modules, Objects and Methods

This reading is supplemental to Chapter 8 (page 173 to the end).

Many of you are familiar with Python from CS 111. Python has a nice module
system in which we can *import* various helpful modules into our main
program. Our code might look like this:

```
:::Python
import math, cs1graphics

def modifyPicture(pic,angle):
    cs1graphics.adjustY( pic, math.tan(angle) )
```

Don't worry about the details of the code. I doubt that `adjustY` exists;
I just made it up. The point is that we can use functions that are defined
in different modules by using the syntax `module.name` where the part to
the left of the dot is the name of the module (`math` or `cs1graphics`)
and the part to the right is one of the names that lives in that module.

Moreover, the set of names in each module is separate. If, by coincidence,
both modules use the same name, there's no conflict. One could be
`math.PI` and the other could be `cs1graphics.PI`

Separating sets of names like this is useful in CS, because it reduces the
chance of accidental name *collisions*.

A set of names and values like this is called a *namespace*. There are
lots of kinds of namespaces; a Python module is just one. We'll see a few
more.

In fact, Python dictionaries are a kind of namespace, because again they
comprise a set of names and values. We look things up and store things
under various *keys* which can be strings or *names*

```
:::Python
math2 = dict()
math2['pi'] = 3.2
math2['e'] = 2.71828

colors = dict()
colors['red'] = 0xff0000
colors['tan'] = 0xd2b48c
```

Indeed, my understanding is that Python's modules are implemented using
dictionaries.

## JavaScript objects are namespaces

We can do the same thing as Python modules in JavaScript by using
*objects*, which are just like Python dictionaries. They also conveniently
give us separate sets of names. For example:

```
:::JavaScript
math2 = {pi: 3.2,
         e: 2.71828,
         tan: function (angle) { "complex code here"; },
         sqrt: function (num) { "newton's method"; }
         };

colors = {red: 0xFF000,
          green: 0x00FF00,
          black: 0,
          white: 0xFFFFFF,
          tan: 0xd2b48c};
math2.tan != colors.tan;
```

The above code creates two objects that work just like Python modules:
they give us `module.name` sets of names and the names are distinct, so
if, by coincidence the same name is used in both modules, everything is
okay.

## Inside and Outside

From outside a module, you have to access a value using the dot notation,
like `math.PI`.  From *inside* a module, you can usually use a shorthand
that omits the module name. That is, inside the `math` module, your code
can just refer to `PI` and it means the `PI` in this module.

In fact, in Python a module doesn't necessarily know its name, and it can
be imported as something else. In England, they probably do the following:

```
:::Python
import math as maths

print(maths.tan(2*maths.PI))
```

Can we do that in JavaScript? We can, but we will use the function
namespace to do it.

What do we mean by a function namespace? A function has an "inside" and an
"outside": inside the function, we can refer to local variables, and those
are not useable from outside.  We'll use a function's local variables for
the inside of our module.

```
:::JavaScript
math2 = (function namespace() {
    var PI = 3.2;

    function area(radius) {
        return PI*radius*radius;
    }

    var mod = {};
    mod.PI = PI;
    mod.area = area;
    return mod;
})();
```



