/* App Module */

var carDealerShipApp = angular.module('carDealerShipApp', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap',
    'carDealerShipAppControllers',
    'carDealerShipAppServices'
]);

carDealerShipApp.config(['$routeProvider', '$compileProvider',
    function ($routeProvider, $compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);

        $routeProvider.
            when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            }).
            when('/availableCars', {
                templateUrl: 'partials/availableCars.html',
                controller: 'AvailableCarsCtrl'
            }).
            when('/services', {
                templateUrl: 'partials/services.html',
                controller: 'ServicesCtrl'
            }).
            when('/contact', {
                templateUrl: 'partials/contact.html',
                controller: 'ContactCtrl'
            }).
            when('/administration', {
                templateUrl: 'partials/administration.html',
                controller: 'AdministrationCtrl'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);