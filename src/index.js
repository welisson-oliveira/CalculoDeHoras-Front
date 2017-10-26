angular.module('constants', []);
angular
  .module('app', [
    'ui.router',
    'ui.bootstrap',
    'restangular',
    'constants',
    'ngCookies',
    'ngFlash',
    'directives'
  ]);
