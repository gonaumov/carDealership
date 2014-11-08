/**
 * services file
 */

var carDealerShipAppServices = angular.module('carDealerShipAppServices', ['ngResource']);

carDealerShipAppServices.factory('Car', ['$resource',
    function($resource){
        return $resource('cars/:carId', {}, {});
    }]);