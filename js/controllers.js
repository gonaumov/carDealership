/* Controllers */

var carDealerShipAppControllers = angular.module('carDealerShipAppControllers', []);

carDealerShipAppControllers.controller('MainController', function($scope, $route) {
    $scope.$route = $route;
})

carDealerShipAppControllers.controller('HomeCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'HomeCtrl';

    }]);


carDealerShipAppControllers.controller('AvailableCarsCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'AvailableCarsCtrl';
    }]);

carDealerShipAppControllers.controller('ServicesCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'ServicesCtrl';
    }]);

carDealerShipAppControllers.controller('ContactCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'ContactCtrl';
    }]);

carDealerShipAppControllers.controller('AdministrationCtrl', ['$scope',
    function ($scope) {
        $scope.name = 'AdministrationCtrl';

        /**
         * In this mettod we will
         * add new car into localStorage
         * trough $resource
         */
        $scope.addCar = function() {

        };
    }]);