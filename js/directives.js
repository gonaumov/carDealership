/* application directives */
carDealerShipApp.directive('fileToScopeString', function() {
    return {
        link: function(scope, element){
            element.on('change', (function() {
                return function() {
                    if (this.files.length == 0) {
                        return;
                    }

                    var fileToLoad = this.files[0];
                    var fileReader = new FileReader();

                    fileReader.onload = function (fileLoadedEvent) {
                        var srcData = fileLoadedEvent.target.result; // <--- data: base6

                        if(angular.isUndefined(scope.car)) {
                            scope.$apply(function () {
                                scope.car = {};
                            })
                        }

                        scope.$apply(function () {
                            scope.car.carPiture = srcData;
                        });
                    };

                    fileReader.readAsDataURL(fileToLoad);
                }
            })());
        }
    }
});

carDealerShipApp.directive("showErrorMessage", function () {
    return {
        scope: {
            track: "&"
        },
        link: function (scope, iElement) {
            scope.$watch(scope.track, function (value) {
                if (angular.isDefined(value) == false) {
                    iElement.get(0).setCustomValidity("You must get geolocation of the car!");
                } else {
                    iElement.get(0).setCustomValidity("");
                }
            });
        }
    }
});