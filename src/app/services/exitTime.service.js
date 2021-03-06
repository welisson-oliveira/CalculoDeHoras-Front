angular.module('app').service('ExitTimeService', ExitTimeService);

ExitTimeService.$inject = ['restFactory'];

/* @ngInject */
function ExitTimeService(restFactory) {

    const vm = this;
    vm.getExitTime = getExitTime;

    function getExitTime(data) {
        console.log(data);
        return restFactory.resource(['calculates/exitTime']).post(data);
    }
    return {
        getExitTime: vm.getExitTime
    };
}
