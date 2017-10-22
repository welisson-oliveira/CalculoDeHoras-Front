angular.module('app').service('ExitTimeService', ExitTimeService);

/* @ngInject */
function ExitTimeService(restFactory){

    const vm = this;
    vm.getExitTime = getExitTime;
    vm.response = {};

    function getExitTime(data){
        console.log(data);
        
        restFactory.resource(['calculates/likelyExit']).post(data).then(function(data){
            console.log("Dados: "+data.hour+":"+data.minutes);
        }, function(error){
            console.log("Error: "+error);
            console.log(error);
        });
        return vm;
    }
    return {
        getExitTime: vm.getExitTime
    };
}
