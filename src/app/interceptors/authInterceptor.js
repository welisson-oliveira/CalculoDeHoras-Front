angular.module('app').factory('authInterceptor', ['$window', '$q', '$rootScope', '$injector', 'configs', 'Session', 'AUTH_EVENTS','Flash', 'HTTP_STATUS',
function($window, $q, $rootScope, $injector, configs, Session, AUTH_EVENTS, Flash, HTTP_STATUS) {
    var getMessage = function() {
        if($rootScope.currentLanguage.getCulture() === 'en-US') {
            return 'Unauthenticated session';
        } else {
            return 'Sessão não autenticada';
        }
    };

    return {
        request: function(config) {
            config.headers = config.headers || {};
            if (Session.hasSession() && !$rootScope.currentState.data.allowAnonymous) {
                var tokenInfo = Session.token();
                config.headers['Embraer-Account-Token'] = tokenInfo;
            }
            return config;
        },
        requestError: function(rejection) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
            }[rejection.status], rejection);
            return $q.reject(rejection);
        },
        responseError: function(response) {
            if(response.status == HTTP_STATUS.UNAUTHENTICATED) {
                Flash.create('danger', getMessage(), 'custom-class');
            }
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
            }[response.status], response);
            return $q.reject(response);
        },
        response: function(response) {
            if (response.status === 401 || response.status === 403) {
                // handle the case where the user is not authenticated
                return $q.reject(response);
            }
            return response || $q.when(response);
        }
    };
}
]);
