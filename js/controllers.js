/* Controllers */

var carDealerShipAppControllers = angular.module('carDealerShipAppControllers', []);

carDealerShipAppControllers.controller('MainController', function($scope, $route) {
    $scope.$route = $route;
})

carDealerShipAppControllers.controller('HomeCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'HomeCtrl';

    }]);


carDealerShipAppControllers.controller('AvailableCarsCtrl', ['$scope', 'Car',
    function ($scope, Car) {
        $scope.name = 'AvailableCarsCtrl';

        function showCarsList() {
            Car.query().$promise.then(function (carList) {
                $scope.carlist = carList;
            });
        }

        showCarsList();

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

carDealerShipAppControllers.controller('AdministrationCtrl', ['$scope', 'Car', '$modal',
    function ($scope, Car, $modal) {
        $scope.name = 'AdministrationCtrl';

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
            newCar.manufacturer = $scope.car.manufacturer;
            newCar.carPiture = $scope.car.carPiture;
            newCar.modelOfCar = $scope.car.modelOfCar;
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

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];
    }]);