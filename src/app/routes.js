angular.module('app')
    .config(routesConfig);

/* @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('/');

    $httpProvider.defaults.withCredentials = true;

    $stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: 'app/components/dashboard.html',
            controller: 'DashBoardController',
            controllerAs: 'vm'
        }).state('exitTime', {
            url: '/exitTime',
            templateUrl: 'app/components/exitTime.html',
            controller: 'ExitTimeController',
            controllerAs: 'vm'
        }).state('likelyExit', {
            url: '/likelyExit',
            templateUrl: 'app/components/likelyExit.html',
            controller: 'LikelyExitController',
            controllerAs: 'vm'
        }).state('missingTime', {
            url: '/missingTime',
            templateUrl: 'app/components/missingTime.html',
            controller: 'MissingTimeController',
            controllerAs: 'vm'
        }).state('overtime', {
            url: '/overtime',
            templateUrl: 'app/components/overtime.html',
            controller: 'OvertimeController',
            controllerAs: 'vm'
        });
}
