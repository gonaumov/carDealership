/**
 * Mock App
 */

(function() {
  var testModule = angular.module('MyAppTest', ['carDealerShipApp', 'MockMe']);

  testModule.config(function(MockMeProvider) {

    // Setup Mock http endpoints
    MockMeProvider.mappings = [
      { url: '/cars', json: [] }
    ];

    // Passthrough
    MockMeProvider.passthrough = [
      /partials.*/
    ];
  });

})();
