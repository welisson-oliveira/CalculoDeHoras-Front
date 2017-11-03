angular.module('app')
.controller('ExitTimeController', ExitTimeController);

ExitTimeController.$inject = ['ExitTimeService'];

/* @ngInject */
function ExitTimeController(ExitTimeService, directives) {
    const vm = this;
    vm.exitTime = {
        entryTime : {
            hour: '',
            minutes: ''
        },
        lunchTimeInit : {
            hour: '',
            minutes: ''
        },
        lunchTimeEnd : {
            hour: '',
            minutes: ''
        }
    };
   
    vm.focus = true;
    vm.response = {};
    vm.getExitTime = function(){
        if(vm.exitTimeForm.$valid){
            return ExitTimeService.getExitTime(vm.exitTime).then(function(exitTime){
                console.log(exitTime);
                vm.response.exitTime = exitTime.hour+":"+exitTime.minutes;
                vm.exitTime = {};
                return vm.response.exitTime;
            }, function(error){
                console.log(error.errorCode);
                vm.response.error = error;
                return vm.response.error;
            });
        }
    }
}
