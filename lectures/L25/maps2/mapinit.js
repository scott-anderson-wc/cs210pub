/* global google */

var itinerary = [
     "Boston, MA",
     "Denver, CO",
     "Fort Collins, CO",
     "Gardiner, WY",
     "West Yellowstone, WY",
     "Salt Lake City, UT",
     "Boston, MA" ];

// I made these all global so you could look at the values, but production
// code would hide them in an IFFE or module or something.

var mapProp;
var themap;
var geocoder;
var markers;
var locations;
var path;

var addressCache = {};
var numPending = 0;
var bounds;


// Code adapted from
// https://developers.google.com/maps/documentation/javascript/examples/geocoding-simple

function geocodeAddress(geocoder, address, index, destmap) {
    addressCache[address] = "pending";
    // an Ajax request, hence a callback
    geocoder.geocode({'address': address},
                     function(results, status) {
                         if( status === "OK" ) {
                             addressCache[address] = "done";
                             var location = results[0].geometry.location;
                             var marker = new google.maps.Marker({
                                 map: destmap,
                                 position: location
                             });
                             google.maps.event.addListener(marker,
                                                           'click',
                                                           function () {
                                                               var info = new google.maps.InfoWindow({
                                                                   content: address});
                                                               info.open(destmap, marker);
                                                           });
                             markers[index] = {'address': address,
                                               'location': location,
                                               'marker': marker};
                             locations[index] = location;
                             numPending--;
                             if(numPending == 0) {
                                 console.log(JSON.stringify(addressCache));
                                 console.log(JSON.stringify(locations));
                                 showPath();
                             }
                         } else {
                             console.log('Geocode failed: '+status);
                         }
                     });
}

function initMyMap() {
    mapProp = {
        center:new google.maps.LatLng(40.5,-105), // Fort Collins
        zoom:5
    };
    themap = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    geocoder = new google.maps.Geocoder();
     
    markers = [];
    locations = [];
    addressCache = {};
    numPending = itinerary.length;
    // initiate a bunch of requests
    itinerary.forEach(function (elt, index) {
        geocodeAddress(geocoder, elt, index, themap);
    });
}

function showPath() {
    path = new google.maps.Polyline({
        path: locations,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2
        });
    path.setMap(themap);
    // set map bounds
    bounds = new google.maps.LatLngBounds();
    locations.forEach(function (pt) { bounds.extend(pt); });
    themap.fitBounds(bounds);
}

