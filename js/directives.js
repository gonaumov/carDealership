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