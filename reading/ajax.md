# Ajax

Before Ajax, the way that a browser communicated with a server (the
"back-end") was typically to submit a form (or get a URL), whereupon the
web page was *replaced* with the response. That replacement can sometimes
interrupt a user's experience. Imagine if everytime you clicked "like" on
a Facebook page, the entire page was replaced with a new one, even if it
looked 99% like the old one.

Ajax is a powerful modern technique whereby a browser page can communicate
with a server without having to be replaced by the response.  Instead,
it's in a kind of "side" conversation going on in parallel
(*asynchronously*) with the browser paying attention to you.

## Asynchronous Requests

When we invoke a function, we wait around for the response, like this, and
then we can use the result as the argument to other functions:

```
:::JavaScript
var val = foo(x);
bar(val);
more_work();
```

That's fine in the context of normal programming, but it doesn't work for
lengthy operations. Suppose `foo` took tens of milliseconds to return.
Not only does `bar` have to wait (it would anyhow), but so does
`more_work`, even if it doesn't depend on `foo`.  More importantly, if the
browser has something else to do (such as pay attention to the user), it
can't be sitting around waiting for `foo` to complete.

Instead, we want to use an *asynchronous* style of programming, where
instead of `foo` returning a value, we pass `foo` a function that it
should invoke on the result. Meanwhile, neither `more_work` nor the
browser will have to wait for `foo` to complete. Here's the programming
style:

```
:::JavaScript
foo(x, bar);
more_work();
```

The `more_work` function and whatever else the browser is doing can
execute *immediately*. Some tens of milliseconds later, once `foo` is
done, `foo` will arrange to invoke `bar`.

That's how Ajax works, because the Ajax call starts a network connection
to the server and waits for the response:

```
:::JavaScript
$.post('url', data, func);
```

The first argument is the URL of the server to send the data to. The
second argument is the data, usually as a JavaScript object
literal. Finally, the last argument is a *callback* function that will get
invoked with the response from the server.  Here's a bit more detail:

```
:::JavaScript
$.post('url', data, function (response) { console.log('Got '+response); });
```

In the coffeerun app, they send the data to an application they have
running on Heroku.

The `.get()` method works the same way. In fact, both are wrappers for a
general `.ajax()` method that needs to know what HTTP request you want to
make:

```
:::JavaScript
$.ajax('url', {type: 'get', data: data, success: func});
$.ajax('url', {type: 'post', data: data, success: func});
$.ajax('url', {type: 'delete', data: data, success: func});
```

## LocalStorage

Instead of saving things to a remote server, you can save them in the
browser, using `localStorage`.

### Setting a value

To store something in the local storage of your browser, any of the
following will work:

```
:::JavaScript
localStorage.fred = 'Fred Weasley';
localStorage['george'] = 'George Weasley';
localStorage.setItem('harry', 'Harry Potter');
```

To the the values back out, just use the expressions on the left hand
side, or the `getItem` method:

```
:::JavaScript
console.log(localStorage.fred);
console.log(localStorage['george']);
console.log(localStorage.getItem('harry'));
```

There are also methods `.removeItem` which removes a single key, and
`clear` which removes all keys.
