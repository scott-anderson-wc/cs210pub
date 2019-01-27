(function (window) {
  'use strict';

  var App = window.App || {};
  var $ = window.jQuery;

  function FormHandler(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$formElement = $(selector);
    if (this.$formElement.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  FormHandler.prototype.addSubmitHandler = function (fn) {
    console.log('Setting submit handler for form');
    this.$formElement.on('submit', function (event) {
      // changed for this assignment; don't always prevent form submission
      // event.preventDefault();

      var data = {};
      $(this).serializeArray().forEach(function (item) {
        data[item.name] = item.value;
        console.log(item.name + ' is ' + item.value);
      });
      console.log(data);
      // changed for this assignment, provide the event as well as the data
      fn(data,event);
      // changed for this assignment, don't reset the form
      // this.reset();
      this.elements[0].focus();
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;
})(window);
