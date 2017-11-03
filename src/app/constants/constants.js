angular.module('constants').constant("configs", {
    "rootURL": "@@SERVER_URL@@"
});

angular.module('constants').constant('AUTH_EVENTS', {
    loginSuccess: 'authloginsuccess',
    loginFailed: 'authloginfailed',
    logoutSuccess: 'authlogoutsuccess',
    sessionTimeout: 'authsessiontimeout',
    notAuthenticated: 'authnotauthenticated',
    notAuthorized: 'authnotauthorized',
    insufficientPrivileges: 'authinsufficientPrivileges'
});

angular.module('constants').constant('HTTP_STATUS', {
    TEMPORARY_REDIRECT: 307,
    BAD_REQUEST: 400,
    PRECONDITION_FAILED: 412,
    UNAUTHENTICATED: 401,
    UNAUTHORIZED: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
});