// This file is roughly what you have by page 171.

(function (window) {
  'use strict';

  var App = window.App || {};

  function DataStore() {
    console.log('running the DataStore function')
  }

  // You will add methods here. See page 172+

  App.DataStore = DataStore;
  window.App = App;
})(window);
