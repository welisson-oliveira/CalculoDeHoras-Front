angular.module('app')
.controller('ExitTimeController', ExitTimeController);

ExitTimeController.$inject = ['ExitTimeService'];

/* @ngInject */
function ExitTimeController(ExitTimeService) {
    const vm = this;
    vm.teste = function(){
        ExitTimeService.getExitTime("{ \"hour\" :9, \"minutes\" :30 }");
    }
}
