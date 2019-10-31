// I'll start you off with the code from page 177

(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
  }

  // Methods will go here



  App.Truck = Truck;
  window.App = App;
})(window);

// This is the test data from the top of page 179, again to save you 
// a little typing.

var myTruck; 
function addTestData() {
    myTruck = new App.Truck('007',new App.DataStore());
    myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
    myTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
    myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
}

function replicateBug() {
    myTruck.printOrders(); // triggers the bug 
}
