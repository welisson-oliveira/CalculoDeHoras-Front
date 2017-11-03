angular.module('app')
    .controller('MissingTimeController', MissingTimeController);

MissingTimeController.$inject = ['MissingTimeService'];

/* @ngInject */
function MissingTimeController(MissingTimeService, directives) {
    const vm = this;
    vm.missingTime = {
        hour: '',
        minutes: ''
    };
    vm.warning = false;
    vm.focus = true;
    vm.response = {};
    vm.getMissingTime = function () {
        if (vm.missingTimeForm.$valid) {
            return MissingTimeService.getMissingTime(vm.missingTime).then(function (missingTime) {
                vm.response.missingTime = missingTime.hour + ":" + missingTime.minutes;
                vm.missingTime = {};
                vm.warning = false;
                return vm.response.missingTime;
            }, function (error) {
                vm.warning = true;
                vm.response.error = error;
                return vm.response.error;
            });
        }
    }
}
