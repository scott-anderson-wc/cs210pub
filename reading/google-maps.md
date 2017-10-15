# Google Maps

Google Maps is a useful feature to add to many websites and it's free!.
The W3Schools has a nice tutorial and a number of fun examples. We won't
read all of them, but a few will be helpful.

In order to use the Google Maps API, though, you have to have an API key,
which is also free.

(Note that it's possible to do without this, but Google restricts the
*rate* of anonymous requests, so you have to do clever things with
`setTimeout()` or the like to issue a series of requests, say to lookup
the longitude and latitude of a location. All of which is just an attempt
to evade their restriction on a service they are providing for free. My
view is that we should go along with their request for an API key. At
least, we will try. If we run into trouble with the combination of Cloud 9
and Google's API key, we'll revert to an anonymous access.)

## API Key

To get a Google API key, you have to have a Google account. We all have
one, thanks to the Google Apps for Education that Wellesley provides. In
other words, we'll use our domain accounts.

Start by reading this page describing how to [get a Google API
key](https://developers.google.com/maps/documentation/javascript/get-api-key)
and following the instructions there.

### Step 0

Once we create an API key, we'll create a `script` element to load the
Google Maps code, supplying that key. To prepare a place for that, let's
do some set-up first:

1. In your C9 account, create a new HTML file
1. From the [W3 Schools Google
Maps](https://www.w3schools.com/graphics/google_maps_intro.asp) page, copy
paste the initial code

Leave this browser tab open and return to the tab with Google's [directions](https://developers.google.com/maps/documentation/javascript/get-api-key)

### Step 1

Step 1: click on the blue link to start the process

1. Click on "New Project" 
1. Give the project a name. I used "C9 Demo 1". You could do the same
1. Click on "Create Project" and wait for a little while (less than a
minute)
1. Copy/paste the API key into the C9 file. You can easily find it again via
your Google account settings, but let's grab it now.
1. Click on the link to your API Console. Open it in a new tab, so we can
return to it later.
1. Notice the lack of key restrictions. Let it be unrestricted for now,
but we'll return to this later.
1. Click on "save"
1. Go back to the previous tab and click on "FINISH"

### Step 2

In this step, Google's directions will have you create a `script` element
to load the maps code using your API key.

Since you have a file in your C9 account, copy/paste Google's `script`
element into your C9 file.

Take a moment to look at both `script` elements (W3Schools and
Google's).

W3Schools' script looks like this:

```
:::HTML
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&callback=myMap"></script>
```

Google's script is almost identical, but it adds the `async` and `defer`
attributes:

```
:::HTML
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
```

You can read more about these attributes on the [MDN
Script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script),
but essential these extra attributes allow the browser to load other
things while the Google Maps code is loading, without bringing the browser
to a screeching halt.

Let's use the Google version. Delete the W3Schools version and copy/paste
your API key into the script tag to replace the `YOUR_API_KEY` placeholder.

## Callback

Notice that, in addition to the `key=YOUR_API_key` there is also
`callback=myMap` (W3Schools) or `callback=initMap` (Google's). The value
on the left of the equals sign is the name of a function that will be
invoked when the Google map code is done loading.

We're pretty familiar with callback functions by now. This is just another
manifestation of the idea. This time, the event is the completion of
loading of the library.  Once the library is loaded, we can initialize our
map and do whatever else we want to do.

## Done

Save the file and run it. If all goes well, you'll have a basic Google
map.

Try changing the zoom level to 16 and latitude and longitude like this:

```var mapProp = {
    center: new google.maps.latLng(42.292294,-71.31054),
    zoom: 16
    }```

That's enough for now.

## Tutorial

Please read through the first two pages of the W3Schools tutorials. You
can just start at the first one and click the big green "next" button on
each page.  

1. [Maps Intro](https://www.w3schools.com/graphics/google_maps_intro.asp)
This is the set up to show a nice, static map, at a place of your choosing
(specifying the `center` given a latitude and longitude. Note that
latitude measures north/south location and ranges from -90 (south pole) to +90
(north pole). Longitude measures east/west location and ranges from -180
(middle of the Pacific) to +180 (same as -180) with 0 degrees longitude
being Greenwich, England.
1. [Maps Basic](https://www.w3schools.com/graphics/google_maps_basic.asp)
This is more information on the basic map, explaining about the map container (a `div`) and the initialization function. It also shows a demo of four
different map types (ROADMAP, SATELLITE, HYBRID, and TERRAIN)



