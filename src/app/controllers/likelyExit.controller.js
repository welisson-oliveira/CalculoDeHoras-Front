angular.module('app')
    .controller('LikelyExitController', LikelyExitController);

LikelyExitController.$inject = ['LikelyExitService'];

/* @ngInject */
function LikelyExitController(LikelyExitService, directives) {
    const vm = this;
    vm.likelyExit = {
        hour: '',
        minutes: ''
    };
    vm.focus = true;
    vm.response = {};
    vm.getLikelyExit = function () {
        if (vm.likelyExitForm.$valid) {
            return LikelyExitService.getLikelyExit(vm.likelyExit).then(function (likelyExit) {
                vm.response.likelyExit = likelyExit.hour + ":" + likelyExit.minutes;
                vm.likelyExit = {};
                return vm.response.likelyExit;
            }, function (error) {
                vm.response.error = error;
                return vm.response.error;
            });
        }
    }
}
