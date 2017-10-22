angular.module('app').config(['RestangularProvider', 'configs', function(RestangularProvider, configs) {
    RestangularProvider.setBaseUrl(configs.rootURL);
}]);
