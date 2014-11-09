/**
 * services file
 */

var carDealerShipAppServices = angular.module('carDealerShipAppServices', ['ngResource']);

carDealerShipAppServices.factory('Car', ['$resource',
    function($resource){
        return $resource('/cars/:carId', {}, {});
    }]);


carDealerShipAppServices.factory('GetGeoLocation', ['$q',
    function($q){
        return function(address) {
            var deferred = $q.defer();
            var geocoder = new google.maps.Geocoder();

            if(angular.isUndefined(address) || address.length == 0)  {
                deferred.reject('You must provide address.');
            }

            geocoder.geocode({'address': address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    deferred.resolve({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                } else {
                    deferred.reject('Geocode was not successful for the following reason: ' + status);
                }
            });

            return deferred.promise;
        }
    }]);
