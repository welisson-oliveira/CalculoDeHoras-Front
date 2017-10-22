angular.module('app')
    .factory('AuthService', ['$rootScope', 'configs', 'Restangular', 'Session', 'AUTH_EVENTS', 'HTTP_STATUS', function($rootScope, configs, Restangular, Session, AUTH_EVENTS, HTTP_STATUS) {

        var baseUrl = configs.loginAccountURL;
        var baseUrlCms = configs.rootURL;
        var headers = { 'Content-Type': "application/x-www-form-urlencoded" };

        // Returns public API.
        return ({
            currentUserSession: currentUserSession,
            hasSession: hasSession,
            logout: logout,
            refreshUserSession: refreshUserSession,
            releaseSession: releaseSession,
            signin: signin,
            token: token
        });

        function changeUser(user) {
            angular.extend($rootScope.currentUser, user);
        }

        /**
         * Signin user and starts a new session.
         * @param  {Object} data    form data.
         * @param  {Function} success callback function.
         * @param  {Function} error   callback function.
         */
        function signin(data, success, error) {
            var date_encoded = $.param(data);
            Restangular.oneUrl('login', baseUrl)
                .customPOST(date_encoded, 'login', '',headers)
                .then(function(response) {
                    var tokenInfo = response.embraerAccountToken;
                    refreshUserSession(tokenInfo, success);
                }, function(response) {
                    error(response);
                });
        }

        /**
         * Logouts current user in Embraer Account.
         * @param  {Function} success callback function.
         * @param  {Function} error   callback function.
         */
        function logout(success, error) {
            var tokenInfo = Session.token();
            var formData = { 'Embraer-Account-Token': tokenInfo };
            var data = $.param(formData);

            Restangular.oneUrl('logout', baseUrl)
                .customPOST(data, 'logout', '', headers)
                .then(function(response) {
                    changeUser({});
                    Session.destroy();
                    success();
                }, function(response) {
                    // anyway session must be destroyed
                    changeUser({});
                    Session.destroy();
                    error(response);
                });
        }

        /**
         * Returns current user's data in active session.
         * @return {Object} instance of user.
         */
        function currentUserSession() {
            return Session.user();
        }

        /**
         * Refreshes current user data with remote server data.
         * @param  {String} tokenInfo used to comunicate with remote server.
         * @param  {Function} success   optional, callback function.
         */
        function refreshUserSession(tokenInfo, success) {
            Restangular.one('user/privileges')
            .withHttpConfig({transformRequest: angular.identity})
            .customGET(undefined, undefined, {
                'Embraer-Account-Token': tokenInfo,
                'Accept': 'application/json;charset=UTF-8'
            }).then(function(response) {
                var userInfo = response;
                Session.create(userInfo, tokenInfo);
                $rootScope.currentUser = userInfo;
                if (success) {
                    success();
                }
            });
        }

        /**
         * Checks if there is a session active.
         * @return {Boolean} true when there is an authenticated session.
         */
        function hasSession() {
            return Session.hasSession();
        }

        /**
         * Retrieves current user token info.
         * @return {String} token key.
         */
        function token() {
            return Session.token();
        }

        /**
         * Destroys current user session.
         */
        function releaseSession() {
            Session.destroy();
        }

        /**
         * Checks if current user session is unauthorized.
         * @param  {Object}  response from remote server.
         * @return {Boolean}          true when it is unauthorized.
         */
        function isSessionUnauthorized(response) {
            return (response.status == 401);
        }

    }]);
