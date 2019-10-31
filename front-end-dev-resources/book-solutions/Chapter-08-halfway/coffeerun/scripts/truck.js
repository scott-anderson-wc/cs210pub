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
  Truck.prototype.printOrders_buggy = function () {
    var customerIdArray = Object.keys(this.db.getAll());

    console.log('Truck #' + this.truckId + ' has pending orders:');
    customerIdArray.forEach(function (id) {
      console.log(this.db.get(id));
    });
  };

  // Works using a closure over 'that':
    Truck.prototype.printOrders_closure = function () {
        var customerIdArray = Object.keys(this.db.getAll());
        
        var that = this;
        var print1 = function (id) { console.log(that.db.get(id)); }
        customerIdArray.forEach( print1 );
    };

    Truck.prototype.printOrders_bind = function () {
        var customerIdArray = Object.keys(this.db.getAll());
        
        var print1 = function (id) {
            console.log(this.db.get(id));
        }.bind(this);
        customerIdArray.forEach( print1 );
    };

    Truck.prototype.printOrders_solved = function () {
        var customerIdArray = Object.keys(this.db.getAll());
        
        customerIdArray.forEach( function (id) {
            console.log(this.db.get(id));
        }.bind(this));
    };

  App.Truck = Truck;
  window.App = App;
})(window);

var myTruck; 
function bugSetup() {
    myTruck = new App.Truck('007',new App.DataStore());
    myTruck.createOrder({ emailAddress: 'm@bond.com', coffee: 'earl grey'});
    myTruck.createOrder({ emailAddress: 'dr@no.com', coffee: 'decaf'});
    myTruck.createOrder({ emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
}
    
function replicateBug() {
    myTruck.printOrders();
}
