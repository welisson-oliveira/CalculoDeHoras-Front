angular.module('app').config(['$httpProvider',function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);
  