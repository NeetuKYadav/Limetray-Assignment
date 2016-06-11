var testApp = angular.module('testApp', ['ngRoute', 'ngCookies', 'LocalStorageModule']);
testApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/index', {
                templateUrl: 'templates/main.html',
                controller: 'mainController'
            }).
            when('/', {
                templateUrl: 'templates/main.html',
                controller: 'mainController'
            }).
            when('/login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController'
            }).
            when('/notfound', {
                templateUrl: 'templates/notfound.html',
                controller: 'loginController'
            }).
            when('/logout', {
                templateUrl: 'templates/logout.html',
                controller: 'loginController'
            }).
            otherwise({
                redirectTo: '/notfound'
            });
        }
    ])
testApp.config(function(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('testls')
        .setStorageType('localStorage');
});
//cofiguring constants for our app
testApp.run(function($rootScope, $location, $cookies, $window, localStorageService, $timeout) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
        debugger
        if(next.templateUrl=="templates/login.html" && $cookies.get('isLoggedIn') != 1 ){

        }
        else if ($cookies.get('isLoggedIn') == 1 ) {
        } else {
            $location.path("/login");
        }
    });
})