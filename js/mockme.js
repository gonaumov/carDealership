
(function() {
  var mockme = angular.module('MockMe', ['ngMockE2E']);

  function showErrorMessageAndReloadBrowser() {
    var errorMessage = "Persistent Storage maximum size reached. This is just a demo.";
    errorMessage += "\nPlease use small pictures.";
    alert(errorMessage);
    localStorage.clear();
    window.scrollTo(0, 0);
    window.location.reload(true);
  }

  mockme.provider('MockMe', [function() {
    return {
      mappings: [],
      passthrough: [],
      idGenerator: function(obj) {
        return Math.floor(Math.random() * 10000);
      },
      $get: function() {
        return [this.mappings, this.passthrough, this.idGenerator];
      }
    };
  }]);

  var fourOhFour = {
    'message' : 'Not Found'
  };

  mockme.run(['$httpBackend', '$http', '$q', 'MockMe', function($httpBackend, $http, $q, MockMe) {
    var jsonPromises = [];
    var urls = [];

    angular.forEach(MockMe[0], function(mapping, i) {
      var mappingUrl = mapping.url;
      var json;

      if (mappingUrl in localStorage) {
        json = JSON.parse(localStorage[mappingUrl]);
      } else {
        json = mapping.json;
        try {
          localStorage[mappingUrl] = JSON.stringify(json);
        } catch (ex) {
            showErrorMessageAndReloadBrowser();
        }
      }

      var idRe = new RegExp(mappingUrl + '\\?id=([0-9]+)');

      // get all
      $httpBackend.whenGET(mappingUrl).respond(function(method, url, data, headers) {
        return [200, json];
      });

      // get by "id" attribute
      $httpBackend.whenGET(idRe).respond(function(method, url, data, headers) {
        var id = idRe.exec(url)[1];

        var instance = _.findWhere(json, {id: id});
        if (!instance) {
          instance = _.findWhere(json, {id: parseInt(id, 10)});
        }

        if (instance) {
          return [200, instance];
        } else {
          return [404, fourOhFour];
        }
      });

      // create new item
      $httpBackend.whenPOST(mappingUrl).respond(function(method, url, data, headers) {
        var item = JSON.parse(data);

        var compare = function(obj) { return obj.id === item.id; };

        do {
          item.id = MockMe[2](item);
        } while (_.find(json, compare));

        json.push(item);
        try {
          localStorage[mappingUrl] = JSON.stringify(json);
        } catch (ex) {
          showErrorMessageAndReloadBrowser();
        }

        return [200, item];
      });

      // remove an item
      $httpBackend.whenDELETE(idRe).respond(function(method, url, data, headers) {
        var id = idRe.exec(url)[1];
        var instance = _.findWhere(json, {id: id});
        if (!instance) {
          instance = _.findWhere(json, {id: parseInt(id, 10)});
        }

        if (!instance) {
          return [404, fourOhFour];
        }

        json = _.without(json, instance);
        try {
          localStorage[mappingUrl] = JSON.stringify(json);
        } catch (ex) {
          showErrorMessageAndReloadBrowser();
        }

        return [200, {'message': 'Deleted'}];
      });

      $httpBackend.whenPUT(idRe).respond(function(method, url, data, headers) {
        var id = idRe.exec(url)[1];
        var updates = JSON.parse(data);

        var instance = _.findWhere(json, {id: id});
        if (!instance) {
          instance = _.findWhere(json, {id: parseInt(id, 10)});
        }

        if (!instance) {
          return [404, fourOhFour];
        }

        instance = _.extend(instance, updates, {id: instance.id});
        try {
          localStorage[mappingUrl] = JSON.stringify(json);
        } catch (ex) {
          showErrorMessageAndReloadBrowser();
        }

        return [200, {'message': 'Ok'}];
      });


    });

    angular.forEach(MockMe[1], function(pass) {
      $httpBackend.whenGET(pass).passThrough();
    });
  }]);
})();
