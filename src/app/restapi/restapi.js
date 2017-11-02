angular.module('app').factory("restFactory", function (Restangular) {

    var RESTful = new function () {
        var that = this;
        var baseURL;

        this.one = function (arg) {
            return Restangular.one(arg);
        };

        this.resources = function (args) {
            var base;
            args.forEach(function (element, index, array) {
                if (base) {
                    base = base.all(element);
                } else {
                    base = Restangular.all(element);
                }
            });
            return base;
        };

        this.pathVariable = function(args) {
            var path;
            args.forEach(function (element, index, array){
                if (path) {
                    path = path.one(element);
                } else {
                    path = Restangular.one(element);
                }
            });
            return path;
        }

        this.resource = function (arg) {
            return that.resources([arg]);
        };

        this.resourcesFormData = function (args) {
            return that.resources(args).withHttpConfig({ transformRequest: angular.identity });
        };

        this.resourceFormData = function (arg) {
            return that.resource(arg).withHttpConfig({ transformRequest: angular.identity });
        };
    };

    // Return public API.
    return RESTful;

});
