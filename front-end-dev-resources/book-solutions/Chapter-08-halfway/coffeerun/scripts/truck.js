(function (window) {
  'use strict';
  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };

  // This is the buggy version from page 183
  Truck.prototype.printOrders = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerIdArray.forEach(function (id) {
      console.log(this.db.get(id));
    });
  };

  App.Truck = Truck;
  window.App = App;
})(window);

var myTruck; 
function replicateBug() {
    myTruck = new App.Truck('007',new App.DataStore());
    myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
    myTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
    myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
    myTruck.printOrders(); // triggers the bug on line 25
}
    
