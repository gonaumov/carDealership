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

carDealerShipApp.directive("showGoogleMap", function () {
    return {
        scope: {
            geocode: "&"
        },
        link: function (scope, iElement) {
            scope.$watch(scope.geocode, (function (map) {
                return function (value) {
                    if (angular.isDefined(value)) {
                        var location = new google.maps.LatLng(value.lat, value.lng);

                        if (angular.isUndefined(map)) {
                            map = new google.maps.Map(iElement.get(0), {
                                center: location,
                                zoom: 12
                            });
                        }

                        map.setCenter(location);

                        var marker = new google.maps.Marker({
                            map: map,
                            position: location,
                            title: value.address
                        });

                        map.setZoom(16);
                    } else {
                        iElement.empty();
                        map = undefined;
                    }
                }
            })());
        }
    }
});