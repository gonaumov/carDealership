/* Controllers */

var carDealerShipAppControllers = angular.module('carDealerShipAppControllers', []);

carDealerShipAppControllers.controller('MainController', function($scope, $route) {
    $scope.$route = $route;
});

carDealerShipAppControllers.controller('HomeCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'HomeCtrl';

    }]);


carDealerShipAppControllers.controller('AvailableCarsCtrl', ['$scope', 'Car', '$filter',
    function ($scope, Car, $filter) {
        var orderBy = $filter('orderBy');

        $scope.name = 'AvailableCarsCtrl';

        $scope.order = function(predicate, reverse) {
            $scope.carlist = orderBy($scope.carlist, predicate, reverse);
        };

        function showCarsList() {
            Car.query().$promise.then(function (carList) {
                $scope.carlist = carList;
            });
        }

        showCarsList();

        $scope.predicate = '-manufacturer';

        $scope.removeCar = function (carId) {
            Car.delete({id: carId}).$promise.then(
                function () {
                    showCarsList();
                }
            );
        }
    }]);

carDealerShipAppControllers.controller('ServicesCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'ServicesCtrl';
    }]);

carDealerShipAppControllers.controller('ContactCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'ContactCtrl';
    }]);

carDealerShipAppControllers.controller('AdministrationCtrl', ['$scope', 'Car', '$modal', 'GetGeoLocation',
    function ($scope, Car, $modal, GetGeoLocation) {
        $scope.name = 'AdministrationCtrl';

        $scope.car = {
            inStock: "Yes"
        };

        $scope.closeAlert = function(obj) {
            if(angular.isDefined($scope[obj])) {
                delete $scope[obj];
            }
        }

        $scope.getGeolocation = function(address) {
            if(angular.isDefined($scope.errorMessage)) {
                delete $scope.errorMessage;
            }

            GetGeoLocation(address).then(function(result) {
                /**
                 * here we will working with
                 * received geolocation
                 */
                $scope.geolocation = result;
                $scope.geoLocationMsg = angular.copy(result);
            }).catch(function(error) {
                $scope.errorMessage = error;
            });
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };

        /**
         * In this mettod we will
         * add new car into localStorage
         * trough $resource
         */
        $scope.addCar = function () {
            var resultModalCtrl = function ($scope, $modalInstance) {
                $scope.ok = function () {
                    $modalInstance.close();
                };
            };

            var newCar = new Car();
            angular.extend(newCar, $scope.car);
            newCar.productionDate = $scope.dt.getTime();

            newCar.$save().then(function (result) {
                $modal.open({
                    templateUrl: 'partials/modalSuccessContent.html',
                    controller: resultModalCtrl,
                    size: 'sm'
                }).result.then(function() {
                        delete $scope.car;
                        /**
                         * small dirty hack ..
                         */
                        $("#carPiture").val("");
                        $scope.today();
                        if(angular.isDefined($scope.geolocation)) {
                            delete $scope.geolocation;
                        }

                        if(angular.isDefined($scope.geoLocationMsg)) {
                            delete $scope.geoLocationMsg;
                        }

                        resultModalCtrl = null;
                    });
            });
        };

        $scope.today();

        $scope.clear = function () {
            $scope.dt = null;
        };

        $scope.toggleMin = function() {
            $scope.minDate = $scope.minDate ? null : new Date();
        };

        $scope.toggleMin();

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.format = 'dd-MMMM-yyyy';
    }]);