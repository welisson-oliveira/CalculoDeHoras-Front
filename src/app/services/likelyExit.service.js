angular.module('app').service('LikelyExitService', LikelyExitService);

LikelyExitService.$inject = ['restFactory'];

/* @ngInject */
function LikelyExitService(restFactory) {
    const vm = this;
    vm.getLikelyExit = getLikelyExit;

    function getLikelyExit(data) {
        return restFactory.resource(['calculates/likelyExit']).post(data);
    }
    return {
        getLikelyExit: vm.getLikelyExit
    };
}
