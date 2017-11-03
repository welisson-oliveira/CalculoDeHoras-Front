angular.module('app').service('MissingTimeService', MissingTimeService);

MissingTimeService.$inject = ['restFactory'];

/* @ngInject */
function MissingTimeService(restFactory) {
    const vm = this;
    vm.getMissingTime = getMissingTime;

    function getMissingTime(data) {
        return restFactory.resource(['calculates/missingTime']).post(data);
    }
    return {
        getMissingTime: vm.getMissingTime
    };
}
