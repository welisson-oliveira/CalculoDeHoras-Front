angular.module('directives', [])
    .directive('focus', function () {
        var ddo = {};
        ddo.restrict = "A";
        ddo.scope = {
            focus: '='
        };
        ddo.link = function (scope, element) {
            scope.$watch('focus', function () {
                if (scope.focus) {
                    element[0].focus();
                    scope.focus = false;
                }
            });
        };
        return ddo;
    }).directive('itemMenu', function () {
        var ddo = {};
        ddo.restrict = 'E';
        ddo.scope = {
            link: '@',
            title: '@',
            body: '@'
        };
        ddo.templateUrl = 'app/directives/item-menu.html';
        return ddo;
    });
