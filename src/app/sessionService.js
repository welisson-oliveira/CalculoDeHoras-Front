angular.module('app').service('Session', ['$cookies', 'configs', function($cookies, configs) {
    
        /**
         * Creates module info cookie.
         * @param  {Array} modules     instance of array.
         * @param  {Date} expiresDate expiration date.
         */
        var createModulesCookie = function(modules, expiresDate) {
            var modulesSession = JSON.stringify(modules);
            var expiration = { expires: expiresDate };
            $cookies.put(configs.modulesCookieKey, modulesSession, expiration);
        };
    
        /**
         * Creates user info cookie.
         * @param  {Object} userInfo    instance of user.
         * @param  {String} tokenInfo   token key.
         * @param  {Date} expiresDate cookie expiration date.
         */
        this.createUserCookie = function(userInfo, tokenInfo, expiresDate) {
            var userSession = JSON.stringify({ user: userInfo, token: tokenInfo });
            var expiration = { expires: expiresDate };
            $cookies.put(configs.userCookieKey, userSession, expiration);
        };
    
        /**
         * Creates initial user session.
         * @param  {Object} userInfo    instance of user.
         * @param  {String} tokenInfo   token key.
         */
        this.create = function(userInfo, tokenInfo) {
            var expiresDate = moment().add(365, 'days').toDate();
            var modules = userInfo.modules;
            createModulesCookie(modules, expiresDate);
    
            delete userInfo.modules;
            this.createUserCookie(userInfo, tokenInfo, expiresDate);
        };
    
        /**
         * Destroys user session.
         */
        this.destroy = function() {
            $cookies.remove(configs.userCookieKey);
            $cookies.remove(configs.modulesCookieKey);
        };
    
        /**
         * Checks if there is an active session.
         * @return {Boolean} true when there is an active session.
         */
        this.hasSession = function() {
            return ($cookies.get(configs.userCookieKey));
        };
    
        /**
         * Retrieves current user info in session.
         * @return {Object} instance of user.
         */
        this.user = function() {
            if (this.hasSession()) {
                var json = $cookies.get(configs.userCookieKey);
                var cookieValue = JSON.parse(json);
                return cookieValue.user;
            }
            return null;
        };
    
        /**
         * Retrieves current user session token key.
         * @return {String} token key.
         */
        this.token = function() {
            if (this.hasSession()) {
                var json = $cookies.get(configs.userCookieKey);
                var cookieValue = JSON.parse(json);
                return cookieValue.token;
            }
            return null;
        };
    
        /**
         * Retrieves modules for the current user session.
         * @return {Array} current user authorized modules.
         */
        this.modules = function() {
            if (this.hasSession()) {
                var json = $cookies.get(configs.modulesCookieKey);
                return JSON.parse(json);
            }
        };
    
    }]);
    