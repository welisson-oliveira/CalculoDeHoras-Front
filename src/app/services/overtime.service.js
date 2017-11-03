angular.module('app').service('OvertimeService', OvertimeService);

OvertimeService.$inject = ['restFactory'];

/* @ngInject */
function OvertimeService(restFactory) {

    const vm = this;
    vm.getOvertime = getOvertime;

    function getOvertime(data) {
        console.log(data);
        return restFactory.pathVariable(paramsResolver(data)).get();
    }

    function paramsResolver(data){
      var params = [];

      params[0] = 'calculates'
      params[1] = 'overtime';
      params[2] = 'entryTime';
      params[3] = data.entryTime.hour+':'+data.entryTime.minutes;
      params[4] = 'lunchTimeInit';
      params[5] = data.lunchTimeInit.hour+':'+data.lunchTimeInit.minutes;
      params[6] = 'lunchTimeEnd';
      params[7] = data.lunchTimeEnd.hour+':'+data.lunchTimeEnd.minutes;
      params[8] = 'exitTime';
      params[9] = data.exitTime.hour+':'+data.exitTime.minutes;

      return params;
    }

    return {
        getOvertime: vm.getOvertime
    };
}
