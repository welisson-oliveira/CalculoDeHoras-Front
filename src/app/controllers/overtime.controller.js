angular.module('app')
.controller('OvertimeController', OvertimeController);

OvertimeController.$inject = ['OvertimeService', 'directives'];

/* @ngInject */
function OvertimeController(OvertimeService, directives) {
    const vm = this;
    vm.overtime = {
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
        },
        exitTime : {
          hour: '',
          minutes: ''
        }
    };
   
    vm.focus = true;
    vm.response = {};
    vm.getOvertime = function(){
        if(vm.overtimeForm.$valid){
            return OvertimeService.getOvertime(vm.overtime).then(function(overtime){
                //console.log(overtime);
                vm.response.overtime = overtime.hour+":"+overtime.minutes;
                vm.overtime = {};
                return vm.response.overtime;
            }, function(error){
                //console.log(error.errorCode);
                vm.response.error = error;
                return vm.response.error;
            });
        }
    };

    
}
