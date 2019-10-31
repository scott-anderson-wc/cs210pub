# Google API Keys and Google Maps

Google Maps are fun and not too hard to use.

To use them, we have to understand *Ajax*, but fortunately, we *do*!

## Plan

1. Questions on A10 (Jelly Blobs)?
1. Solutions to A09 (20 Questions)
1. Discuss Google Maps
1. Answer your questions
1. Building a Google Map app
1. Google API keys and referrer

## A09

[20 questions solution](../../solutions/a09-20questions-static/20-static.html)

## Google Maps tutorials

We'll spend time looking at this code and exploring the examples.

1. [Simple Map](https://developers.google.com/maps/documentation/javascript/examples/map-simple)
1. [Maps with Markers](https://developers.google.com/maps/documentation/javascript/examples/marker-simple)

Did you see the link to "Using Closures in Event Listeners"?

And some W3Schools examples. These used to be live...

1. [Maps Events](https://www.w3schools.com/graphics/google_maps_events.asp)
shows how to add event handlers to the map and to overlays such as markers.
1. [Maps Controls](https://www.w3schools.com/graphics/google_maps_controls.asp)
shows how to configure controls like the zoom (with +/- buttons or a slider) and so forth.
1. [Maps Types](https://www.w3schools.com/graphics/google_maps_types.asp)
shows some examples of the different map types (ROADMAP, SATELLITE, HYBRID, and TERRAIN)

## Your Questions

I'd answer [your questions](../../quizzes/quiz21.html) but there were none!

## Geocoder

Looking up the latitude and longitude of a location via an Ajax call is
pretty cool:

[geocoder tutorial](https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple)

## Example

I decided to build a Google map to show my summer vacation plan. This
version no longer works because the API key has expired, but we can look
at the code.

[My Summer Vacation](maps2/map.html)

I'll demo a version that does work in the C9 workspace. 

The code is somewhat interesting.  The hardest part is dealing with a set
of Ajax calls. Let's discuss that

## Multiple Ajax Calls

The itinerary has 7 locations on it.  We start with a list of 7 location
names.

We invoke the geocoder to look up each place to yield an object that has a
latitude and longitude in it.  From that we can make markers and add them
to the map.

Those can happen in *any* order, so no trouble with initiating 7
concurrent requests.

Finally, we want to take a list of all 7 locations, in order, and make a
path. How do to it?  How do we know when all 7 requests are done? Each
request knows when *it* is done, but they might finish in any order.

1. Before starting the 7 requests, set a counter to 7
1. Each request decrements the counter
1. Each requests checks to see if the counter has reached zero
1. The last request to finish invokes the function to create the path

## Exercise

You should download the [gmaps.tar](../../downloads/gmaps.tar) file and
unpack it using `tar xf`

Build a Google Map demo!

## Console

Let's talk about setting the *referrer* patterns for your API key

[credentials](https://console.developers.google.com/apis/credentials)

The API key I used for this example is CS204-SP19 

## Eni's Examples

Eni Mustafaraj made these [Google Maps
examples](/~mashups/pages/am3/gmaps.html) for her web mashups course.

## Summary

Google maps aren't trivial, and they exercise our understanding of Ajax
and callbacks, but we can do it!

## End of Class

At the end of each class, I'll hand out paper slips. On it, please write
*your name* and one of the following:

* A question you have about the material of the day
* Something you learned
* A suggestion
* An "I'm okay" statement

